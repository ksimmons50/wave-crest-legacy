// Core utilities and logic for click-to-source editing functionality

// Files/patterns that should not be editable
export const NON_EDITABLE_FILES = [
  /ClickToSource\.tsx$/,
  /LeadForm\.tsx$/,
  /RealReviews\.tsx$/,
  /RealScheduling\.tsx$/,
  /Chat\.tsx$/,
  /FloatingChat\.tsx$/,
  /PoweredByBreezy\.tsx$/,
  /CustomBuildErrorOverlay\.tsx$/,
  /DevErrorBoundary\.tsx$/,
  /\/LinkButton\.tsx$/,  // Match with leading slash
  /error\.tsx$/,
  /global-error\.tsx$/,
  /not-found\.tsx$/,
  /loading\.tsx$/,
  // Comment system files
  /\/comments\/.*\.tsx$/,
];

// Element IDs that should not be edited
const NON_EDITABLE_IDS = [
  'breezy-chat-widget-container'
];

// Tags that are never content (always containers or SVG internals)
const CONTAINER_TAGS = [
  'DIV',
  'MAIN',
  'FOOTER',
  'HEADER',
  'NAV',
  'ARTICLE',
  'ASIDE'
];

// Tags that represent editable content (text elements)
const CONTENT_TEXT_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LABEL', 'LI', 'TD', 'TH'];

// All content tags including images
const CONTENT_TAGS = [...CONTENT_TEXT_TAGS, 'IMG'];

// CSS selector for querySelectorAll (lowercase)
const CONTENT_SELECTOR = CONTENT_TAGS.map(t => t.toLowerCase()).join(', ');

const SVG_TAGS = ['SVG',
  'PATH',
  'CIRCLE',
  'RECT',
  'LINE',
  'POLYGON',
  'POLYLINE',
  'ELLIPSE',
  'G',
  'DEFS',
  'USE',
];

// DOM traversal depth limit for non-editable check
const MAX_NON_EDITABLE_CHECK_DEPTH = 20;

// UI constants
export const SECTION_HIGHLIGHT_COLOR = '#9333ea';
export const CONTENT_HIGHLIGHT_COLOR = '#3b82f6';
export const EDIT_MODE_COLOR = '#10b981';

// Message types - sent to parent (breezy-fe)
export const MSG_CONTAINER_SELECTED = 'containerSelected';
export const MSG_ELEMENT_SELECTED = 'elementSelected';
export const MSG_CLEAR_EDITOR_SELECTION = 'clearEditorSelection';

// Message types - received from parent (breezy-fe)
export const MSG_RESELECT_ELEMENT = 'reselectElement';
export const MSG_SELECT_PARENT = 'selectParent';
export const MSG_ELEMENT_PREVIEW = 'elementPreview';
export const MSG_ELEMENT_UPDATE = 'elementUpdate';
export const MSG_REQUEST_SECTIONS = 'requestSections';
export const MSG_REORDER_SECTIONS = 'reorderSections';
export const MSG_REQUEST_SECTION_LIBRARY = 'requestSectionLibrary';
export const MSG_ADD_SECTION = 'addSection';
export const MSG_REMOVE_SECTION = 'removeSection';

// Message types - sent to parent (breezy-fe) for sections
export const MSG_SECTIONS_DATA = 'sectionsData';
export const MSG_SECTION_LIBRARY_DATA = 'sectionLibraryData';
export const MSG_SECTION_ADDED = 'sectionAdded';
export const MSG_SECTION_REMOVED = 'sectionRemoved';

// Message types - received from parent (breezy-fe) for pages
export const MSG_REQUEST_PAGES = 'requestPages';
export const MSG_REQUEST_PAGE_LIBRARY = 'requestPageLibrary';
export const MSG_ADD_PAGE = 'addPage';
export const MSG_REMOVE_PAGE = 'removePage';

// Message types - sent to parent (breezy-fe) for pages
export const MSG_PAGES_DATA = 'pagesData';
export const MSG_PAGE_LIBRARY_DATA = 'pageLibraryData';
export const MSG_PAGE_ADDED = 'pageAdded';
export const MSG_PAGE_REMOVED = 'pageRemoved';

// Message types - received from parent (breezy-fe) for array items (add/delete cards)
export const MSG_ADD_ARRAY_ITEM = 'addArrayItem';
export const MSG_REMOVE_ARRAY_ITEM = 'removeArrayItem';

// Message types - sent to parent (breezy-fe) for array items
export const MSG_ARRAY_ITEM_ADDED = 'arrayItemAdded';
export const MSG_ARRAY_ITEM_REMOVED = 'arrayItemRemoved';

// ============================================================================
// Core Selection Functions (elementsFromPoint-based)
// ============================================================================

/**
 * Check if element is a decorative/cosmetic element that should be ignored.
 * These are typically absolute-positioned overlays, gradients, etc.
 */
export const isDecorativeElement = (element: HTMLElement): boolean => {
  const tag = element.tagName.toUpperCase();

  // Only divs and spans can be decorative in this context
  if (tag !== 'DIV' && tag !== 'SPAN') return false;

  const style = window.getComputedStyle(element);

  // Must be absolutely/fixed positioned
  if (style.position !== 'absolute' && style.position !== 'fixed') return false;

  // Check for full coverage positioning (inset-0 pattern)
  const isFullCoverage = style.inset === '0px' ||
    (style.top === '0px' && style.right === '0px' &&
     style.bottom === '0px' && style.left === '0px');

  if (!isFullCoverage) return false;

  // Low opacity = decorative
  if (parseFloat(style.opacity) < 0.5) return true;

  // Explicit pointer-events: none = decorative
  if (style.pointerEvents === 'none') return true;

  // No text content and no interactive children = likely decorative
  const hasNoText = !element.textContent?.trim();
  const hasNoButtons = !element.querySelector('button, a, input, [role="button"]');

  if (hasNoText && hasNoButtons) return true;

  return false;
};

/**
 * Check if element is a content element (text, image, link, button, etc.)
 * Content elements are preferred over containers during selection.
 */
export const isContentElement = (element: HTMLElement): boolean => {
  const tag = element.tagName.toUpperCase();

  // Images are always content
  if (tag === 'IMG') return true;

  // Text elements with actual text content
  if (CONTENT_TEXT_TAGS.includes(tag) && hasDirectTextContent(element)) {
    return true;
  }

  // Links and buttons are content even without direct text (might have icons)
  if (tag === 'A' || tag === 'BUTTON') return true;

  return false;
};

/**
 * Check if element is a container element (DIV, HEADER, etc. but NOT SECTION)
 */
export const isContainerElement = (element: HTMLElement): boolean => {
  return CONTAINER_TAGS.includes(element.tagName.toUpperCase());
};

/**
 * Check if element is a section or container (used for highlight color selection)
 */
export const isSectionOrContainer = (element: HTMLElement): boolean => {
  return isSectionElement(element) || isContainerElement(element);
};

/**
 * Get all selectable elements at a specific screen position.
 * Uses elementsFromPoint() for accurate position-based selection.
 */
export const getElementsAtPoint = (x: number, y: number): HTMLElement[] => {
  const allElements = document.elementsFromPoint(x, y) as HTMLElement[];

  // If a non-editable element is blocking (e.g., comment UI, chat widget), return no elements
  // This prevents clicking "through" overlays to select elements behind them
  const hasBlockingElement = allElements.some(el => 
    el.dataset.nonEditable || 
    el.dataset.commentUi !== undefined ||
    (el.dataset.sourceFile && !isFileEditable(el.dataset.sourceFile))
  );
  if (hasBlockingElement) {
    return [];
  }

  return allElements.filter(el => {
    // Must have valid source data and be in editable context
    if (!hasEditableSourceData(el)) return false;

    // Skip SVG elements
    if (SVG_TAGS.includes(el.tagName.toUpperCase())) return false;
    if (el.closest('svg')) return false;

    // Skip decorative elements
    if (isDecorativeElement(el)) return false;

    return true;
  });
};

/**
 * Pick the best element from a list of candidates at a point.
 * Prefers content elements (text, images) over containers.
 * If no content, returns the most specific container (first in list from elementsFromPoint).
 */
export const pickBestElement = (elements: HTMLElement[]): HTMLElement | null => {
  if (elements.length === 0) return null;

  // Find content elements (text, images, buttons, links)
  const contentElements = elements.filter(isContentElement);

  // If we have content, return the topmost (first) one
  if (contentElements.length > 0) {
    return contentElements[0] ?? null;
  }

  // No content - return the most specific container (first element in list)
  // This allows selecting DIVs when clicking on empty space/padding
  return elements[0] ?? null;
};

/**
 * Main selection function: get the best selectable element at a point.
 * Combines getElementsAtPoint and pickBestElement.
 */
export const getElementAtPoint = (x: number, y: number): HTMLElement | null => {
  const elements = getElementsAtPoint(x, y);
  return pickBestElement(elements);
};

/**
 * Get editable content children of a container element.
 * Filters out children that are inside non-editable components.
 */
export const getEditableChildren = (container: HTMLElement): HTMLElement[] => {
  const children: HTMLElement[] = [];
  const candidates = container.querySelectorAll(CONTENT_SELECTOR);

  for (const el of candidates) {
    const htmlEl = el as HTMLElement;

    // Must have valid source data and be in editable context
    if (!hasEditableSourceData(htmlEl)) continue;

    // For text elements, must have direct text content
    if (htmlEl.tagName !== 'IMG' && !hasDirectTextContent(htmlEl)) continue;

    children.push(htmlEl);
  }

  return children;
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Normalizes whitespace in text by collapsing multiple spaces/newlines into single spaces
 */
export const normalizeWhitespace = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

/**
 * Convert RGB string (e.g., "rgb(255, 128, 0)" or "rgba(255, 128, 0, 1)") to hex
 * Returns null if the string is not a valid RGB/RGBA format
 */
export const rgbToHex = (rgb: string): string | null => {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match || !match[1] || !match[2] || !match[3]) return null;

  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

/**
 * Checks if a file path matches any of the non-editable patterns
 */
export const isFileEditable = (sourceFile: string): boolean => {
  return !NON_EDITABLE_FILES.some(pattern => pattern.test(sourceFile));
};

/**
 * Checks if element is inside a non-editable component
 */
export const isInsideNonEditableComponent = (element: HTMLElement): boolean => {
  let current: HTMLElement | null = element;
  let depth = 0;
  while (current && depth < MAX_NON_EDITABLE_CHECK_DEPTH) {
    if (current.dataset.nonEditable) {
      return true;
    }
    if (NON_EDITABLE_IDS.includes(current.id)) {
      return true;
    }
    if (current.tagName.toUpperCase() === 'SVG') {
      return true;
    }
    if (current.dataset.sourceFile && !isFileEditable(current.dataset.sourceFile)) {
      return true;
    }
    current = current.parentElement;
    depth++;
  }
  return false;
};

/**
 * Checks if element has valid source data and is in an editable context.
 * Used to filter elements during selection.
 */
export const hasEditableSourceData = (el: HTMLElement): boolean => {
  if (!el.dataset?.sourceFile || !el.dataset?.sourceLine) return false;
  if (!isFileEditable(el.dataset.sourceFile)) return false;
  if (isInsideNonEditableComponent(el)) return false;
  return true;
};

/**
 * Extracts source location data from an element's data attributes.
 */
export const getSourceLocation = (el: HTMLElement): { sourceFile: string; sourceLine: number; sourceColumn: number } => ({
  sourceFile: el.dataset.sourceFile || '',
  sourceLine: parseInt(el.dataset.sourceLine || '0', 10),
  sourceColumn: parseInt(el.dataset.sourceColumn || '0', 10),
});

// Max depth for DOM ancestor climbing to prevent infinite loops
const MAX_CLIMB_DEPTH = 50;

/**
 * Climbs the DOM from startElement looking for an ancestor with data-content-props
 * that contains the specified key. Returns the matched value and the element, or null.
 *
 * Also checks the startElement itself (props may be forwarded to same element).
 */
const findContentPropInAncestors = (
  startElement: HTMLElement | null,
  propKey: string,
  includeSelf = false
): { value: string; element: HTMLElement } | null => {
  let current = includeSelf ? startElement : startElement?.parentElement ?? null;
  let depth = 0;

  while (current && depth < MAX_CLIMB_DEPTH) {
    const contentPropsAttr = current.dataset.contentProps;
    if (contentPropsAttr) {
      try {
        const contentProps = JSON.parse(contentPropsAttr);
        if (contentProps[propKey]) {
          return { value: contentProps[propKey], element: current };
        }
      } catch {
        // Invalid JSON, continue climbing
      }
    }
    current = current.parentElement;
    depth++;
  }

  return null;
};

/**
 * Recursively resolves a content path and file by composing relative paths with their parent paths.
 *
 * A path like "features[0]" is relative — we climb ancestors to find where "features" came from.
 * A path like "PACKAGES.tiers[0].features" is absolute — we use it directly.
 *
 * Returns { path, file } where:
 * - path: the fully resolved content path (e.g., "PACKAGES.tiers[0].features[0].text")
 * - file: the content file from the element where the absolute path was found, or null
 */
const resolveContent = (contentPath: string, startElement: HTMLElement | null): { path: string; file: string | null } => {
  // Extract first segment: "features[0].text" -> "features"
  const match = contentPath.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);
  if (!match || !match[1]) return { path: contentPath, file: null };

  const firstSegment: string = match[1];
  const restOfPath = contentPath.slice(firstSegment.length); // "[0].text" or ".title" etc.

  // Try to find this segment as a prop key in ancestor's data-content-props
  // includeSelf=true because callers already pass the element to start FROM (e.g., el.parentElement)
  const found = findContentPropInAncestors(startElement, firstSegment, /* includeSelf */ true);
  if (found) {
    const composedPath = found.value + restOfPath;
    // Recursively resolve in case the parent path is also relative
    const deeper = resolveContent(composedPath, found.element.parentElement);
    if (deeper.file) {
      return deeper;
    }
    // Couldn't resolve further — this element has the absolute path
    return { path: deeper.path, file: found.element.dataset.contentFile || null };
  }

  // First segment not found as prop — path is already absolute
  return { path: contentPath, file: null };
};

/**
 * Resolves content info (path + file) for an element.
 * Returns both the content path and content file in a single traversal.
 *
 * Supports three modes:
 * 1. Direct: element has data-content-path (and optionally data-content-file)
 * 2. Prop climbing: element has data-prop, climb up to find data-content-props on ancestor
 * 3. Image inference: for IMG elements without data-prop (e.g., next/image), look for
 *    parent with data-content-props containing a "src" key
 *
 * Paths are recursively resolved to handle nested arrays (e.g., features[0] -> PACKAGES.tiers[0].features[0])
 */
export const resolveContentInfo = (el: HTMLElement): { path: string | null; file: string | null } => {
  // Mode 1: Direct content path
  if (el.dataset.contentPath) {
    const resolved = resolveContent(el.dataset.contentPath, el.parentElement);
    // Use direct file if available, otherwise use resolved file
    return {
      path: resolved.path,
      file: el.dataset.contentFile || resolved.file,
    };
  }

  // Mode 2: Prop climbing with explicit data-prop
  // If element has data-prop, find data-content-props (on self or ancestor)
  const propName = el.dataset.prop;
  if (propName) {
    const found = findContentPropInAncestors(el, propName, /* includeSelf */ true);
    if (found) {
      const resolved = resolveContent(found.value, found.element.parentElement);
      return {
        path: resolved.path,
        file: resolved.file || found.element.dataset.contentFile || null,
      };
    }
  }

  // Mode 3: Image inference
  // For IMG elements without data-prop (e.g., rendered by next/image which doesn't forward data-*),
  // look for parent with data-content-props containing a "src" key
  if (el.tagName === 'IMG') {
    const found = findContentPropInAncestors(el, 'src');
    if (found) {
      const resolved = resolveContent(found.value, found.element.parentElement);
      return {
        path: resolved.path,
        file: resolved.file || found.element.dataset.contentFile || null,
      };
    }
  }

  return { path: null, file: null };
};

/**
 * Builds a CSS selector to find an element by its source location attributes.
 */
export const buildSourceSelector = (
  sourceFile: string,
  sourceLine: number | string,
  sourceColumn?: number | string
): string => {
  return `[data-source-file="${sourceFile}"][data-source-line="${sourceLine}"]${
    sourceColumn ? `[data-source-column="${sourceColumn}"]` : ''
  }`;
};

/**
 * Finds an element in the DOM by its source location.
 */
export const findElementBySource = (
  sourceFile: string,
  sourceLine: number | string,
  sourceColumn?: number | string
): HTMLElement | null => {
  const selector = buildSourceSelector(sourceFile, sourceLine, sourceColumn);
  return document.querySelector<HTMLElement>(selector);
};

/**
 * Checks if element has text nodes as direct children (not just nested in other elements)
 */
export const hasDirectTextContent = (element: HTMLElement): boolean => {
  for (const child of element.childNodes) {
    if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if element is a section element
 */
export const isSectionElement = (el: HTMLElement): boolean => {
  return el.tagName === 'SECTION';
};

/**
 * Checks if element is an image or contains an image
 */
export const isImageElement = (element: HTMLElement): boolean => {
  return element.tagName === 'IMG' || element.querySelector('img') !== null;
};

/**
 * Gets the img element from an element (either the element itself or a child img)
 */
export const getImgElement = (element: HTMLElement): HTMLImageElement | null => {
  if (element.tagName === 'IMG') {
    return element as HTMLImageElement;
  }
  return element.querySelector('img') as HTMLImageElement | null;
};

/**
 * Checks if an element is valid for editing
 */
export const isElementEditable = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  if (SVG_TAGS.includes(element.tagName.toUpperCase())) return false;
  if (element.dataset.nonEditable) return false;
  if (isInsideNonEditableComponent(element)) return false;
  return true;
};

// ============================================================================
// Save/Edit Functions
// ============================================================================

/**
 * Saves an edit to the source file via the API
 * If element has data-content-path and data-content-file, edits the content file instead
 */
export const saveEdit = async (
  element: HTMLElement,
  sourceFile: string,
  sourceLine: string,
  originalContent: string,
  sourceColumn?: string
): Promise<{ success: boolean; newContent: string }> => {
  const newContent = element.textContent || '';
  const normalizedNew = normalizeWhitespace(newContent);
  const normalizedOriginal = normalizeWhitespace(originalContent);

  if (normalizedNew === normalizedOriginal) {
    return { success: true, newContent: originalContent };
  }

  // Check for content path and file (content file editing)
  const { path: contentPath, file: contentFile } = resolveContentInfo(element);

  if (process.env.NODE_ENV === 'development') {
    console.log('💾 Saving edit...');
    console.log(`   Old: "${originalContent}"`);
    console.log(`   New: "${newContent}"`);
    if (contentPath) {
      console.log(`   📍 Content path: ${contentPath}`);
      console.log(`   📁 Content file: ${contentFile}`);
    }
  }

  try {
    const body = contentPath
      ? { contentPath, contentFile, newText: newContent }
      : {
          file: sourceFile,
          line: parseInt(sourceLine),
          column: sourceColumn ? parseInt(sourceColumn) : undefined,
          oldText: originalContent,
          newText: newContent,
        };

    const response = await fetch('/api/source-edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ File updated successfully');
      }
      return { success: true, newContent };
    } else {
      console.error('❌ Failed to update file:', result.error);
      if (process.env.NODE_ENV === 'development' && result.debug) {
        console.log('🔍 Debug info:');
        result.debug.forEach((msg: string) => console.log('  ', msg));
      }
      // Revert the content
      element.textContent = originalContent;
      return { success: false, newContent: originalContent };
    }
  } catch (error) {
    console.error('❌ Error saving edit:', error);
    // Revert the content
    element.textContent = originalContent;
    return { success: false, newContent: originalContent };
  }
};

/**
 * Generic helper for source edit API calls
 * Supports both traditional source edits and content path edits
 */
const postSourceEdit = async (
  sourceFile: string,
  sourceLine: string,
  newText: string,
  sourceColumn: string | undefined,
  editType: { isImageSrcReplacement?: boolean; isColorStyleReplacement?: boolean; isStyleReplacement?: boolean; styleProperty?: string; isHrefReplacement?: boolean },
  label: string,
  contentPath?: string | null,
  contentFile?: string | null,
  imageMeta?: { imageUrl?: string; imageHeight?: string; imageDescription?: string },
): Promise<{ success: boolean; error?: string }> => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${label} Updating...`);
    console.log(`   Value: "${newText}"`);
    if (contentPath) {
      console.log(`   📍 Content path: ${contentPath}`);
      console.log(`   📁 Content file: ${contentFile}`);
    }
  }

  try {
    // Use content path if available, otherwise traditional source edit
    const body = contentPath
      ? { contentPath, contentFile, newText, isImageEdit: editType.isImageSrcReplacement, ...imageMeta }
      : {
          file: sourceFile,
          line: parseInt(sourceLine),
          column: sourceColumn ? parseInt(sourceColumn) : undefined,
          newText,
          ...editType,
        };

    const response = await fetch('/api/source-edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Updated successfully');
      }
      return { success: true };
    } else {
      console.error('❌ Failed to update:', result.error);
      if (process.env.NODE_ENV === 'development' && result.debug) {
        console.log('🔍 Debug info:');
        result.debug.forEach((msg: string) => console.log('  ', msg));
      }
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('❌ Error updating:', error);
    return { success: false, error: String(error) };
  }
};

/**
 * Updates an image source in the source file via the API
 * If element has data-content-path and data-content-file, edits the content file instead
 */
export const saveImageEdit = (
  sourceFile: string,
  sourceLine: string,
  newImageUrl: string,
  sourceColumn?: string,
  contentPath?: string | null,
  contentFile?: string | null,
  imageUrl?: string,
  imageHeight?: string,
  imageDescription?: string,
): Promise<{ success: boolean; error?: string }> =>
  postSourceEdit(sourceFile, sourceLine, newImageUrl, sourceColumn, { isImageSrcReplacement: true }, '🖼️', contentPath, contentFile, { imageUrl, imageHeight, imageDescription });

/**
 * Updates text color style in the source file via the API
 */
export const saveColorEdit = (
  sourceFile: string,
  sourceLine: string,
  color: string,
  sourceColumn?: string
): Promise<{ success: boolean; error?: string }> =>
  postSourceEdit(sourceFile, sourceLine, color, sourceColumn, { isColorStyleReplacement: true }, '🎨');

/**
 * Updates a generic style property in the source file via the API
 */
export const saveStyleEdit = (
  sourceFile: string,
  sourceLine: string,
  styleProperty: string,
  value: string,
  sourceColumn?: string
): Promise<{ success: boolean; error?: string }> =>
  postSourceEdit(sourceFile, sourceLine, value, sourceColumn, { isStyleReplacement: true, styleProperty }, '✏️');

/**
 * Updates a link href in the source file via the API
 */
export const saveHrefEdit = (
  sourceFile: string,
  sourceLine: string,
  href: string,
  sourceColumn?: string
): Promise<{ success: boolean; error?: string }> =>
  postSourceEdit(sourceFile, sourceLine, href, sourceColumn, { isHrefReplacement: true }, '🔗');

