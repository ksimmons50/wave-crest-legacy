import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';
import { pageRegistry } from '../../components/pages/registry';

const APP_DIR = path.join(process.cwd(), 'app');
const TEMPLATES_DIR = path.join(process.cwd(), 'app/components/pages/templates');

// Pages that should not be managed (system pages)
const SYSTEM_PAGES = ['api', 'components', 'terms-of-service', 'privacy-policy', 'home'];

interface PageInfo {
  id: string;
  name: string;
  route: string;
}

// Scan app directory for existing pages
async function getCurrentPages(): Promise<PageInfo[]> {
  const pages: PageInfo[] = [];

  // Always include home page first
  try {
    const homePagePath = path.join(APP_DIR, 'page.tsx');
    await fs.access(homePagePath);
    pages.push({
      id: 'home',
      name: 'Home',
      route: '/',
    });
  } catch {
    // No home page
  }

  try {
    const entries = await fs.readdir(APP_DIR, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (SYSTEM_PAGES.includes(entry.name)) continue;

      // Check if it has a page.tsx file
      const pagePath = path.join(APP_DIR, entry.name, 'page.tsx');
      try {
        await fs.access(pagePath);

        // Find matching registry entry for name, or use directory name
        const registryEntry = pageRegistry.find(p => p.id === entry.name);
        pages.push({
          id: entry.name,
          name: registryEntry?.name || entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
          route: `/${entry.name}`,
        });
      } catch {
        // No page.tsx, skip
      }
    }
  } catch (error) {
    console.error('Error scanning pages:', error);
  }

  return pages;
}

// GET: Return current pages or library
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);

  // Return available pages from library
  if (searchParams.get('library') === 'true') {
    return NextResponse.json({ pages: pageRegistry });
  }

  // Return current pages
  try {
    const pages = await getCurrentPages();
    return NextResponse.json({ pages });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST: Add or remove pages
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  try {
    const body = await request.json();

    // Remove page
    if (body.action === 'remove') {
      const { pageId } = body;

      if (SYSTEM_PAGES.includes(pageId)) {
        return NextResponse.json({ error: 'Cannot remove system page' }, { status: 400 });
      }

      const pageDir = path.join(APP_DIR, pageId);

      try {
        await fs.access(pageDir);
      } catch {
        return NextResponse.json({ error: `Page not found: ${pageId}` }, { status: 400 });
      }

      // Remove the directory recursively
      await fs.rm(pageDir, { recursive: true, force: true });

      return NextResponse.json({ success: true });
    }

    // Add new page
    if (body.action === 'add') {
      const { pageId } = body;
      const pageDef = pageRegistry.find(p => p.id === pageId);

      if (!pageDef) {
        return NextResponse.json({ error: `Unknown page: ${pageId}` }, { status: 400 });
      }

      const pageDir = path.join(APP_DIR, pageId);

      // Check if already exists
      try {
        await fs.access(pageDir);
        return NextResponse.json({ error: 'Page already exists' }, { status: 400 });
      } catch {
        // Good, doesn't exist
      }

      // Create directory
      await fs.mkdir(pageDir, { recursive: true });

      // Read template
      const templatePath = path.join(TEMPLATES_DIR, `${pageId}.tsx`);
      let templateContent: string;

      try {
        templateContent = await fs.readFile(templatePath, 'utf-8');
      } catch {
        // No template, create a basic page
        templateContent = `export default function ${pageDef.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">${pageDef.name}</h1>
          <p className="text-muted-foreground">Add your content here.</p>
        </div>
      </section>
    </div>
  );
}
`;
      }

      // Write page.tsx
      const pagePath = path.join(pageDir, 'page.tsx');
      await fs.writeFile(pagePath, templateContent, 'utf-8');

      return NextResponse.json({ success: true });
    }

    // Reorder pages (for navigation order)
    if (body.action === 'reorder') {
      const { order } = body as { order: string[] };

      if (!order || !Array.isArray(order)) {
        return NextResponse.json({ error: 'Missing order array' }, { status: 400 });
      }

      // For now, just validate the pages exist
      // Navigation order could be stored in a config file if needed
      const currentPages = await getCurrentPages();
      const currentIds = currentPages.map(p => p.id);

      for (const id of order) {
        if (!currentIds.includes(id)) {
          return NextResponse.json({ error: `Unknown page: ${id}` }, { status: 400 });
        }
      }

      // TODO: Store order in a config file if navigation ordering is needed
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
