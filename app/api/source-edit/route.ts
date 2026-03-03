import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';
import { validateFilePath } from '../utils/validateFilePath';

// Use require for CommonJS Babel modules
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

// Shared Babel options for content file parsing and generation
const BABEL_PARSE_OPTS = { sourceType: 'module', plugins: ['typescript', 'jsx'] };
const BABEL_GENERATE_OPTS = { retainLines: true, retainFunctionParens: true };

/** GET: Read a specific line from a source file */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  const line = parseInt(searchParams.get('line') || '0', 10);

  if (!file || !line) {
    return NextResponse.json({ error: 'Missing file or line parameter' }, { status: 400 });
  }

  try {
    const validation = await validateFilePath(file);
    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    const content = await fs.readFile(validation.absolutePath, 'utf-8');
    const lines = content.split('\n');
    const sourceCode = lines[line - 1]?.trim() || null;

    return NextResponse.json({ sourceCode });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to read source file' },
      { status: 500 }
    );
  }
}

// ============================================================================
// Content Path Editing Helpers
// ============================================================================

type AstNode = { type: string; [key: string]: unknown };

/** Parse "SERVICES.items[0].title" into ["SERVICES", "items", "0", "title"] */
function parseContentPath(contentPath: string): string[] {
  return contentPath
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
}

/** Navigate an AST node by property path, returning the target node or null */
function navigateToNode(root: AstNode, pathParts: string[]): AstNode | null {
  let current: AstNode | null = root;

  for (let i = 0; i < pathParts.length; i++) {
    const key = pathParts[i];
    if (!current || !key) return null;

    if (current.type === 'ObjectExpression') {
      const properties = current.properties as AstNode[];
      const prop = properties.find((p) => {
        if (p.type !== 'ObjectProperty') return false;
        const propKey = p.key as AstNode;
        if (propKey.type === 'Identifier') return (propKey.name as string) === key;
        if (propKey.type === 'StringLiteral') return (propKey.value as string) === key;
        return false;
      });
      current = prop ? (prop.value as AstNode) : null;
    } else if (current.type === 'ArrayExpression') {
      const elements = current.elements as (AstNode | null)[];
      const index = parseInt(key, 10);
      current = !isNaN(index) && elements[index] ? elements[index] : null;
    } else if (current.type === 'TSAsExpression') {
      // Unwrap TypeScript "as" cast and re-process this path segment
      current = current.expression as AstNode;
      i--;
    } else {
      return null;
    }
  }

  return current;
}

/** Resolve image value to index - accepts either numeric string or URL lookup */
function resolveImageIndex(value: string, constantsContent: string | null): number {
  // Direct numeric index
  const parsed = parseInt(value, 10);
  if (!isNaN(parsed) && String(parsed) === value.trim()) {
    return parsed;
  }

  // URL lookup in professionalConstants
  if (!constantsContent) return -1;

  const urlMatches = constantsContent.matchAll(/url:\s*["']([^"']+)["']/g);
  let idx = 0;
  for (const match of urlMatches) {
    if (match[1] === value) return idx;
    idx++;
  }

  return -1;
}

/** Append a new image entry to PROFESSIONAL_IMAGES in professionalConstants.ts */
async function appendToProfessionalImages(
  url: string,
  width: number,
  height: number,
  description: string,
  currentContent: string,
): Promise<number> {
  // Count existing images to determine new index
  const urlMatches = [...currentContent.matchAll(/url:\s*["'][^"']+["']/g)];
  const newIndex = urlMatches.length;

  // Escape double quotes in description
  const safeDescription = description.replace(/"/g, '\\"');
  const newEntry = `  {\n    url: "${url}",\n    width: ${width},\n    height: ${height},\n    description: "${safeDescription}",\n  },`;

  // Find the closing ]; of PROFESSIONAL_IMAGES array
  const imgArrayStart = currentContent.indexOf('PROFESSIONAL_IMAGES');
  if (imgArrayStart < 0) return -1;
  const closingBracket = currentContent.indexOf('\n];', imgArrayStart);
  if (closingBracket < 0) return -1;

  const updatedContent = currentContent.slice(0, closingBracket) + '\n' + newEntry + currentContent.slice(closingBracket);
  const constantsPath = path.join(process.cwd(), 'professionalConstants.ts');
  await fs.writeFile(constantsPath, updatedContent, 'utf-8');

  return newIndex;
}

/** Create AST node for PROFESSIONAL_IMAGES[index] as ProfessionalImage */
function createImageRefNode(index: number): AstNode {
  return {
    type: 'TSAsExpression',
    expression: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'PROFESSIONAL_IMAGES' },
      property: { type: 'NumericLiteral', value: index },
      computed: true,
    },
    typeAnnotation: {
      type: 'TSTypeReference',
      typeName: { type: 'Identifier', name: 'ProfessionalImage' },
    },
  };
}

/** Recursively find and replace a node in an AST tree */
function replaceNodeInTree(root: AstNode, target: AstNode, replacement: AstNode): boolean {
  if (root.type === 'ArrayExpression' && Array.isArray(root.elements)) {
    for (let i = 0; i < root.elements.length; i++) {
      if (root.elements[i] === target) {
        root.elements[i] = replacement;
        return true;
      }
      if (root.elements[i] && replaceNodeInTree(root.elements[i] as AstNode, target, replacement)) {
        return true;
      }
    }
  }
  if (root.type === 'ObjectExpression' && Array.isArray(root.properties)) {
    for (const prop of root.properties as AstNode[]) {
      if (prop.value === target) {
        prop.value = replacement;
        return true;
      }
      if (prop.value && replaceNodeInTree(prop.value as AstNode, target, replacement)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Parse a content file, find a root variable by path, apply a modifier, and write back.
 * Shared by handleContentPathEdit and handleArrayItemAction.
 */
async function modifyContentVar(
  contentFile: string,
  varPath: string,
  modify: (rootInit: AstNode, target: AstNode) => boolean,
  options: { successMessage?: string; errorMessage: string; errorContext: string },
): Promise<NextResponse> {
  const validation = await validateFilePath(contentFile);
  if ('error' in validation) {
    return NextResponse.json({ error: validation.error }, { status: validation.status });
  }
  const contentFilePath = validation.absolutePath;

  try {
    const fileContent = await fs.readFile(contentFilePath, 'utf-8');
    const pathParts = parseContentPath(varPath);
    if (pathParts.length === 0) {
      return NextResponse.json({ error: 'Invalid content path' }, { status: 400 });
    }

    const [rootVar, ...propertyPath] = pathParts;
    const ast = parser.parse(fileContent, BABEL_PARSE_OPTS);

    let updated = false;
    traverse(ast, {
      VariableDeclarator(nodePath: { node: { id: AstNode; init: AstNode } }) {
        if (updated) return;
        const { id, init } = nodePath.node;
        if (id.type !== 'Identifier' || (id.name as string) !== rootVar) return;

        const target = propertyPath.length > 0 ? navigateToNode(init, propertyPath) : init;
        if (!target) return;
        updated = modify(init, target);
      },
    });

    if (!updated) {
      return NextResponse.json({ error: options.errorMessage }, { status: 400 });
    }

    const output = generate(ast, BABEL_GENERATE_OPTS);
    await fs.writeFile(contentFilePath, output.code, 'utf-8');
    return NextResponse.json({ success: true, message: options.successMessage });
  } catch (error) {
    console.error(options.errorContext, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to edit content' },
      { status: 500 },
    );
  }
}

// ============================================================================
// Main Content Path Edit Handler
// ============================================================================

/**
 * Handle content path edits (e.g., "SERVICES.items[0].title")
 * Edits the specified content file by navigating the AST to the specified path
 */
async function handleContentPathEdit(
  contentPath: string,
  newText: string,
  isImageEdit?: boolean,
  contentFile?: string,
  imageMeta?: { url?: string; height?: string; description?: string },
): Promise<NextResponse> {
  if (!contentFile) {
    return NextResponse.json(
      { error: 'Content file path is required for content path edits' },
      { status: 400 }
    );
  }

  // Pre-process images: resolve or append to PROFESSIONAL_IMAGES
  let resolvedImageIndex = -1;
  if (isImageEdit) {
    try {
      const constantsPath = path.join(process.cwd(), 'professionalConstants.ts');
      const constantsContent = await fs.readFile(constantsPath, 'utf-8');
      resolvedImageIndex = resolveImageIndex(newText, constantsContent);
      if (resolvedImageIndex < 0) {
        const url = imageMeta?.url || newText;
        const height = parseInt(imageMeta?.height || '0') || 0;
        const description = imageMeta?.description || '';
        resolvedImageIndex = await appendToProfessionalImages(url, height, height, description, constantsContent);
      }
    } catch (error) {
      console.error('Image pre-processing error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to process image' },
        { status: 500 },
      );
    }
  }

  return modifyContentVar(contentFile, contentPath, (init, target) => {
    if (isImageEdit) {
      return resolvedImageIndex >= 0 && replaceNodeInTree(init, target, createImageRefNode(resolvedImageIndex));
    }
    if (target.type === 'StringLiteral') {
      (target.value as string) = newText;
      return true;
    }
    const replacement: AstNode = { type: 'StringLiteral', value: newText };
    return replaceNodeInTree(init, target, replacement);
  }, {
    successMessage: `Updated ${contentPath}`,
    errorMessage: 'Could not find or update content path',
    errorContext: 'Content path edit error:',
  });
}

// ============================================================================
// Array Item Actions (Add/Remove cards, FAQ items, etc.)
// ============================================================================

/** Check if a string looks like a URL, path, CSS class, hex color, or number (not editable content) */
function isNonContentString(value: string): boolean {
  return /^(https?:|\/|#|\.)/.test(value) || value.includes('://') || /^\d/.test(value);
}

/** Property keys that hold structural/CSS values, not user-editable content.
 *  These are preserved as-is when cloning array items. */
const NON_CONTENT_KEYS = new Set([
  'className', 'class', 'rotation', 'style', 'variant', 'size', 'icon', 'type',
  'delay', 'suffix',
]);

/** If the cloned object has a string `id` property, replace it with a unique value.
 *  Prevents duplicate key issues (e.g. FAQ accordion items sharing the same id). */
function assignUniqueId(node: AstNode): void {
  if (node.type !== 'ObjectExpression' || !Array.isArray(node.properties)) return;
  for (const prop of node.properties as AstNode[]) {
    const key = prop.key as AstNode | undefined;
    if (key?.type !== 'Identifier' || key.name !== 'id') continue;
    const val = prop.value as AstNode | undefined;
    if (val?.type === 'StringLiteral') {
      (val.value as string) = `item-${Date.now()}`;
    }
    break;
  }
}

/** Replace all StringLiteral values in an AST node with placeholder text.
 *  Skips URLs, paths, non-content strings, and structural property keys (className, icon, etc.). */
function replaceStringsWithPlaceholders(node: AstNode): void {
  if (node.type === 'StringLiteral') {
    const value = node.value as string;
    if (isNonContentString(value)) return;
    (node.value as string) = value.length > 40 ? 'Description here...' : 'New Item';
    return;
  }
  if (node.type === 'ObjectExpression' && Array.isArray(node.properties)) {
    for (const prop of node.properties as AstNode[]) {
      if (prop.type === 'ObjectProperty' && prop.value) {
        const key = prop.key as AstNode;
        const keyName = key.type === 'Identifier' ? (key.name as string) : key.type === 'StringLiteral' ? (key.value as string) : null;
        if (keyName && NON_CONTENT_KEYS.has(keyName)) continue;
        replaceStringsWithPlaceholders(prop.value as AstNode);
      }
    }
  }
  if (node.type === 'ArrayExpression' && Array.isArray(node.elements)) {
    for (const el of node.elements as AstNode[]) {
      if (el) replaceStringsWithPlaceholders(el);
    }
  }
}

/**
 * Handle add/remove array item actions on content files.
 * - addArrayItem: clones the item at atIndex, replaces strings with placeholders, inserts after it
 * - removeArrayItem: removes the item at atIndex (prevents removing the last item)
 */
async function handleArrayItemAction(
  action: 'addArrayItem' | 'removeArrayItem',
  arrayPath: string,
  contentFile: string,
  atIndex: number,
): Promise<NextResponse> {
  if (!arrayPath || !contentFile) {
    return NextResponse.json(
      { error: 'arrayPath and contentFile are required' },
      { status: 400 },
    );
  }

  const isAdd = action === 'addArrayItem';

  return modifyContentVar(contentFile, arrayPath, (_init, target) => {
    if (target.type !== 'ArrayExpression') return false;
    const elements = target.elements as (AstNode | null)[];

    if (!isAdd) {
      if (elements.length <= 1 || atIndex < 0 || atIndex >= elements.length) return false;
      elements.splice(atIndex, 1);
      return true;
    }

    // Clone the item at atIndex, replace strings with placeholders, insert after
    const sourceIndex = (atIndex >= 0 && atIndex < elements.length) ? atIndex : elements.length - 1;
    const sourceElement = elements[sourceIndex];
    if (!sourceElement) return false;
    const clone: AstNode = JSON.parse(JSON.stringify(sourceElement));
    replaceStringsWithPlaceholders(clone);
    assignUniqueId(clone);
    elements.splice(sourceIndex + 1, 0, clone);
    return true;
  }, {
    successMessage: isAdd ? `Added new item to ${arrayPath}` : `Removed item ${atIndex} from ${arrayPath}`,
    errorMessage: `Could not ${isAdd ? 'add to' : 'remove from'} array at ${arrayPath}`,
    errorContext: 'Array item action error:',
  });
}

/** POST: Edit source file content */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Source editing is only allowed in development mode' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { file, line, oldText, newText, isImageSrcReplacement, isColorStyleReplacement, isStyleReplacement, styleProperty, isHrefReplacement, contentPath, contentFile } = body;

    // Normalize: color replacement is just style replacement with property='color'
    const resolvedStyleProperty = isColorStyleReplacement ? 'color' : styleProperty;
    const isAnyStyleReplacement = isStyleReplacement || isColorStyleReplacement;

    // ARRAY ITEM ACTIONS: Add/remove items from content arrays (e.g., add a service card)
    if (body.action === 'addArrayItem' || body.action === 'removeArrayItem') {
      return handleArrayItemAction(body.action, body.arrayPath, body.contentFile, body.atIndex);
    }

    // CONTENT PATH EDIT: Edit content file by path (e.g., "SERVICES.items[0].title")
    if (contentPath && newText !== undefined) {
      const imageMeta = body.isImageEdit
        ? { url: body.imageUrl, height: body.imageHeight, description: body.imageDescription }
        : undefined;
      return handleContentPathEdit(contentPath, newText, body.isImageEdit, contentFile, imageMeta);
    }

    // IMAGE RESIZE: Update width/height JSX attributes on an Image component
    if (body.isImageResize) {
      const { newWidth, newHeight } = body;
      if (!file || line === undefined || !newWidth || !newHeight) {
        return NextResponse.json({ error: 'Missing required parameters for image resize' }, { status: 400 });
      }
      const resizeValidation = await validateFilePath(file);
      if ('error' in resizeValidation) {
        return NextResponse.json({ error: resizeValidation.error }, { status: resizeValidation.status });
      }
      const resizeContent = await fs.readFile(resizeValidation.absolutePath, 'utf-8');
      const resizeAst = parser.parse(resizeContent, BABEL_PARSE_OPTS);

      let resized = false;
      traverse(resizeAst, {
        JSXOpeningElement(nodePath: any) {
          if (resized) return;
          const elementLine = nodePath.node.loc?.start.line;
          if (elementLine !== line) return;

          for (const attr of nodePath.node.attributes) {
            if (attr.type !== 'JSXAttribute') continue;
            const name = attr.name?.name;
            if (name === 'width' || name === 'height') {
              const val = name === 'width' ? newWidth : newHeight;
              attr.value = { type: 'JSXExpressionContainer', expression: { type: 'NumericLiteral', value: val } };
              resized = true;
            }
          }
        },
      });

      if (!resized) {
        return NextResponse.json({ error: 'Could not find width/height attributes at the specified line' }, { status: 400 });
      }

      const resizeOutput = generate(resizeAst, BABEL_GENERATE_OPTS);
      await fs.writeFile(resizeValidation.absolutePath, resizeOutput.code, 'utf-8');
      return NextResponse.json({ success: true, message: `Image resized to ${newWidth}x${newHeight}` });
    }

    // Validate inputs
    if (!file || line === undefined || newText === undefined) {
      return NextResponse.json(
        { error: 'Missing required parameters: file, line, newText' },
        { status: 400 }
      );
    }

    const validation = await validateFilePath(file);
    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    const absolutePath = validation.absolutePath;

    // Read the file
    const fileContent = await fs.readFile(absolutePath, 'utf-8');

    // Parse the file into an AST
    const ast = parser.parse(fileContent, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    let textNodeFound = false;
    let replacementMade = false;
    const debugInfo: string[] = [];
    let bestMatchElement: { path: unknown; openingElement: unknown; elementNode: unknown } | null = null;
    let bestMatchSpan = Infinity;

      // Handle image src replacement differently
      if (isImageSrcReplacement) {
        traverse(ast, {
          JSXElement(path: any) {
          const openingElement = path.node.openingElement;
          
          // Check if this element is on the target line
          const elementLine = openingElement.loc?.start.line;
          
          if (elementLine === line) {
            // Find and replace the src attribute
            const attributes = openingElement.attributes;
            for (let i = 0; i < attributes.length; i++) {
              const attr = attributes[i];
              if (attr.type === 'JSXAttribute' && attr.name.name === 'src') {
                // Replace the src value with the new image URL as a string literal
                // If it was a JSX expression (e.g., {PROFESSIONAL_IMAGES[0]}), convert to string
                attr.value = {
                  type: 'StringLiteral',
                  value: newText,
                };
                replacementMade = true;
                debugInfo.push(`Replaced src attribute on line ${line} with "${newText}"`);
                break;
              }
            }
          }
        }
      });

      if (replacementMade) {
        // Generate updated code
        const output = generate(ast, {
          retainLines: true,
          retainFunctionParens: true,
        });

        // Write the updated code back to the file
        await fs.writeFile(absolutePath, output.code, 'utf-8');

        return NextResponse.json({ 
          success: true, 
          message: 'Image src updated successfully',
          debug: debugInfo 
        });
      } else {
        return NextResponse.json(
          {
            error: 'Could not find src attribute at the specified line',
            debug: debugInfo
          },
          { status: 400 }
        );
      }
    }

    // Handle style property replacement using AST (includes color edits)
    if (isAnyStyleReplacement && resolvedStyleProperty) {
      let styleUpdated = false;

      traverse(ast, {
        JSXElement(nodePath: any) {
          if (styleUpdated) return;

          const openingElement = nodePath.node.openingElement;
          const elementLine = openingElement.loc?.start.line;

          if (elementLine === line) {
            const tagName = openingElement.name?.name || 'Component';
            debugInfo.push(`Found <${tagName}> on line ${line} for ${resolvedStyleProperty}`);

            // Find existing style attribute
            const styleAttr = openingElement.attributes.find(
              (a: any) => a.type === 'JSXAttribute' && a.name?.name === 'style'
            );

            // Case 1: Has style attribute already
            if (styleAttr?.value?.expression?.type === 'ObjectExpression') {
              const props = styleAttr.value.expression.properties;
              const existingProp = props.find((p: any) => p.key?.name === resolvedStyleProperty);
              // Case 1.1: Has Style and prop we are looking for
              if (existingProp) {
                existingProp.value = { type: 'StringLiteral', value: newText };
                debugInfo.push(`Updated existing ${resolvedStyleProperty}`);
              // Case 1.2: Has Style but not prop we are looking for
              } else {
                props.unshift({
                  type: 'ObjectProperty',
                  key: { type: 'Identifier', name: resolvedStyleProperty },
                  value: { type: 'StringLiteral', value: newText },
                  computed: false,
                  shorthand: false,
                });
                debugInfo.push(`Added ${resolvedStyleProperty} to existing style`);
              }
              styleUpdated = true;
              // Case 2: No style attribute
            } else if (!styleAttr) {
              openingElement.attributes.unshift({
                type: 'JSXAttribute',
                name: { type: 'JSXIdentifier', name: 'style' },
                value: {
                  type: 'JSXExpressionContainer',
                  expression: {
                    type: 'ObjectExpression',
                    properties: [{
                      type: 'ObjectProperty',
                      key: { type: 'Identifier', name: resolvedStyleProperty },
                      value: { type: 'StringLiteral', value: newText },
                      computed: false,
                      shorthand: false,
                    }],
                  },
                },
              });
              debugInfo.push(`Added new style attribute with ${resolvedStyleProperty}`);
              styleUpdated = true;
            } else {
              debugInfo.push('Style attribute exists but is not a simple object');
            }
          }
        },
      });

      if (styleUpdated) {
        const output = generate(ast, { retainLines: true, retainFunctionParens: true });
        await fs.writeFile(absolutePath, output.code, 'utf-8');
        return NextResponse.json({ success: true, message: `${resolvedStyleProperty} updated`, debug: debugInfo });
      }

      return NextResponse.json(
        { error: 'Could not find element on specified line', debug: debugInfo },
        { status: 400 }
      );
    }

    // Handle href replacement for link elements
    if (isHrefReplacement) {
      traverse(ast, {
        JSXElement(path: any) {
          const openingElement = path.node.openingElement;

          // Check if this element is on the target line
          const elementLine = openingElement.loc?.start.line;

          if (elementLine === line) {
            // Check if this is an anchor/Link element
            let elementName = '';
            if (openingElement.name.type === 'JSXIdentifier') {
              elementName = openingElement.name.name;
            }

            // Handle both <a> and <Link> components
            if (elementName === 'a' || elementName === 'Link') {
              // Find and replace the href attribute
              const attributes = openingElement.attributes;
              for (let i = 0; i < attributes.length; i++) {
                const attr = attributes[i];
                if (attr.type === 'JSXAttribute' && attr.name.name === 'href') {
                  // Replace the href value with the new URL as a string literal
                  attr.value = {
                    type: 'StringLiteral',
                    value: newText,
                  };
                  replacementMade = true;
                  debugInfo.push(`Replaced href attribute on line ${line} with "${newText}"`);
                  break;
                }
              }

              // If no href attribute found, add one
              if (!replacementMade) {
                openingElement.attributes.push({
                  type: 'JSXAttribute',
                  name: { type: 'JSXIdentifier', name: 'href' },
                  value: { type: 'StringLiteral', value: newText },
                });
                replacementMade = true;
                debugInfo.push(`Added href attribute on line ${line} with "${newText}"`);
              }
            }
          }
        }
      });

      if (replacementMade) {
        // Generate updated code
        const output = generate(ast, {
          retainLines: true,
          retainFunctionParens: true,
        });

        // Write the updated code back to the file
        await fs.writeFile(absolutePath, output.code, 'utf-8');

        return NextResponse.json({
          success: true,
          message: 'Link href updated successfully',
          debug: debugInfo
        });
      } else {
        return NextResponse.json(
          {
            error: 'Could not find link element or href attribute at the specified line',
            debug: debugInfo
          },
          { status: 400 }
        );
      }
    }

    // First, find the most specific (smallest/innermost) element containing the target line
    traverse(ast, {
      JSXElement(path: any) {
        const openingElement = path.node.openingElement;
        const elementNode = path.node;
        
        // Check if this element contains the target line
        const elementStartLine = openingElement.loc?.start.line;
        const elementEndLine = elementNode.loc?.end.line;
        
        if (elementStartLine && elementEndLine && 
            line >= elementStartLine && line <= elementEndLine) {
          // Calculate span (smaller span = more specific element)
          const span = elementEndLine - elementStartLine;
          
          // Keep the smallest (most specific) match
          if (span < bestMatchSpan) {
            bestMatchSpan = span;
            bestMatchElement = { path, openingElement, elementNode };
          }
        }
      }
    });

    debugInfo.push(`Best match found: ${bestMatchElement ? 'YES' : 'NO'}`);
    
    // Now process the best match
    if (bestMatchElement) {
      const { openingElement, elementNode } = bestMatchElement as any;
      
      const elementStartLine = openingElement.loc?.start.line;
      const elementEndLine = elementNode.loc?.end.line;
      
      // Handle both standard elements (h1, div) and custom components (Link, Button)
      let elementName = 'unknown';
      if (openingElement.name.type === 'JSXIdentifier') {
        elementName = openingElement.name.name;
      } else if (openingElement.name.type === 'JSXMemberExpression') {
        elementName = openingElement.name.property?.name || 'unknown';
      }
      
      debugInfo.push(`Found element: <${elementName}> spanning lines ${elementStartLine}-${elementEndLine}`);
      debugInfo.push(`Target line: ${line}`);
      debugInfo.push(`Children count: ${elementNode.children?.length || 0}`);
      
      // Simple approach: Replace ALL content of this element with the new text
      // No need for complex matching - we already know this is the right element!
      const children = elementNode.children || [];
      
      if (children.length > 0) {
        debugInfo.push(`Replacing all ${children.length} children with new text`);
        
        // Replace first child with new text node, remove all others
        children[0] = {
          type: 'JSXText',
          value: newText,
        };
        children.splice(1);
        
        textNodeFound = true;
        replacementMade = true;
      } else {
        debugInfo.push(`Element has no children - cannot replace content`);
      }
    }

    // Keep the old matching logic as fallback for edge cases
    if (!replacementMade && bestMatchElement) {
      const { elementNode } = bestMatchElement as any;
      const trimmedOld = oldText.trim();
      const normalizedOld = trimmedOld.replace(/\s+/g, ' ');
      
      // Helper to normalize whitespace in text (collapse multiple spaces/newlines to single space)
      const normalizeWhitespace = (text: string): string => {
        return text.trim().replace(/\s+/g, ' ');
      };
      
      // Helper function to collect all JSXText and JSXExpressionContainer nodes from an element's children
      const collectContentNodes = (node: any): any[] => {
        const contentNodes: any[] = [];
        
        if (node.type === 'JSXText') {
          contentNodes.push({ type: 'text', node });
        } else if (node.type === 'JSXExpressionContainer') {
          // Include expression containers - we'll replace them with literal text if edited
          contentNodes.push({ type: 'expression', node });
        } else if (node.type === 'JSXElement') {
          const children = node.children || [];
          for (const child of children) {
            contentNodes.push(...collectContentNodes(child));
          }
        }
        
        return contentNodes;
      };
      
      // Helper function to recursively search for text in all descendants
      const searchTextInNode = (node: any, depth: number = 0): boolean => {
        const indent = '  '.repeat(depth);
        
        if (node.type === 'JSXText') {
          const nodeTextDecoded = decodeHTMLEntities(node.value);
          const trimmedNode = nodeTextDecoded.trim();
          const normalizedNode = normalizeWhitespace(nodeTextDecoded);
          
          debugInfo.push(`${indent}JSXText: "${trimmedNode}"`);
          
          // Try exact match (normalized)
          if (normalizedNode === normalizedOld) {
            debugInfo.push(`${indent}✓ Exact match (normalized)!`);
            node.value = newText;
            textNodeFound = true;
            replacementMade = true;
            return true;
          }
          
          // Try exact match (trimmed, not normalized)
          if (trimmedNode === trimmedOld) {
            debugInfo.push(`${indent}✓ Exact match!`);
            node.value = newText;
            textNodeFound = true;
            replacementMade = true;
            return true;
          }
          
          // Try partial match
          if (trimmedNode.includes(trimmedOld)) {
            debugInfo.push(`${indent}✓ Partial match!`);
            const decodedValue = decodeHTMLEntities(node.value);
            const oldTextIndex = decodedValue.indexOf(trimmedOld);
            
            if (oldTextIndex !== -1) {
              const before = decodedValue.substring(0, oldTextIndex);
              const after = decodedValue.substring(oldTextIndex + trimmedOld.length);
              node.value = before + newText + after;
              textNodeFound = true;
              replacementMade = true;
              return true;
            }
          }
          
          // Check if part of larger selection
          if (trimmedNode && trimmedOld.includes(trimmedNode)) {
            debugInfo.push(`${indent}✓ Part of search string`);
            const indexInOld = trimmedOld.indexOf(trimmedNode);
            
            if (indexInOld !== -1) {
              const beforeTextInOld = trimmedOld.substring(0, indexInOld);
              const newTextTrimmed = newText.trim();
              const beforeLength = beforeTextInOld.length;
              const newTextForNode = newTextTrimmed.substring(beforeLength);
              
              const leadingWhitespace = node.value.match(/^\s*/)?.[0] || '';
              const trailingWhitespace = node.value.match(/\s*$/)?.[0] || '';
              node.value = leadingWhitespace + newTextForNode + trailingWhitespace;
              textNodeFound = true;
              replacementMade = true;
              return true;
            }
          }
        } else if (node.type === 'JSXElement') {
          debugInfo.push(`${indent}JSXElement (searching children...)`);
          
          // Collect all content nodes (text + expressions) from this element
          const contentNodes = collectContentNodes(node);
          
          if (contentNodes.length > 0) {
            // Check if we have any expressions mixed with text
            const hasExpressions = contentNodes.some(n => n.type === 'expression');
            const textOnlyNodes = contentNodes.filter(n => n.type === 'text');
            
            if (hasExpressions) {
              debugInfo.push(`${indent}Element contains ${contentNodes.length} content nodes (${textOnlyNodes.length} text, ${contentNodes.length - textOnlyNodes.length} expressions)`);
              debugInfo.push(`${indent}Note: This element contains dynamic expressions. If edited, they will be replaced with literal text.`);
              
              // For elements with expressions, use fuzzy matching
              // The browser shows rendered text, but we only have the literal text parts
              
              // Get individual text parts (don't join them yet - they may be separated by expressions)
              const textParts = textOnlyNodes
                .map(n => normalizeWhitespace(decodeHTMLEntities(n.node.value)))
                .filter(t => t.length > 0); // Filter out empty/whitespace-only nodes
              
              debugInfo.push(`${indent}Text parts (${textParts.length}): ${textParts.map(t => `"${t}"`).join(', ')}`);
              debugInfo.push(`${indent}Looking for: "${normalizedOld}"`);
              
              let isLikelyMatch = false;
              
              const firstTextPart = textParts[0];
              if (textParts.length > 0 && firstTextPart) {
                // Strategy 1: Text only at the beginning (e.g., "Call Now: " + expression)
                // Check if oldText starts with our first text part
                if (normalizedOld.startsWith(firstTextPart) && firstTextPart.length > 3) {
                  debugInfo.push(`${indent}Match strategy: oldText starts with first text part`);
                  isLikelyMatch = true;
                }
                
                // Strategy 2: Text at beginning and end (e.g., "Contact " + expression + " today")
                // Check if we can find all text parts in order within oldText
                if (!isLikelyMatch && textParts.length > 1) {
                  let searchPos = 0;
                  let allPartsFound = true;
                  for (const part of textParts) {
                    const foundAt = normalizedOld.indexOf(part, searchPos);
                    if (foundAt === -1) {
                      allPartsFound = false;
                      break;
                    }
                    searchPos = foundAt + part.length;
                  }
                  if (allPartsFound) {
                    debugInfo.push(`${indent}Match strategy: all text parts found in order`);
                    isLikelyMatch = true;
                  }
                }
                
                // Strategy 3: Single substantial text part contained in oldText
                if (!isLikelyMatch && textParts.length === 1 && firstTextPart && firstTextPart.length > 5) {
                  if (normalizedOld.includes(firstTextPart)) {
                    debugInfo.push(`${indent}Match strategy: substantial text part contained in oldText`);
                    isLikelyMatch = true;
                  }
                }
              }
              
              if (isLikelyMatch) {
                debugInfo.push(`${indent}✓ Fuzzy match with expressions!`);
                
                // Replace ALL content (text + expressions) with literal text
                const children = node.children || [];
                
                if (children.length > 0) {
                  // Create a new JSXText node with the new content
                  children[0] = {
                    type: 'JSXText',
                    value: newText,
                  };
                  // Remove all other children (expressions and other text nodes)
                  children.splice(1);
                }
                
                textNodeFound = true;
                replacementMade = true;
                return true;
              }
            } else if (textOnlyNodes.length > 0) {
              // No expressions - standard matching
              const combinedText = textOnlyNodes
                .map(n => decodeHTMLEntities(n.node.value))
                .join('');
              const normalizedCombined = normalizeWhitespace(combinedText);
              
              debugInfo.push(`${indent}Combined text from ${textOnlyNodes.length} text nodes: "${normalizedCombined}"`);
              
              // Check if combined text matches
              if (normalizedCombined === normalizedOld) {
                debugInfo.push(`${indent}✓ Combined text match!`);
                
                // No expressions - just replace text nodes
                textOnlyNodes[0].node.value = newText;
                for (let i = 1; i < textOnlyNodes.length; i++) {
                  textOnlyNodes[i].node.value = '';
                }
                
                textNodeFound = true;
                replacementMade = true;
                return true;
              }
            }
          }
          
          // Recursively search children if no combined match
          const children = node.children || [];
          for (const child of children) {
            if (searchTextInNode(child, depth + 1)) {
              return true;
            }
          }
        } else if (node.type === 'JSXExpressionContainer' && 
                   node.expression.type === 'StringLiteral') {
          debugInfo.push(`${indent}JSXExpression: "${node.expression.value}"`);
          if (node.expression.value === oldText) {
            node.expression.value = newText;
            textNodeFound = true;
            replacementMade = true;
            return true;
          }
        }
        
        return false;
      };
      
      // Search through all descendants recursively
      debugInfo.push(`Searching for: "${trimmedOld}"`);
      const children = elementNode.children || [];
      for (let i = 0; i < children.length; i++) {
        if (searchTextInNode(children[i], 0)) {
          break;
        }
      }
    }

    // Also check for JSX attributes (less common but possible)
    if (!replacementMade) {
      traverse(ast, {
        JSXAttribute(path: any) {
          const node = path.node;
          
          // Check if this is a string literal attribute on the target line
          if (node.loc && node.loc.start.line === line && 
              node.value && node.value.type === 'StringLiteral') {
            const attrValue = node.value.value;
            
            if (attrValue === oldText) {
              node.value.value = newText;
              textNodeFound = true;
              replacementMade = true;
              path.stop();
            }
          }
        }
      });
    }

    if (!textNodeFound) {
      console.error('Debug info:', debugInfo.join('\n'));
      return NextResponse.json(
        { 
          error: `No editable text found at line ${line}. The element might not contain direct text content.`,
          details: 'Try selecting the text content directly, not the container element.',
          debug: debugInfo
        },
        { status: 400 }
      );
    }

    if (!replacementMade) {
      console.error('Debug info:', debugInfo.join('\n'));
      return NextResponse.json(
        { 
          error: 'Text mismatch - the source may have changed since page load',
          debug: debugInfo
        },
        { status: 400 }
      );
    }

    // Generate the updated source code
    const output = generate(ast, {
      retainLines: true,
      compact: false,
    });

    // Write the updated content back to the file
    await fs.writeFile(absolutePath, output.code, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'File updated successfully',
      file: file,
      line,
    });

  } catch (error) {
    console.error('Source edit error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to update source file' 
      },
      { status: 500 }
    );
  }
}

// Helper to decode HTML entities (handles &amp; &lt; &gt; &quot; etc.)
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  return text.replace(/&[a-z]+;|&#\d+;/gi, (match) => entities[match] || match);
}

