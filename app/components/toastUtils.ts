// Toast and overlay utilities for click-to-source editing feedback

/**
 * Ensures animation keyframes are injected into the document
 */
const ensureAnimations = () => {
  if (document.getElementById('click-to-source-animations')) return;

  const style = document.createElement('style');
  style.id = 'click-to-source-animations';
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
};

/**
 * Creates a spinner element
 */
const createSpinner = (size: number, borderWidth: number, color: string, durationSec = 0.8): HTMLDivElement => {
  const spinner = document.createElement('div');
  spinner.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border: ${borderWidth}px solid rgba(${color}, 0.2);
    border-top-color: rgb(${color});
    border-radius: 50%;
    animation: spin ${durationSec}s linear infinite;
  `;
  return spinner;
};

/**
 * Creates a toast notification element
 */
export const createToastNotification = (message: string): HTMLDivElement => {
  ensureAnimations();

  const toast = document.createElement('div');
  toast.dataset.toastNotification = 'true';

  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: rgba(59, 130, 246, 0.95);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
    z-index: 999999;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
  `;

  const spinner = createSpinner(16, 2, '255, 255, 255', 0.6);
  spinner.style.borderColor = 'rgba(255, 255, 255, 0.3)';
  spinner.style.borderTopColor = 'white';

  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(spinner);
  toast.appendChild(text);
  return toast;
};

/**
 * Updates toast to show success/failure and auto-removes
 */
export const updateToastResult = (toast: HTMLDivElement, success: boolean, message: string) => {
  const textEl = toast.querySelector('span');
  const spinnerEl = toast.querySelector('div');

  if (textEl) textEl.textContent = message;
  if (spinnerEl) spinnerEl.remove();

  toast.style.background = success
    ? 'rgba(16, 185, 129, 0.95)'  // Green
    : 'rgba(239, 68, 68, 0.95)';  // Red

  // Auto-remove after 2 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
};

/**
 * Creates an image saving overlay element
 */
export const createImageOverlay = (): HTMLDivElement => {
  ensureAnimations();

  const overlay = document.createElement('div');
  overlay.dataset.imageEditOverlay = 'true';
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    z-index: 999999;
    pointer-events: none;
  `;

  const spinner = createSpinner(48, 4, '59, 130, 246');

  const text = document.createElement('div');
  text.textContent = 'Saving...';
  text.style.cssText = `
    color: rgb(59, 130, 246);
    font-size: 16px;
    font-weight: 600;
  `;

  overlay.appendChild(spinner);
  overlay.appendChild(text);
  return overlay;
};

/**
 * Updates overlay to show success/failure result and auto-removes
 */
export const updateOverlayResult = (overlay: HTMLDivElement, success: boolean, message: string) => {
  const spinner = overlay.querySelector('div:first-child');
  const text = overlay.querySelector('div:last-child') as HTMLDivElement;

  if (spinner) spinner.remove();
  if (text) text.textContent = message;

  const icon = document.createElement('div');
  icon.style.cssText = `
    width: 64px;
    height: 64px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
  `;

  if (success) {
    if (text) text.style.color = 'rgb(16, 185, 129)';
    overlay.style.background = 'rgba(16, 185, 129, 0.15)';
    icon.textContent = '✓';
    icon.style.background = 'rgb(16, 185, 129)';
  } else {
    if (text) text.style.color = 'rgb(239, 68, 68)';
    overlay.style.background = 'rgba(239, 68, 68, 0.15)';
    icon.textContent = '✕';
    icon.style.background = 'rgb(239, 68, 68)';
  }

  if (text) overlay.insertBefore(icon, text);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => overlay.remove(), 300);
  }, 3000);
};
