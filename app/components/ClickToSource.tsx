'use client';

import { useEffect } from 'react';
import {
  getElementAtPoint,
  isImageElement,
  getImgElement,
  isElementEditable,
  isSectionElement,
  isContainerElement,
  isSectionOrContainer,
  getEditableChildren,
  getSourceLocation,
  resolveContentInfo,
  findElementBySource,
  saveEdit,
  saveImageEdit,
  saveColorEdit,
  saveStyleEdit,
  saveHrefEdit,
  rgbToHex,
  SECTION_HIGHLIGHT_COLOR,
  CONTENT_HIGHLIGHT_COLOR,
  MSG_CONTAINER_SELECTED,
  MSG_ELEMENT_SELECTED,
  MSG_CLEAR_EDITOR_SELECTION,
  MSG_RESELECT_ELEMENT,
  MSG_SELECT_PARENT,
  MSG_ELEMENT_PREVIEW,
  MSG_ELEMENT_UPDATE,
  MSG_REQUEST_SECTIONS,
  MSG_REORDER_SECTIONS,
  MSG_SECTIONS_DATA,
  MSG_REQUEST_SECTION_LIBRARY,
  MSG_SECTION_LIBRARY_DATA,
  MSG_ADD_SECTION,
  MSG_SECTION_ADDED,
  MSG_REMOVE_SECTION,
  MSG_SECTION_REMOVED,
  MSG_REQUEST_PAGES,
  MSG_REQUEST_PAGE_LIBRARY,
  MSG_ADD_PAGE,
  MSG_REMOVE_PAGE,
  MSG_PAGES_DATA,
  MSG_PAGE_LIBRARY_DATA,
  MSG_PAGE_ADDED,
  MSG_PAGE_REMOVED,
  MSG_ADD_ARRAY_ITEM,
  MSG_REMOVE_ARRAY_ITEM,
  MSG_ARRAY_ITEM_ADDED,
  MSG_ARRAY_ITEM_REMOVED,
} from './ClickToSourceUtils';
import { showLinkTooltip, hideLinkTooltip, isLinkTooltip } from './LinkTooltip';
import { showResizeHandles, hideResizeHandles, updateResizeHandlePositions, isResizeHandle } from './ImageResizeHandles';

// Maximum pixels finger can move and still count as a tap (not a scroll)
const TAP_MOVEMENT_THRESHOLD = 10;

// Helper to fetch data and post message to parent
const fetchAndPostMessage = async (
  url: string,
  responseType: string,
  dataKey: string,
  errorMsg: string
) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    window.parent.postMessage({
      type: responseType,
      payload: { [dataKey]: data[dataKey] }
    }, '*');
  } catch (error) {
    console.error(errorMsg, error);
  }
};

// Helper to perform action (add/remove) and post result
const performActionAndPostMessage = async (
  url: string,
  body: Record<string, unknown>,
  responseType: string,
  errorMsg: string
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    window.parent.postMessage({
      type: responseType,
      payload: { success: response.ok, error: result.error }
    }, '*');
  } catch (error) {
    console.error(errorMsg, error);
  }
};

/** Walk up the DOM from an element to find the nearest ancestor with data-content-array.
 *  Returns array item context or nulls if not inside a .map() array item. */
function findArrayItemContext(element: HTMLElement): {
  contentArray: string | null;
  contentArrayIndex: number | null;
  contentFile: string | null;
} {
  let el: HTMLElement | null = element;
  while (el && el !== document.body) {
    if (el.dataset.contentArray) {
      return {
        contentArray: el.dataset.contentArray,
        contentArrayIndex: el.dataset.contentArrayIndex != null
          ? parseInt(el.dataset.contentArrayIndex, 10) : null,
        contentFile: el.dataset.contentFile || null,
      };
    }
    el = el.parentElement;
  }
  return { contentArray: null, contentArrayIndex: null, contentFile: null };
}

// Module-scoped reference for selection state
// Used for communication between click handler and parent message handler
let selectedElement: HTMLElement | null = null;

function createOverlay(): HTMLDivElement {
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.pointerEvents = 'none';
  el.style.zIndex = '999999';
  el.style.display = 'none';
  el.style.boxSizing = 'border-box';
  document.body.appendChild(el);
  return el;
}

function positionOverlay(overlay: HTMLDivElement, element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  overlay.style.top = `${rect.top}px`;
  overlay.style.left = `${rect.left}px`;
  overlay.style.width = `${rect.width}px`;
  overlay.style.height = `${rect.height}px`;
  overlay.style.borderRadius = window.getComputedStyle(element).borderRadius;
}

function showOverlay(overlay: HTMLDivElement, element: HTMLElement, style: 'dashed' | 'solid') {
  positionOverlay(overlay, element);
  const color = isSectionOrContainer(element) ? SECTION_HIGHLIGHT_COLOR : CONTENT_HIGHLIGHT_COLOR;
  const width = style === 'solid' ? 3 : 2;
  overlay.style.border = `${width}px ${style} ${color}`;
  overlay.style.display = 'block';
}

function hideOverlay(overlay: HTMLDivElement) {
  overlay.style.display = 'none';
}

export default function ClickToSource({ debug_mode }: { debug_mode: string }) {

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Don't run in preview mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('preview') === 'true') {
      return;
    }

    const hoverOverlay = createOverlay();
    const selectionOverlay = createOverlay();
    let currentHoverElement: HTMLElement | null = null;

    const exitHoverMode = () => {
      if (currentHoverElement) {
        hideOverlay(hoverOverlay);
        document.body.style.cursor = '';
        currentHoverElement = null;
      }
    };

    const clearSelectedElementStyle = () => {
      if (selectedElement) {
        hideResizeHandles();
        hideOverlay(selectionOverlay);
        selectedElement = null;
      }
    };

    const applySelectedElementStyle = (element: HTMLElement) => {
      clearSelectedElementStyle();
      selectedElement = element;
      showOverlay(selectionOverlay, element, 'solid');
    };

    /** Fetches the source code line for an element */
    const fetchSourceLine = async (sourceFile: string, sourceLine: string): Promise<string | null> => {
      try {
        const response = await fetch(`/api/source-edit?file=${encodeURIComponent(sourceFile)}&line=${sourceLine}`);
        if (response.ok) {
          const data = await response.json();
          return data.sourceCode || null;
        }
      } catch (error) {
        console.error('Failed to fetch source line:', error);
      }
      return null;
    };

    /** Selects an element and notifies parent window */
    const selectElement = async (element: HTMLElement) => {
      const sourceFile = element.dataset.sourceFile;
      const sourceLine = element.dataset.sourceLine;
      const sourceColumn = element.dataset.sourceColumn;

      if (!sourceFile || !sourceLine) return;

      // Handle section elements - just show selection, clear editor
      if (isSectionElement(element)) {
        applySelectedElementStyle(element);
        window.parent.postMessage({ type: MSG_CLEAR_EDITOR_SELECTION }, '*');
        return;
      }

      // Handle container elements (DIV, etc.)
      if (isContainerElement(element)) {
        applySelectedElementStyle(element);

        const editableChildren = getEditableChildren(element);
        const childrenInfo = editableChildren.map(child => {
          const isImage = child.tagName === 'IMG';
          return {
            tagName: child.tagName,
            content: isImage
              ? (child as HTMLImageElement).src.split('/').pop() || ''
              : child.textContent?.trim().substring(0, 50) || '',
            isImage,
            ...getSourceLocation(child),
          };
        });

        const arrayContext = findArrayItemContext(element);

        window.parent.postMessage({
          type: MSG_CONTAINER_SELECTED,
          payload: {
            sourceFile,
            sourceLine: parseInt(sourceLine, 10),
            sourceColumn: sourceColumn ? parseInt(sourceColumn, 10) : 0,
            tagName: element.tagName,
            childCount: editableChildren.length,
            children: childrenInfo,
            ...arrayContext,
          }
        }, '*');

        if (debug_mode === 'true') {
          console.log('📤 Sent containerSelected to parent:', { sourceFile, sourceLine, childCount: editableChildren.length });
        }
        return;
      }

      // Handle content elements
      applySelectedElementStyle(element);

      const content = element.textContent || '';
      const computedStyle = window.getComputedStyle(element);
      const hexColor = rgbToHex(computedStyle.color);
      const isImage = isImageElement(element);
      const imgElement = isImage ? getImgElement(element) : null;
      const isLink = element.tagName === 'A';

      // Show resize handles for images with explicit width/height
      if (imgElement && imgElement.hasAttribute('width') && imgElement.hasAttribute('height')) {
        showResizeHandles(imgElement, selectionOverlay, async (newWidth, newHeight) => {
          if (!selectedElement) return;
          const sf = selectedElement.dataset.sourceFile;
          const sl = selectedElement.dataset.sourceLine;
          if (!sf || !sl) return;
          try {
            await fetch('/api/source-edit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                file: sf,
                line: parseInt(sl, 10),
                isImageResize: true,
                newWidth,
                newHeight,
              }),
            });
          } catch (error) {
            console.error('Failed to save image resize:', error);
          }
        }, async (marginLeft, marginTop) => {
          if (!selectedElement) return;
          const sf = selectedElement.dataset.sourceFile;
          const sl = selectedElement.dataset.sourceLine;
          const sc = selectedElement.dataset.sourceColumn;
          if (!sf || !sl) return;
          await saveStyleEdit(sf, sl, 'marginLeft', marginLeft, sc);
          await saveStyleEdit(sf, sl, 'marginTop', marginTop, sc);
        });
      }

      const sourceCode = await fetchSourceLine(sourceFile, sourceLine);
      const elArrayContext = findArrayItemContext(element);

      window.parent.postMessage({
        type: MSG_ELEMENT_SELECTED,
        payload: {
          sourceFile,
          sourceLine: parseInt(sourceLine, 10),
          sourceColumn: sourceColumn ? parseInt(sourceColumn, 10) : 0,
          content,
          color: hexColor,
          fontSize: computedStyle.fontSize,
          lineHeight: computedStyle.lineHeight,
          textAlign: computedStyle.textAlign,
          tagName: element.tagName,
          isImage,
          imageSrc: imgElement?.src || null,
          isLink,
          href: isLink ? (element as HTMLAnchorElement).href : null,
          sourceCode,
          ...elArrayContext,
        }
      }, '*');

      if (debug_mode === 'true') {
        console.log('📤 Sent elementSelected to parent:', { sourceFile, sourceLine, content: content.substring(0, 50) });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Use elementsFromPoint-based selection
      const element = getElementAtPoint(event.clientX, event.clientY);

      // No selectable element at this point
      if (!element || !isElementEditable(element)) {
        if (currentHoverElement) {
          exitHoverMode();
        }
        return;
      }

      // Same element - no change needed
      if (element === currentHoverElement) {
        return;
      }

      // Exit previous hover
      exitHoverMode();

      // Enter new hover
      currentHoverElement = element;
      showOverlay(hoverOverlay, element, 'dashed');
      document.body.style.cursor = 'pointer';

      // Debug logging
      if (debug_mode === 'true') {
        console.log('🎯 Hovering over element:');
        console.log(`   Tag: <${element.tagName.toLowerCase()}>`);
        console.log(`   Text: "${element.textContent?.trim().substring(0, 50)}${element.textContent && element.textContent.length > 50 ? '...' : ''}"`);
        console.log(`   Source: ${element.dataset.sourceFile}:${element.dataset.sourceLine}`);
        console.log(`   Is Image: ${isImageElement(element)}`);
        console.log(`   Is Section: ${isSectionElement(element)}`);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Ignore clicks on resize handles and link tooltip
      if (isResizeHandle(target) || isLinkTooltip(target)) {
        return;
      }

      // Hide tooltip when clicking elsewhere
      hideLinkTooltip();

      // Ignore clicks on section buttons (check target and ancestors for the data attribute)
      if (target.closest('[data-section-button="true"]')) {
        return;
      }

      // Use elementsFromPoint-based selection
      const element = getElementAtPoint(event.clientX, event.clientY);

      if (!element || !isElementEditable(element)) {
        clearSelectedElementStyle();
        return;
      }

      // Prevent navigation for links and show tooltip
      const anchorElement = element.closest('a') as HTMLAnchorElement | null;
      if (anchorElement) {
        event.preventDefault();
        event.stopPropagation();
        
        // Show tooltip with option to navigate
        showLinkTooltip(anchorElement, event.clientX, event.clientY);
      }

      selectElement(element);
    };

    const handleScroll = () => {
      exitHoverMode();
      hideLinkTooltip();
      // Keep selection overlay and resize handles tracking the element
      if (selectedElement) {
        positionOverlay(selectionOverlay, selectedElement);
        updateResizeHandlePositions();
      }
    };

    const handleResize = () => {
      if (selectedElement) {
        positionOverlay(selectionOverlay, selectedElement);
        updateResizeHandlePositions();
      }
    };

    // Touch handling for mobile - tap to select (distinguishes from scroll)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchMoved = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchMoved) return; // Already determined it's a scroll

      const touch = event.touches[0];
      if (!touch) return;
      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);

      if (deltaX > TAP_MOVEMENT_THRESHOLD || deltaY > TAP_MOVEMENT_THRESHOLD) {
        touchMoved = true;
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchMoved) return; // Was a scroll, not a tap

      // Hide tooltip when tapping elsewhere
      hideLinkTooltip();

      // Get element at the touch point
      const element = getElementAtPoint(touchStartX, touchStartY);

      if (!element || !isElementEditable(element)) {
        clearSelectedElementStyle();
        return;
      }

      // Prevent default to avoid triggering click as well
      event.preventDefault();

      // Prevent navigation for links and show tooltip
      const anchorElement = element.closest('a') as HTMLAnchorElement | null;
      if (anchorElement) {
        event.stopPropagation();
        
        // Show tooltip with option to navigate
        showLinkTooltip(anchorElement, touchStartX, touchStartY);
      }

      selectElement(element);

      // Notify parent to open drawer on mobile
      window.parent.postMessage({ type: 'elementTapped' }, '*');
    };

    // Handle messages from parent (breezy-fe)
    const handleParentMessage = async (event: MessageEvent) => {
      const { type, payload } = event.data || {};

      // Re-select element (after iframe reload or from ContainerEditor)
      if (type === MSG_RESELECT_ELEMENT) {
        const { sourceFile, sourceLine, sourceColumn } = payload || {};
        if (!sourceFile || !sourceLine) return;

        const element = findElementBySource(sourceFile, sourceLine, sourceColumn);

        if (element && isElementEditable(element)) {
          // Use selectElement to apply styles AND send element data back to parent
          selectElement(element);

          if (debug_mode === 'true') {
            console.log('🔄 Re-selected element:', { sourceFile, sourceLine });
          }
        } else if (debug_mode === 'true') {
          console.log('⚠️ Could not re-select element:', { sourceFile, sourceLine, found: !!element });
        }
        return;
      }

      // Select parent element
      if (type === MSG_SELECT_PARENT) {
        const { sourceFile, sourceLine, sourceColumn } = payload || {};
        if (!sourceFile || !sourceLine) return;

        const currentElement = findElementBySource(sourceFile, sourceLine, sourceColumn);

        if (!currentElement) {
          if (debug_mode === 'true') {
            console.log('⚠️ Could not find element for selectParent:', { sourceFile, sourceLine });
          }
          return;
        }

        // Find parent element with source data
        let parent = currentElement.parentElement;
        while (parent && parent !== document.body) {
          const parentSourceFile = parent.dataset.sourceFile;
          const parentSourceLine = parent.dataset.sourceLine;

          if (parentSourceFile && parentSourceLine && isElementEditable(parent)) {
            // Found a valid parent - select it using the shared selectElement function
            selectElement(parent);

            if (debug_mode === 'true') {
              console.log('⬆️ Selected parent element:', { sourceFile: parentSourceFile, sourceLine: parentSourceLine, tagName: parent.tagName });
            }
            return;
          }

          parent = parent.parentElement;
        }

        if (debug_mode === 'true') {
          console.log('⚠️ No valid parent found for selectParent');
        }
        return;
      }

      // Preview only - update DOM without saving
      if (type === MSG_ELEMENT_PREVIEW) {
        const { content, color, fontSize, lineHeight, textAlign } = payload || {};
        const element = selectedElement;

        if (!element) return;

        if (content !== undefined) element.textContent = content;
        if (color !== undefined) element.style.color = color;
        if (fontSize !== undefined) element.style.fontSize = fontSize;
        if (lineHeight !== undefined) element.style.lineHeight = lineHeight;
        if (textAlign !== undefined) element.style.textAlign = textAlign;

        if (debug_mode === 'true') {
          console.log('👁️ Preview updated:', { content: content?.substring(0, 20), color, fontSize, lineHeight, textAlign });
        }
        return;
      }

      // Request sections data
      if (type === MSG_REQUEST_SECTIONS) {
        const currentPage = window.location.pathname;
        fetchAndPostMessage(`/api/sections?page=${encodeURIComponent(currentPage)}`, MSG_SECTIONS_DATA, 'sections', 'Failed to fetch sections:');
        return;
      }

      // Reorder sections via API
      if (type === MSG_REORDER_SECTIONS) {
        const { order } = payload || {};
        if (!order || !Array.isArray(order)) {
          console.error('Invalid order array for reorder');
          return;
        }

        const currentPage = window.location.pathname;
        try {
          await fetch('/api/sections', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order, page: currentPage }),
          });
        } catch (error) {
          console.error('Failed to reorder sections:', error);
        }
        return;
      }

      // Section library
      if (type === MSG_REQUEST_SECTION_LIBRARY) {
        fetchAndPostMessage('/api/sections?library=true', MSG_SECTION_LIBRARY_DATA, 'sections', 'Failed to fetch section library:');
        return;
      }

      // Add section
      if (type === MSG_ADD_SECTION) {
        const { sectionId } = payload || {};
        if (sectionId) {
          const page = window.location.pathname;
          performActionAndPostMessage('/api/sections', { action: 'add', sectionId, page }, MSG_SECTION_ADDED, 'Failed to add section:');
        }
        return;
      }

      // Remove section
      if (type === MSG_REMOVE_SECTION) {
        const { sectionId } = payload || {};
        if (sectionId) {
          const page = window.location.pathname;
          performActionAndPostMessage('/api/sections', { action: 'remove', sectionId, page }, MSG_SECTION_REMOVED, 'Failed to remove section:');
        }
        return;
      }

      // Pages data
      if (type === MSG_REQUEST_PAGES) {
        fetchAndPostMessage('/api/pages', MSG_PAGES_DATA, 'pages', 'Failed to fetch pages:');
        return;
      }

      // Page library
      if (type === MSG_REQUEST_PAGE_LIBRARY) {
        fetchAndPostMessage('/api/pages?library=true', MSG_PAGE_LIBRARY_DATA, 'pages', 'Failed to fetch page library:');
        return;
      }

      // Add page
      if (type === MSG_ADD_PAGE) {
        const { pageId } = payload || {};
        if (pageId) {
          performActionAndPostMessage('/api/pages', { action: 'add', pageId }, MSG_PAGE_ADDED, 'Failed to add page:');
        }
        return;
      }

      // Remove page
      if (type === MSG_REMOVE_PAGE) {
        const { pageId } = payload || {};
        if (pageId) {
          performActionAndPostMessage('/api/pages', { action: 'remove', pageId }, MSG_PAGE_REMOVED, 'Failed to remove page:');
        }
        return;
      }

      // Add array item (duplicate card)
      if (type === MSG_ADD_ARRAY_ITEM) {
        const { contentArray, contentFile, atIndex } = payload || {};
        if (contentArray && contentFile != null) {
          performActionAndPostMessage(
            '/api/source-edit',
            { action: 'addArrayItem', arrayPath: contentArray, contentFile, atIndex: atIndex ?? 0 },
            MSG_ARRAY_ITEM_ADDED,
            'Failed to add array item:'
          );
        }
        return;
      }

      // Remove array item (delete card)
      if (type === MSG_REMOVE_ARRAY_ITEM) {
        const { contentArray, contentFile, atIndex } = payload || {};
        if (contentArray && contentFile != null && atIndex != null) {
          performActionAndPostMessage(
            '/api/source-edit',
            { action: 'removeArrayItem', arrayPath: contentArray, contentFile, atIndex },
            MSG_ARRAY_ITEM_REMOVED,
            'Failed to remove array item:'
          );
        }
        return;
      }

      // Full update - update DOM and save to source
      if (type === MSG_ELEMENT_UPDATE) {
        const { sourceFile, sourceLine, content, color, fontSize, lineHeight, textAlign, imageSrc, imageIndex, imageWidth, imageHeight, imageDescription, contentPath } = payload || {};

        // If contentPath is provided, always find by content path (ignoring any selected element)
        const element: HTMLElement | null = contentPath
          ? document.querySelector(`[data-content-path="${contentPath}"]`)
          : selectedElement;

        if (!element) {
          console.warn('No selected element to update');
          return;
        }

        // Extract common values once
        const line = sourceLine?.toString() ?? '';
        const column = payload.sourceColumn?.toString();

        // Helper to log save results
        const logResult = (success: boolean, label: string) => {
          if (success) {
            if (debug_mode === 'true') console.log(`✅ ${label} updated and saved`);
          } else {
            console.error(`Failed to save ${label} update`);
          }
        };

        // Update and save content if provided
        if (content !== undefined && content !== element.textContent) {
          const originalContent = element.textContent || '';
          element.textContent = content;
          const result = await saveEdit(element, sourceFile, line, originalContent, column);
          logResult(result.success, 'Content');
          if (!result.success) element.textContent = originalContent; // Revert on failure
        }

        // Update and save color if provided
        if (color !== undefined) {
          element.style.color = color;
          const result = await saveColorEdit(sourceFile, line, color, column);
          logResult(result.success, 'Color');
        }

        // Update and save style properties
        const styleUpdates: Array<{ prop: 'fontSize' | 'lineHeight' | 'textAlign'; value: string | undefined }> = [
          { prop: 'fontSize', value: fontSize },
          { prop: 'lineHeight', value: lineHeight },
          { prop: 'textAlign', value: textAlign },
        ];

        for (const { prop, value } of styleUpdates) {
          if (value !== undefined) {
            element.style[prop] = value;
            const result = await saveStyleEdit(sourceFile, line, prop, value, column);
            logResult(result.success, prop);
          }
        }

        // Update and save image properties if provided
        const imgElement = (imageSrc !== undefined || imageWidth !== undefined) ? getImgElement(element) : null;

        if (imageSrc !== undefined && imgElement) {
          imgElement.src = imageSrc;
          // Get content path and file from the img element for content file editing
          const { path: imgContentPath, file: imgContentFile } = resolveContentInfo(imgElement);
          // If imageIndex is provided, send it as the newValue (for PROFESSIONAL_IMAGES[x] references)
          // Otherwise fall back to the URL
          const imageValue = imageIndex !== undefined ? String(imageIndex) : imageSrc;
          const result = await saveImageEdit(sourceFile, line, imageValue, column, imgContentPath, imgContentFile, imageSrc, imageHeight, imageDescription);
          logResult(result.success, 'Image src');
        }

        if (imageWidth !== undefined && imgElement) {
          imgElement.style.width = imageWidth;
          const result = await saveStyleEdit(sourceFile, line, 'width', imageWidth, column);
          logResult(result.success, 'Image width');
        }

        // Update and save href if provided (for link elements)
        if (payload.href !== undefined && element.tagName === 'A') {
          (element as HTMLAnchorElement).href = payload.href;
          const result = await saveHrefEdit(sourceFile, line, payload.href, column);
          logResult(result.success, 'Link href');
        }
      }
    };

    window.addEventListener('message', handleParentMessage);

    // Add listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    // Touch listeners for mobile (passive: false allows preventDefault)
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    console.log('✏️  Click-to-Edit enabled: Click to edit in sidebar');

    return () => {
      window.removeEventListener('message', handleParentMessage);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      exitHoverMode();
      clearSelectedElementStyle();
      hideLinkTooltip();
      hoverOverlay.remove();
      selectionOverlay.remove();
      document.body.style.cursor = '';
    };
  }, [debug_mode]);

  return null;
}
