/**
 * Image Resize Handles - Dev mode only drag-to-resize and drag-to-offset for images
 * Shows resize handles when an image with explicit width/height is selected
 * Also provides a move handle to adjust margin offset
 */

type HandlePosition = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

const HANDLE_SIZE = 10;
const MIN_WIDTH = 50;
const MIN_HEIGHT = 50;
const HANDLE_COLOR = '#3b82f6';

const CURSOR_MAP: Record<HandlePosition, string> = {
  nw: 'nwse-resize',
  n: 'ns-resize',
  ne: 'nesw-resize',
  e: 'ew-resize',
  se: 'nwse-resize',
  s: 'ns-resize',
  sw: 'nesw-resize',
  w: 'ew-resize',
};

// Module-scoped state
let handles: HTMLDivElement[] = [];
let activeHandle: HandlePosition | null = null;
let startX = 0;
let startY = 0;
let startWidth = 0;
let startHeight = 0;
let aspectRatio = 1;
let targetImg: HTMLImageElement | null = null;
let onResizeEndCallback: ((w: number, h: number) => void) | null = null;
let onOffsetEndCallback: ((marginLeft: string, marginTop: string) => void) | null = null;
let selectionOverlayRef: HTMLDivElement | null = null;

// Drag-to-offset state
let moveHandle: HTMLDivElement | null = null;
let originalMarginLeft = 0;
let originalMarginTop = 0;

function createHandle(position: HandlePosition): HTMLDivElement {
  const el = document.createElement('div');
  el.dataset.resizeHandle = position;
  const isCorner = position.length === 2;
  el.style.cssText = `
    position: fixed;
    width: ${isCorner ? HANDLE_SIZE : HANDLE_SIZE - 2}px;
    height: ${isCorner ? HANDLE_SIZE : HANDLE_SIZE - 2}px;
    background: white;
    border: 2px solid ${HANDLE_COLOR};
    border-radius: ${isCorner ? '2px' : '50%'};
    z-index: 1000000;
    cursor: ${CURSOR_MAP[position]};
    pointer-events: auto;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: transform 0.1s ease;
    touch-action: none;
  `;
  el.addEventListener('pointerenter', () => { el.style.transform = 'scale(1.3)'; });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  document.body.appendChild(el);
  el.addEventListener('pointerdown', (e) => onPointerDown(e, position));
  return el;
}

function positionHandles(rect: DOMRect) {
  handles.forEach(handle => {
    const pos = handle.dataset.resizeHandle ?? '';
    const x = pos.includes('e') ? rect.right : pos.includes('w') ? rect.left : rect.left + rect.width / 2;
    const y = pos.includes('s') ? rect.bottom : pos.includes('n') ? rect.top : rect.top + rect.height / 2;
    handle.style.top = `${y - HANDLE_SIZE / 2}px`;
    handle.style.left = `${x - HANDLE_SIZE / 2}px`;
  });
}

function syncOverlayAndHandles() {
  if (!targetImg) return;
  const rect = targetImg.getBoundingClientRect();
  if (selectionOverlayRef) {
    selectionOverlayRef.style.top = `${rect.top}px`;
    selectionOverlayRef.style.left = `${rect.left}px`;
    selectionOverlayRef.style.width = `${rect.width}px`;
    selectionOverlayRef.style.height = `${rect.height}px`;
  }
  positionHandles(rect);
  positionMoveHandle(rect);
}

function onPointerDown(e: PointerEvent, position: HandlePosition) {
  e.preventDefault();
  e.stopPropagation();
  if (!targetImg) return;

  (e.currentTarget as Element).setPointerCapture(e.pointerId);
  activeHandle = position;
  startX = e.clientX;
  startY = e.clientY;
  const rect = targetImg.getBoundingClientRect();
  startWidth = rect.width;
  startHeight = rect.height;
  aspectRatio = startWidth / startHeight;

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(e: PointerEvent) {
  if (!activeHandle || !targetImg) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const xSign = activeHandle.includes('e') ? 1 : activeHandle.includes('w') ? -1 : 0;
  const ySign = activeHandle.includes('s') ? 1 : activeHandle.includes('n') ? -1 : 0;
  let newWidth = startWidth;
  let newHeight = startHeight;

  if (xSign && ySign) {
    // Corner — proportional resize
    newWidth = Math.max(MIN_WIDTH, startWidth + dx * xSign);
    newHeight = newWidth / aspectRatio;
    if (newHeight < MIN_HEIGHT) {
      newHeight = MIN_HEIGHT;
      newWidth = newHeight * aspectRatio;
    }
  } else if (xSign) {
    newWidth = Math.max(MIN_WIDTH, startWidth + dx * xSign);
  } else {
    newHeight = Math.max(MIN_HEIGHT, startHeight + dy * ySign);
  }

  targetImg.style.width = `${newWidth}px`;
  targetImg.style.height = `${newHeight}px`;
  syncOverlayAndHandles();
}

function onPointerUp() {
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);

  if (!targetImg || !activeHandle) {
    activeHandle = null;
    return;
  }

  const rect = targetImg.getBoundingClientRect();
  targetImg.style.width = '';
  targetImg.style.height = '';
  activeHandle = null;
  onResizeEndCallback?.(Math.round(rect.width), Math.round(rect.height));
}

// --- Move handle + drag-to-offset ---

const MOVE_HANDLE_SIZE = 28;

function createMoveHandle(): HTMLDivElement {
  const el = document.createElement('div');
  el.dataset.resizeHandle = 'move';
  el.style.cssText = `
    position: fixed;
    width: ${MOVE_HANDLE_SIZE}px;
    height: ${MOVE_HANDLE_SIZE}px;
    background: white;
    border: 2px solid ${HANDLE_COLOR};
    border-radius: 50%;
    z-index: 1000000;
    cursor: move;
    pointer-events: auto;
    box-sizing: border-box;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
  `;
  // 4-arrow move icon via SVG
  el.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${HANDLE_COLOR}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l-3 3 3 3"/><path d="M9 5l3-3 3 3"/><path d="M15 19l-3 3-3-3"/><path d="M19 9l3 3-3 3"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`;
  el.addEventListener('pointerdown', onMovePointerDown);
  document.body.appendChild(el);
  return el;
}

function positionMoveHandle(rect: DOMRect) {
  if (!moveHandle) return;
  moveHandle.style.top = `${rect.top + rect.height / 2 - MOVE_HANDLE_SIZE / 2}px`;
  moveHandle.style.left = `${rect.left + rect.width / 2 - MOVE_HANDLE_SIZE / 2}px`;
}

function onMovePointerDown(e: PointerEvent) {
  e.preventDefault();
  e.stopPropagation();
  if (!targetImg) return;

  (e.currentTarget as Element).setPointerCapture(e.pointerId);
  startX = e.clientX;
  startY = e.clientY;
  const computed = window.getComputedStyle(targetImg);
  originalMarginLeft = parseFloat(computed.marginLeft) || 0;
  originalMarginTop = parseFloat(computed.marginTop) || 0;

  document.addEventListener('pointermove', onDragMove);
  document.addEventListener('pointerup', onDragEnd);
}

function onDragMove(e: PointerEvent) {
  if (!targetImg) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  targetImg.style.marginLeft = `${originalMarginLeft + dx}px`;
  targetImg.style.marginTop = `${originalMarginTop + dy}px`;

  syncOverlayAndHandles();
}

function onDragEnd() {
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup', onDragEnd);
  if (!targetImg) return;
  onOffsetEndCallback?.(targetImg.style.marginLeft, targetImg.style.marginTop);
}

/** Show resize handles around an image element */
export const showResizeHandles = (
  imgElement: HTMLImageElement,
  selectionOverlay: HTMLDivElement,
  onResizeEnd: (newWidth: number, newHeight: number) => void,
  onOffsetEnd?: (marginLeft: string, marginTop: string) => void,
) => {
  hideResizeHandles();

  targetImg = imgElement;
  selectionOverlayRef = selectionOverlay;
  onResizeEndCallback = onResizeEnd;
  onOffsetEndCallback = onOffsetEnd || null;

  handles = (Object.keys(CURSOR_MAP) as HandlePosition[]).map(pos => createHandle(pos));
  if (onOffsetEnd) {
    moveHandle = createMoveHandle();
  }
  syncOverlayAndHandles();
};

/** Hide and remove all resize handles */
export const hideResizeHandles = () => {
  handles.forEach(h => h.remove());
  handles = [];
  if (moveHandle) {
    moveHandle.remove();
    moveHandle = null;
  }
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup', onDragEnd);
  targetImg = null;
  selectionOverlayRef = null;
  onResizeEndCallback = null;
  onOffsetEndCallback = null;
  activeHandle = null;
};

/** Reposition handles to track the image (on scroll/resize) */
export const updateResizeHandlePositions = () => {
  if (handles.length === 0) return;
  syncOverlayAndHandles();
};

/** Check if an element is a resize handle */
export const isResizeHandle = (element: HTMLElement): boolean => {
  return !!element.dataset.resizeHandle;
};

