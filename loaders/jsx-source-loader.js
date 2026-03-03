/**
 * Custom webpack loader that injects source file and line metadata into JSX elements
 * This adds data-source-file and data-source-line attributes to all JSX elements in dev mode
 *
 * Enhanced with CONTENT PATH TRACKING:
 * - Detects imports from content folders (e.g., ./content/home, ../content/about)
 * - Tracks .map() iterations over content arrays
 * - Auto-injects data-content-path and data-content-file attributes for click-to-edit
 *
 * PROP CLIMBING SUPPORT:
 * - Tracks component function props (e.g., function Card({ title, description }))
 * - Injects data-prop="propName" on elements using props as text
 * - Injects data-content-props='{"propName":"path"}' on components receiving content as props
 * - Runtime click handler climbs DOM to resolve prop → content path
 *
 * Example: {SERVICES.items.map((service, index) => <h3>{service.title}</h3>)}
 * Becomes: <h3 data-content-path={`SERVICES.items[${index}].title`} data-content-file="...">...</h3>
 *
 * Example with props:
 *   <Card title={service.title} />  →  <Card data-content-props='{"title":"SERVICES.items[0].title"}' />
 *   function Card({ title }) { return <h3>{title}</h3> }  →  <h3 data-prop="title">...</h3>
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// Cache to track files that failed parsing - prevents retry loops that consume memory
const failedParseCache = new Map();
const CACHE_TTL_MS = 15000; // Clear failed entries after 15 seconds to allow retry after fixes
const MAX_CACHE_SIZE = 50; // Max number of entries to prevent unbounded growth

// Periodically clean up old cache entries to prevent unbounded growth
let lastCleanup = Date.now();
function cleanupCache() {
  const now = Date.now();
  
  // Force cleanup if cache is too large
  if (failedParseCache.size > MAX_CACHE_SIZE) {
    failedParseCache.clear();
    lastCleanup = now;
    return;
  }
  
  if (now - lastCleanup < 5000) return; // Only cleanup every 5 seconds
  lastCleanup = now;
  
  for (const [key, timestamp] of failedParseCache.entries()) {
    if (now - timestamp > CACHE_TTL_MS) {
      failedParseCache.delete(key);
    }
  }
}

/**
 * Build a content path string from a MemberExpression
 * e.g., HERO.headline -> "HERO.headline"
 * e.g., service.image.url -> "service.image.url"
 */
function buildPathFromExpression(expr) {
  if (t.isIdentifier(expr)) {
    return expr.name;
  }
  if (t.isMemberExpression(expr) && !expr.computed) {
    const objPath = buildPathFromExpression(expr.object);
    const propName = t.isIdentifier(expr.property) ? expr.property.name : null;
    if (objPath && propName) {
      return `${objPath}.${propName}`;
    }
  }
  return null;
}

/**
 * Check if an expression references a content variable (directly or through map iteration)
 * Returns { path, file } or null
 * - path: the content path (e.g., "HERO.image")
 * - file: the content file path (e.g., "app/components/templates/wellness/content/home.tsx")
 */
function getContentPath(expr, contentVars, mapBindings) {
  if (t.isIdentifier(expr)) {
    // Direct content var: HERO
    if (contentVars.has(expr.name)) {
      return { path: expr.name, file: contentVars.get(expr.name) };
    }
    // Map iteration var: service -> SERVICES.items[${index}]
    if (mapBindings.has(expr.name)) {
      const binding = mapBindings.get(expr.name);
      return { path: binding.path, file: binding.file };
    }
    return null;
  }

  if (t.isMemberExpression(expr) && !expr.computed) {
    const objResult = getContentPath(expr.object, contentVars, mapBindings);
    const propName = t.isIdentifier(expr.property) ? expr.property.name : null;
    if (objResult && propName) {
      return { path: `${objResult.path}.${propName}`, file: objResult.file };
    }
  }

  return null;
}

/**
 * Build a JSX attribute whose value may contain ${...} template expressions.
 * If the value contains ${...}, creates a template literal: attr={`...${var}...`}
 * Otherwise, creates a simple value (string literal or expression container based on useExprContainer).
 *
 * @param attrName - JSX attribute name (e.g., 'data-content-path')
 * @param value - String that may contain ${varName} placeholders
 * @param useExprContainer - If true, wraps simple strings in expression container: attr={"value"}
 *                           If false, uses plain string literal: attr="value"
 */
function buildJsxAttr(attrName, value, useExprContainer = false) {
  if (value.includes('${')) {
    // Template literal: attr={`...${var}...`}
    const parts = value.split(/(\$\{[^}]+\})/);
    const quasis = [];
    const expressions = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('${') && part.endsWith('}')) {
        const varName = part.slice(2, -1);
        expressions.push(t.identifier(varName));
        if (i === parts.length - 1) {
          quasis.push(t.templateElement({ raw: '', cooked: '' }, true));
        }
      } else {
        const isLast = i === parts.length - 1 ||
          (i === parts.length - 2 && parts[parts.length - 1].startsWith('${'));
        quasis.push(t.templateElement({ raw: part, cooked: part }, isLast && i === parts.length - 1));
      }
    }

    if (quasis.length <= expressions.length) {
      quasis.push(t.templateElement({ raw: '', cooked: '' }, true));
    }

    return t.jsxAttribute(
      t.jsxIdentifier(attrName),
      t.jsxExpressionContainer(t.templateLiteral(quasis, expressions))
    );
  } else {
    // Simple string
    const attrValue = useExprContainer
      ? t.jsxExpressionContainer(t.stringLiteral(value))
      : t.stringLiteral(value);
    return t.jsxAttribute(t.jsxIdentifier(attrName), attrValue);
  }
}

/** Shorthand for data-content-path attribute */
function createContentPathAttr(pathStr) {
  return buildJsxAttr('data-content-path', pathStr);
}

/**
 * Find the root JSX element in a function body (arrow expression, block with return, or parenthesized).
 * Used both for component prop forwarding and .map() callback annotation.
 */
function findRootJSXInBody(body) {
  if (t.isJSXElement(body)) return body;
  if (t.isParenthesizedExpression(body) && t.isJSXElement(body.expression)) return body.expression;
  if (t.isBlockStatement(body)) {
    for (const stmt of body.body) {
      if (t.isReturnStatement(stmt) && stmt.argument) {
        if (t.isJSXElement(stmt.argument)) return stmt.argument;
        if (t.isParenthesizedExpression(stmt.argument) && t.isJSXElement(stmt.argument.expression)) {
          return stmt.argument.expression;
        }
        break;
      }
    }
  }
  return null;
}

module.exports = function jsxSourceLoader(source) {
  // Only run in development
  if (process.env.NODE_ENV !== 'development') {
    return source;
  }

  const filename = this.resourcePath;
  
  // Only process TSX and JSX files
  if (!filename.endsWith('.tsx') && !filename.endsWith('.jsx')) {
    return source;
  }

  // Check if this file recently failed - skip to avoid memory-consuming retry loops
  cleanupCache();
  if (failedParseCache.has(filename)) {
    return source;
  }

  let ast = null;
  
  try {
    // Parse the source code into an AST
    ast = parser.parse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
      errorRecovery: true, // Continue parsing even with errors
    });

    // Bail out early if AST is invalid
    if (!ast || !ast.program) {
      failedParseCache.set(filename, Date.now());
      return source;
    }

    // Wrap traverse in its own try-catch - traverse errors shouldn't break the build
    let traverseSucceeded = false;
    try {
      // STEP 1: Collect imports from content files
      // Pattern: imports from a "content" folder (e.g., ./content/home, ../content/about)
      // Maps variable name -> resolved file path
      const contentVars = new Map();
      const nodePath = require('path');
      traverse(ast, {
        ImportDeclaration(path) {
          const importSource = path.node.source.value;
          // Match imports from a content folder:
          // - ./content/home, ../content/about, @/templates/trades/content/home
          // The pattern requires /content/ followed by a filename (no further slashes)
          const isContentFile = /\/content\/[^/]+$/.test(importSource);

          if (isContentFile) {
            // Resolve the content file path
            let contentFilePath;
            if (importSource.startsWith('.')) {
              // Relative import: resolve relative to current file, then make relative to project root
              const currentDir = nodePath.dirname(filename);
              const absolutePath = nodePath.resolve(currentDir, importSource);
              contentFilePath = nodePath.relative(process.cwd(), absolutePath);
            } else if (importSource.startsWith('@/')) {
              // Alias import: @/ maps to project root
              contentFilePath = importSource.replace('@/', '');
            } else {
              contentFilePath = importSource;
            }
            // Add .tsx extension if not present
            if (!contentFilePath.endsWith('.tsx') && !contentFilePath.endsWith('.ts')) {
              contentFilePath += '.tsx';
            }

            for (const specifier of path.node.specifiers) {
              if (t.isImportSpecifier(specifier) || t.isImportDefaultSpecifier(specifier)) {
                contentVars.set(specifier.local.name, contentFilePath);
              }
            }
          }
        }
      });

      // STEP 2: Track component props AND add universal data-* forwarding
      // - Tracks prop names for data-prop injection
      // - Adds ...dataProps forwarding to ALL function components with destructured props
      const componentProps = new Set();

      // Helper: Process a function with destructured props
      // - Extracts prop names into componentProps set
      // - Adds ...dataProps rest param and {...dataProps} spread to root JSX
      function processComponentFunction(funcNode) {
        const params = funcNode.params;
        if (!params[0] || params[0].type !== 'ObjectPattern') return;
        const objectPattern = params[0];

        // Track prop names
        for (const prop of objectPattern.properties) {
          if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
            componentProps.add(prop.key.name);
          } else if (t.isObjectProperty(prop) && t.isIdentifier(prop.value)) {
            componentProps.add(prop.value.name);
          }
        }

        // Skip forwarding if already has rest element
        if (objectPattern.properties.some(p => t.isRestElement(p))) return;

        // Add ...dataProps to params
        objectPattern.properties.push(t.restElement(t.identifier('dataProps')));

        const rootJSX = findRootJSXInBody(funcNode.body);

        // Add {...dataProps} spread to root JSX
        if (rootJSX?.openingElement) {
          const hasSpread = rootJSX.openingElement.attributes.some(
            attr => t.isJSXSpreadAttribute(attr) && t.isIdentifier(attr.argument, { name: 'dataProps' })
          );
          if (!hasSpread) {
            rootJSX.openingElement.attributes.push(t.jsxSpreadAttribute(t.identifier('dataProps')));
          }
        }
      }

      traverse(ast, {
        FunctionDeclaration(path) {
          processComponentFunction(path.node);
        },
        VariableDeclarator(path) {
          let funcNode = path.node.init;
          if (t.isTSAsExpression(funcNode)) funcNode = funcNode.expression;
          if (t.isArrowFunctionExpression(funcNode) || t.isFunctionExpression(funcNode)) {
            processComponentFunction(funcNode);
          }
        },
      });

      // STEP 3: Track map bindings - maps iteration var to content path
      // e.g., service -> "SERVICES.items[${index}]"
      const mapBindingsStack = [];

      // Traverse the AST and inject source attributes into JSX elements
      traverse(ast, {
        // Track .map() calls on content variables
        CallExpression: {
          enter(path) {
            try {
              const { node } = path;
              // Check for pattern: SOMETHING.map((item, index) => ...)
              if (t.isMemberExpression(node.callee) &&
                  t.isIdentifier(node.callee.property, { name: 'map' }) &&
                  node.arguments.length > 0) {

                const arrayExpr = node.callee.object;
                let arrayPath = null;

                // Check if the array is a content variable or property of one
                let arrayFile = null;
                if (t.isIdentifier(arrayExpr) && contentVars.has(arrayExpr.name)) {
                  arrayPath = arrayExpr.name;
                  arrayFile = contentVars.get(arrayExpr.name);
                } else if (t.isMemberExpression(arrayExpr)) {
                  // e.g., SERVICES.items or GALLERY.images or plan.features (nested map)
                  const rootPath = buildPathFromExpression(arrayExpr);
                  if (rootPath) {
                    const rootVar = rootPath.split('.')[0];
                    if (contentVars.has(rootVar)) {
                      // Direct content variable: SERVICES.items
                      arrayPath = rootPath;
                      arrayFile = contentVars.get(rootVar);
                    } else {
                      // Check if rootVar is a map binding (for nested maps)
                      // e.g., plan.features where plan is from PRICING.plans.map()
                      for (const binding of mapBindingsStack) {
                        if (binding.itemName === rootVar) {
                          // Compose: PRICING.plans[${index}] + .features = PRICING.plans[${index}].features
                          const restPath = rootPath.slice(rootVar.length); // ".features"
                          arrayPath = binding.basePath + restPath;
                          arrayFile = binding.file;
                          break;
                        }
                      }
                    }
                  }
                }

                if (arrayPath && arrayFile) {
                  const callback = node.arguments[0];
                  if (t.isArrowFunctionExpression(callback) || t.isFunctionExpression(callback)) {
                    const params = callback.params;
                    const itemParam = params[0];
                    const indexParam = params[1];

                    // Only track maps that have both item AND index parameters
                    // Without an index, we can't generate valid content paths
                    if (t.isIdentifier(itemParam) && indexParam && t.isIdentifier(indexParam)) {
                      const itemName = itemParam.name;
                      const indexName = indexParam.name;

                      // Push binding: service -> { path: "SERVICES.items[${index}]", file: "..." }
                      const binding = {
                        itemName,
                        indexName,
                        basePath: `${arrayPath}[\${${indexName}}]`,
                        file: arrayFile
                      };
                      mapBindingsStack.push(binding);

                      // ARRAY ITEM ANNOTATION: Mark the root JSX element of the .map() callback
                      // so the runtime can detect array items for add/delete controls
                      try {
                        const rootJSX = findRootJSXInBody(callback.body);
                        if (rootJSX?.openingElement) {
                          rootJSX.openingElement.attributes.push(
                            buildJsxAttr('data-content-array', arrayPath, true),
                            buildJsxAttr('data-content-array-index', `\${${indexName}}`),
                          );
                          if (arrayFile) {
                            rootJSX.openingElement.attributes.push(
                              t.jsxAttribute(t.jsxIdentifier('data-content-file'), t.stringLiteral(arrayFile))
                            );
                          }
                        }
                      } catch (e) {
                        // Silently ignore - annotation is non-critical
                      }
                    }
                  }
                }
                // PROP-DERIVED ARRAYS: Track .map() on component props
                // e.g., features.map((feature, i) => ...) where features is a prop
                // This creates a relative path that gets composed at runtime
                else if (t.isIdentifier(arrayExpr) && componentProps.has(arrayExpr.name)) {
                  const callback = node.arguments[0];
                  if (t.isArrowFunctionExpression(callback) || t.isFunctionExpression(callback)) {
                    const params = callback.params;
                    const itemParam = params[0];
                    const indexParam = params[1];

                    if (t.isIdentifier(itemParam) && indexParam && t.isIdentifier(indexParam)) {
                      const itemName = itemParam.name;
                      const indexName = indexParam.name;
                      const propName = arrayExpr.name;

                      // Push binding with relative path: feature -> "features[${i}]"
                      // Lowercase start indicates relative path to be composed at runtime
                      const binding = {
                        itemName,
                        indexName,
                        basePath: `${propName}[\${${indexName}}]`,
                        file: null, // No file - will be resolved via prop climbing
                        isPropDerived: true
                      };
                      mapBindingsStack.push(binding);
                    }
                  }
                }
              }
            } catch (e) {
              // Silently ignore errors in map tracking
            }
          },
          exit(path) {
            try {
              const { node } = path;
              // Pop binding when exiting a tracked .map() call
              if (t.isMemberExpression(node.callee) &&
                  t.isIdentifier(node.callee.property, { name: 'map' }) &&
                  mapBindingsStack.length > 0) {
                const arrayExpr = node.callee.object;
                const rootPath = buildPathFromExpression(arrayExpr);
                if (rootPath) {
                  const rootVar = rootPath.split('.')[0];
                  // Check if this was a tracked map (either content var or nested map binding)
                  if (contentVars.has(rootVar)) {
                    mapBindingsStack.pop();
                  } else {
                    // Check if it was a nested map (rootVar is a map binding)
                    for (const binding of mapBindingsStack) {
                      if (binding.itemName === rootVar) {
                        mapBindingsStack.pop();
                        break;
                      }
                    }
                  }
                }
              }
            } catch (e) {
              // Silently ignore
            }
          }
        },

        JSXOpeningElement(path) {
          try {
            const { node } = path;
            
            // Defensive: ensure node and attributes exist
            if (!node || !node.attributes || !Array.isArray(node.attributes)) {
              return;
            }
            
            // Skip if already has source data
            if (node.attributes.some(attr =>
                  t.isJSXAttribute(attr) &&
                  attr.name?.name === 'data-source-file'
                )) {
              return;
            }

            const line = node.loc?.start?.line;
            const column = node.loc?.start?.column;

            if (line) {
              // Add data-source-file attribute
              node.attributes.push(
                t.jsxAttribute(
                  t.jsxIdentifier('data-source-file'),
                  t.stringLiteral(filename)
                )
              );

              // Add data-source-line attribute
              node.attributes.push(
                t.jsxAttribute(
                  t.jsxIdentifier('data-source-line'),
                  t.stringLiteral(String(line))
                )
              );

              // Add data-source-column attribute
              if (column !== undefined) {
                node.attributes.push(
                  t.jsxAttribute(
                    t.jsxIdentifier('data-source-column'),
                    t.stringLiteral(String(column))
                  )
                );
              }
            }

            // CONTENT PATH TRACKING: Inject data-content-path and data-content-file for content expressions
            // Build current map bindings lookup: itemName -> { path, file }
            const currentMapBindings = new Map();
            for (const binding of mapBindingsStack) {
              currentMapBindings.set(binding.itemName, { path: binding.basePath, file: binding.file });
            }

            // Check if this element has content expressions in children or attributes
            const jsxElement = path.parent;
            if (t.isJSXElement(jsxElement) && jsxElement.children) {
              for (const child of jsxElement.children) {
                if (t.isJSXExpressionContainer(child) && child.expression) {
                  // First check if it's a direct content variable
                  const contentResult = getContentPath(child.expression, contentVars, currentMapBindings);
                  if (contentResult) {
                    // Skip if already has data-content-path
                    const hasContentPath = node.attributes.some(attr =>
                      t.isJSXAttribute(attr) && attr.name?.name === 'data-content-path'
                    );
                    if (!hasContentPath) {
                      node.attributes.push(createContentPathAttr(contentResult.path));
                      // Also add data-content-file
                      node.attributes.push(
                        t.jsxAttribute(
                          t.jsxIdentifier('data-content-file'),
                          t.stringLiteral(contentResult.file)
                        )
                      );
                    }
                    break; // Only add one content path per element
                  }

                  // PROP CLIMBING: Check if it's a component prop being used as text
                  // e.g., function Card({ title }) { return <h3>{title}</h3> }
                  if (t.isIdentifier(child.expression) && componentProps.has(child.expression.name)) {
                    const hasDataProp = node.attributes.some(attr =>
                      t.isJSXAttribute(attr) && attr.name?.name === 'data-prop'
                    );
                    if (!hasDataProp) {
                      node.attributes.push(
                        t.jsxAttribute(
                          t.jsxIdentifier('data-prop'),
                          t.stringLiteral(child.expression.name)
                        )
                      );
                    }
                    break;
                  }
                }
              }
            }

            // Check src attribute for images referencing content (direct or via props)
            for (const attr of node.attributes) {
              if (t.isJSXAttribute(attr) &&
                  attr.name?.name === 'src' &&
                  attr.value &&
                  t.isJSXExpressionContainer(attr.value) &&
                  attr.value.expression) {
                // First try direct content tracking
                const contentResult = getContentPath(attr.value.expression, contentVars, currentMapBindings);
                if (contentResult) {
                  // For image.url, we want the path to be image (parent object)
                  const imagePath = contentResult.path.replace(/\.url$/, '');
                  const hasContentPath = node.attributes.some(a =>
                    t.isJSXAttribute(a) && a.name?.name === 'data-content-path'
                  );
                  if (!hasContentPath) {
                    node.attributes.push(createContentPathAttr(imagePath));
                    node.attributes.push(
                      t.jsxAttribute(
                        t.jsxIdentifier('data-content-file'),
                        t.stringLiteral(contentResult.file)
                      )
                    );
                  }
                  break;
                }
              }
            }

            // PROP CLIMBING: Check if any attribute uses a component prop (for prop climbing)
            // e.g., <Image src={src} /> or <Image src={image.url} /> where src/image is a component prop
            // This enables climbing to find data-content-props on parent
            for (const attr of node.attributes) {
              if (t.isJSXAttribute(attr) &&
                  attr.name?.name &&
                  !attr.name.name.startsWith('data-') &&
                  attr.value &&
                  t.isJSXExpressionContainer(attr.value)) {
                const expr = attr.value.expression;
                // Check for {prop} or {prop.property} patterns
                const propName = t.isIdentifier(expr) && componentProps.has(expr.name)
                  ? expr.name
                  : t.isMemberExpression(expr) && t.isIdentifier(expr.object) && componentProps.has(expr.object.name)
                    ? expr.object.name
                    : null;

                if (propName) {
                  const hasDataProp = node.attributes.some(a =>
                    t.isJSXAttribute(a) && a.name?.name === 'data-prop'
                  );
                  if (!hasDataProp) {
                    node.attributes.push(
                      t.jsxAttribute(
                        t.jsxIdentifier('data-prop'),
                        t.stringLiteral(propName)
                      )
                    );
                    break; // Only add one data-prop per element
                  }
                }
              }
            }

            // PROP CLIMBING: Inject data-content-props on components receiving content as props
            // e.g., <Card title={service.title} /> -> <Card data-content-props='{"title":"SERVICES.items[0].title"}' />
            // This is used by the runtime click handler to climb up and find the content path
            const contentPropsMap = {};
            let contentPropsFile = null;
            for (const attr of node.attributes) {
              if (t.isJSXAttribute(attr) &&
                  attr.name?.name &&
                  !attr.name.name.startsWith('data-') &&
                  attr.name.name !== 'key' &&
                  attr.name.name !== 'className' &&
                  attr.name.name !== 'style' &&
                  attr.value &&
                  t.isJSXExpressionContainer(attr.value) &&
                  attr.value.expression) {
                const contentResult = getContentPath(attr.value.expression, contentVars, currentMapBindings);
                if (contentResult) {
                  contentPropsMap[attr.name.name] = contentResult.path;
                  contentPropsFile = contentResult.file;
                }
              }
            }
            if (Object.keys(contentPropsMap).length > 0) {
              // Create data-content-props attribute with JSON (uses expression container for proper escaping)
              const jsonStr = JSON.stringify(contentPropsMap);
              node.attributes.push(buildJsxAttr('data-content-props', jsonStr, /* useExprContainer */ true));
              // Also add the content file (if not already present)
              const hasContentFile = node.attributes.some(a =>
                t.isJSXAttribute(a) && a.name?.name === 'data-content-file'
              );
              if (contentPropsFile && !hasContentFile) {
                node.attributes.push(
                  t.jsxAttribute(
                    t.jsxIdentifier('data-content-file'),
                    t.stringLiteral(contentPropsFile)
                  )
                );
              }
            }

            // PROP ORIGIN TRACKING: Wrap string literal props in fragments with source data
            // This allows the rendered content to know where the prop value was defined
            node.attributes.forEach((attr, index) => {
              try {
                if (t.isJSXAttribute(attr) && 
                    attr.value && 
                    t.isStringLiteral(attr.value) &&
                    attr.value.value?.trim().length > 0 && // Skip empty strings
                    attr.name?.name && // Ensure name exists
                    !attr.name.name.startsWith('data-') && // Skip our own data attributes
                    attr.name.name !== 'className' && // Skip className (too noisy)
                    attr.name.name !== 'id' && // Skip id
                    attr.name.name !== 'key' && // Skip React internals
                    attr.name.name !== 'href' && // Skip links (usually not edited)
                    attr.name.name !== 'src' && // Skip image sources (handled separately)
                    attr.name.name !== 'alt' // Skip alt text for now
                ) {
                  const propLine = attr.value.loc?.start?.line || line;
                  const propColumn = attr.value.loc?.start?.column || column;

                  // Wrap string prop in a span with source data
                  // title="Hello" becomes title={<span data-source-*>Hello</span>}
                  const wrapper = t.jsxElement(
                    t.jsxOpeningElement(
                      t.jsxIdentifier('span'),
                      [
                        t.jsxAttribute(
                          t.jsxIdentifier('data-source-file'),
                          t.stringLiteral(filename)
                        ),
                        t.jsxAttribute(
                          t.jsxIdentifier('data-source-line'),
                          t.stringLiteral(String(propLine))
                        ),
                        t.jsxAttribute(
                          t.jsxIdentifier('data-source-column'),
                          t.stringLiteral(String(propColumn))
                        ),
                      ],
                      false
                    ),
                    t.jsxClosingElement(t.jsxIdentifier('span')),
                    [t.jsxText(attr.value.value)],
                    false
                  );

                  // Replace the string literal with a JSX expression containing our wrapper
                  node.attributes[index] = t.jsxAttribute(
                    attr.name,
                    t.jsxExpressionContainer(wrapper)
                  );
                }
              } catch (attrError) {
                // Silently skip this attribute - don't let one bad attribute break the whole file
              }
            });
          } catch (nodeError) {
            // Silently skip this node - don't let one bad node break traversal
          }
        },
      });
      traverseSucceeded = true;
    } catch (traverseError) {
      // Traverse failed - this is non-fatal, we can still return original source
      // Don't log common Babel internal errors that happen during hot reload
    }

    // If traverse failed, return original source
    if (!traverseSucceeded) {
      ast = null;
      return source;
    }

    // Generate code from the modified AST - also wrapped for safety
    let output;
    try {
      output = generate(ast, {
        retainLines: true,
        compact: false,
      }, source);
    } catch (generateError) {
      // Generate failed - return original source
      ast = null;
      return source;
    }

    // Help garbage collection by clearing references
    ast = null;
    const code = output.code;
    output = null;

    return code;
  } catch (error) {
    // Cache this failure to prevent retry loops that consume memory
    failedParseCache.set(filename, Date.now());
    
    // Clear AST reference to help GC
    ast = null;
    
    // Only log actual parse errors, not internal Babel state errors
    if (error.message && !error.message.includes('buildError') && !error.message.includes('undefined')) {
      console.warn(`jsx-source-loader: Failed to parse ${filename}:`, error.message);
    }
    return source;
  }
};
