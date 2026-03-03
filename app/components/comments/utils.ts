import { SourceMeta } from './types';

// Generate unique ID
export const generateId = () => Math.random().toString(36).substring(2, 15);

// Get a stable CSS selector for an element
export function getElementSelector(element: Element): string {
  if (element.id) {
    return `#${element.id}`;
  }

  const path: string[] = [];
  let current: Element | null = element;

  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();
    
    if (current.id) {
      path.unshift(`#${current.id}`);
      break;
    }
    
    const parent = current.parentElement;
    if (parent && current) {
      const currentTagName = current.tagName;
      const siblings = Array.from(parent.children).filter(
        (child) => child.tagName === currentTagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }
    
    path.unshift(selector);
    current = current.parentElement;
  }

  return path.join(' > ');
}

// Find the best element to anchor a comment to
export function findAnchorElement(target: Element): Element {
  const meaningfulTags = [
    'SECTION', 'ARTICLE', 'DIV', 'P', 
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 
    'BUTTON', 'A', 'IMG', 'FORM', 
    'NAV', 'HEADER', 'FOOTER', 'MAIN', 
    'LI', 'UL', 'OL', 'SPAN', 'LABEL'
  ];
  
  let current: Element | null = target;
  
  while (current && current !== document.body) {
    const rect = current.getBoundingClientRect();
    const isMeaningful = meaningfulTags.includes(current.tagName);
    const hasMinSize = rect.width >= 20 && rect.height >= 20;
    
    if (isMeaningful && hasMinSize) {
      return current;
    }
    current = current.parentElement;
  }
  
  return target;
}

// Extract source metadata from an element (walks up tree to find data-source-* attributes)
export function getSourceMeta(element: Element): SourceMeta | undefined {
  let current: Element | null = element;
  
  while (current && current !== document.body) {
    const file = current.getAttribute('data-source-file');
    const line = current.getAttribute('data-source-line');
    
    if (file) {
      // Extract component name from file path
      // e.g. "app/components/Hero.tsx" -> "Hero"
      const match = file.match(/\/([^/]+)\.(tsx?|jsx?)$/);
      const component = match ? match[1] : undefined;
      
      return {
        file,
        line: line ? parseInt(line, 10) : undefined,
        component,
      };
    }
    
    current = current.parentElement;
  }
  
  return undefined;
}
