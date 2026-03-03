/**
 * Link Tooltip - Dev mode only tooltip for navigating links
 * Shows a tooltip when clicking on links in development mode with an option to navigate
 */

// Link tooltip element reference
let linkTooltip: HTMLDivElement | null = null;

/** Create and show tooltip for link navigation */
export const showLinkTooltip = (anchorElement: HTMLAnchorElement, x: number, y: number) => {
  // Remove existing tooltip if any
  hideLinkTooltip();

  const href = anchorElement.href;
  const rawHref = anchorElement.getAttribute('href') || '';
  
  // Check if external using the raw href attribute (not the resolved URL)
  // Internal links start with / or # or are relative paths
  const isExternal = rawHref.startsWith('http') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:');
  const displayUrl = isExternal ? href : rawHref;

  // Create tooltip container
  linkTooltip = document.createElement('div');
  linkTooltip.id = 'breezy-link-tooltip';
  linkTooltip.style.cssText = `
    position: fixed;
    z-index: 99999;
    background: #1a1a2e;
    border: 1px solid #3a3a5e;
    border-radius: 8px;
    padding: 8px 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    max-width: 320px;
    animation: breezyTooltipFadeIn 0.15s ease-out;
  `;

  // Add animation keyframes if not already added
  if (!document.getElementById('breezy-tooltip-styles')) {
    const style = document.createElement('style');
    style.id = 'breezy-tooltip-styles';
    style.textContent = `
      @keyframes breezyTooltipFadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      #breezy-link-tooltip button:hover {
        background: #4a4a7e !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Create URL display
  const urlDisplay = document.createElement('div');
  urlDisplay.style.cssText = `
    color: #a0a0c0;
    font-size: 11px;
    margin-bottom: 8px;
    word-break: break-all;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
  urlDisplay.textContent = displayUrl.length > 60 ? displayUrl.substring(0, 60) + '...' : displayUrl;

  // Create navigate button
  const navigateBtn = document.createElement('button');
  navigateBtn.style.cssText = `
    display: flex;
    align-items: center;
    gap: 6px;
    background: #3a3a5e;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    width: 100%;
    justify-content: center;
    transition: background 0.15s ease;
  `;
  
  const icon = isExternal ? '↗' : '→';
  const label = isExternal ? 'Open in new tab' : 'Go to page';
  navigateBtn.innerHTML = `<span>${icon}</span><span>${label}</span>`;

  navigateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideLinkTooltip();
    
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  });

  linkTooltip.appendChild(urlDisplay);
  linkTooltip.appendChild(navigateBtn);
  document.body.appendChild(linkTooltip);

  // Position tooltip near click point, but keep within viewport
  const tooltipRect = linkTooltip.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = x + 10;
  let top = y + 10;

  // Adjust if tooltip would go off-screen
  if (left + tooltipRect.width > viewportWidth - 10) {
    left = x - tooltipRect.width - 10;
  }
  if (top + tooltipRect.height > viewportHeight - 10) {
    top = y - tooltipRect.height - 10;
  }

  // Ensure minimum bounds
  left = Math.max(10, left);
  top = Math.max(10, top);

  linkTooltip.style.left = `${left}px`;
  linkTooltip.style.top = `${top}px`;
};

/** Hide and remove link tooltip */
export const hideLinkTooltip = () => {
  if (linkTooltip) {
    linkTooltip.remove();
    linkTooltip = null;
  }
};

/** Check if an element is the link tooltip */
export const isLinkTooltip = (element: HTMLElement): boolean => {
  return !!element.closest('#breezy-link-tooltip');
};
