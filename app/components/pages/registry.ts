/**
 * Page registry - defines all available page templates
 */

export interface PageDefinition {
  id: string;
  name: string;
  description: string;
  route: string;
}

export const pageRegistry: PageDefinition[] = [
  {
    id: 'about',
    name: 'About',
    description: 'Share your story and background',
    route: '/about',
  },
  {
    id: 'services',
    name: 'Services',
    description: 'List your services and offerings',
    route: '/services',
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Contact form and information',
    route: '/contact',
  },
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Showcase your work with photos',
    route: '/gallery',
  },
  {
    id: 'faq',
    name: 'FAQ',
    description: 'Frequently asked questions',
    route: '/faq',
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Customer reviews and testimonials',
    route: '/testimonials',
  },
];
