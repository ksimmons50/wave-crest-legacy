import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

const APP_DIR = path.join(process.cwd(), 'app');

function getPagePath(route: string = '/'): string {
  if (route === '/' || route === '') {
    return path.join(APP_DIR, 'page.tsx');
  }
  const pageName = route.replace(/^\//, '').split('/')[0] ?? '';
  return path.join(APP_DIR, pageName, 'page.tsx');
}

const SECTIONS_REGEX = /const sections = \[\s*([\s\S]*?)\];/;
const SECTION_ITEM_REGEX = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]\s*,\s*Component:\s*(\w+)\s*\}/g;

interface SectionInfo {
  id: string;
  name: string;
  componentName: string;
}

function formatSectionsArray(sections: SectionInfo[]): string {
  const items = sections
    .map(s => `  { id: '${s.id}', name: '${s.name}', Component: ${s.componentName} },`)
    .join('\n');
  return `const sections = [\n${items}\n];`;
}

function parseSectionsFromContent(content: string): SectionInfo[] {
  const match = content.match(SECTIONS_REGEX);
  if (!match || !match[1]) return [];

  const arrayContent = match[1];
  const sections: SectionInfo[] = [];
  SECTION_ITEM_REGEX.lastIndex = 0;

  let itemMatch;
  while ((itemMatch = SECTION_ITEM_REGEX.exec(arrayContent)) !== null) {
    const id = itemMatch[1];
    const name = itemMatch[2];
    const componentName = itemMatch[3];
    if (id && name && componentName) {
      sections.push({ id, name, componentName });
    }
  }

  return sections;
}

async function readAndParseSections(route: string = '/'): Promise<{ content: string; sections: SectionInfo[]; pagePath: string }> {
  const pagePath = getPagePath(route);
  const content = await fs.readFile(pagePath, 'utf-8');
  return { content, sections: parseSectionsFromContent(content), pagePath };
}

// Match any component import line: static imports and dynamic() calls
const COMPONENT_IMPORT_LINE = /^(?:import \w+ from ['"][@./][^'"]+['"];?|const \w+ = dynamic\(\(\) => import\(['"][@./][^'"]+['"]\)\);?)$/gm;

function findLastComponentImportEnd(content: string, sectionComponentNames: Set<string>): number {
  let lastEnd = -1;
  COMPONENT_IMPORT_LINE.lastIndex = 0;
  let match;
  while ((match = COMPONENT_IMPORT_LINE.exec(content)) !== null) {
    const line = match[0];
    for (const name of sectionComponentNames) {
      if (line.includes(name)) {
        lastEnd = match.index + match[0].length;
        break;
      }
    }
  }
  return lastEnd;
}

function addSectionImport(content: string, importLine: string, sectionComponentNames: Set<string>): string {
  const lastEnd = findLastComponentImportEnd(content, sectionComponentNames);
  if (lastEnd !== -1) {
    return content.slice(0, lastEnd) + '\n' + importLine + content.slice(lastEnd);
  }
  // No existing section imports — insert before the sections array
  return content.replace(SECTIONS_REGEX, importLine + '\n\n$&');
}

function buildRemoveImportRegex(componentName: string): RegExp {
  return new RegExp(
    `(?:import ${componentName} from ['"][^'"]+['"];?|const ${componentName} = dynamic\\(\\(\\) => import\\(['"][^'"]+['"]\\)\\);?)\\n?`
  );
}

// Detect template ID from page.tsx import paths (e.g. @/app/components/templates/trades/Hero)
function detectTemplateDir(pageContent: string): string | null {
  const match = pageContent.match(/['"](?:@\/app\/components|\.\.?\/components)\/templates\/(\w+)\//);
  return match?.[1] ?? null;
}

// Read sections manifest written by template-apply
async function readSectionsManifest(templateId: string): Promise<SectionInfo[]> {
  try {
    const manifestPath = path.join(APP_DIR, 'components', 'templates', templateId, 'sections.json');
    const data = await fs.readFile(manifestPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function buildImportLine(componentName: string, templateId: string): string {
  return `import ${componentName} from '@/app/components/templates/${templateId}/${componentName}';`;
}

// Insert import + append to sections array
function finalizeAdd(
  content: string,
  importLine: string,
  componentName: string,
  currentSections: SectionInfo[],
  newSection: SectionInfo,
): string {
  let updated = content;
  if (!updated.includes(componentName)) {
    const componentNames = new Set(currentSections.map(s => s.componentName));
    updated = addSectionImport(updated, importLine, componentNames);
  }
  const allSections = [...currentSections, newSection];
  return updated.replace(SECTIONS_REGEX, formatSectionsArray(allSections));
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);

  if (searchParams.get('library') === 'true') {
    let templateId: string | null = null;
    try {
      const { content } = await readAndParseSections('/');
      templateId = detectTemplateDir(content);
    } catch {
      // Page doesn't exist yet
    }
    const sections = templateId ? await readSectionsManifest(templateId) : [];
    return NextResponse.json({ sections });
  }

  const page = searchParams.get('page') || '/';
  try {
    const { sections } = await readAndParseSections(page);
    return NextResponse.json({ sections });
  } catch (error) {
    const isNotFound = error instanceof Error && 'code' in error && (error as NodeJS.ErrnoException).code === 'ENOENT';
    if (isNotFound) {
      return NextResponse.json({ error: `Page not found: ${page}` }, { status: 404 });
    }
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const page = body.page || '/';
    const action = body.action || 'reorder';

    if (action === 'remove') return handleRemove(body.sectionId, page);
    if (action === 'add') return handleAdd(body.sectionId, page);
    if (action === 'reorder') return handleReorder(body.order, page);

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

async function handleRemove(sectionId: unknown, page: string) {
  if (!sectionId || typeof sectionId !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid sectionId' }, { status: 400 });
  }

  const { content: initialContent, sections: currentSections, pagePath } = await readAndParseSections(page);
  let content = initialContent;

  const sectionToRemove = currentSections.find(s => s.id === sectionId);
  if (!sectionToRemove) {
    return NextResponse.json({ error: `Section not found: ${sectionId}` }, { status: 400 });
  }

  const remainingSections = currentSections.filter(s => s.id !== sectionId);
  content = content.replace(SECTIONS_REGEX, formatSectionsArray(remainingSections));

  const componentStillUsed = remainingSections.some(s => s.componentName === sectionToRemove.componentName);
  if (!componentStillUsed) {
    content = content.replace(buildRemoveImportRegex(sectionToRemove.componentName), '');
  }

  await fs.writeFile(pagePath, content, 'utf-8');
  return NextResponse.json({ success: true });
}

async function handleAdd(sectionId: unknown, page: string) {
  if (!sectionId || typeof sectionId !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid sectionId' }, { status: 400 });
  }

  const { content: initialContent, sections: currentSections, pagePath } = await readAndParseSections(page);

  if (currentSections.some(s => s.id === sectionId)) {
    return NextResponse.json({ error: 'Section already exists' }, { status: 400 });
  }

  const templateId = detectTemplateDir(initialContent);
  if (!templateId) {
    return NextResponse.json({ error: 'No template detected' }, { status: 400 });
  }

  const manifest = await readSectionsManifest(templateId);
  const match = manifest.find(s => s.id === sectionId);
  if (!match) {
    return NextResponse.json({ error: `Unknown section: ${sectionId}` }, { status: 400 });
  }

  const importLine = buildImportLine(match.componentName, templateId);
  const content = finalizeAdd(initialContent, importLine, match.componentName, currentSections, {
    id: sectionId, name: match.name, componentName: match.componentName,
  });

  await fs.writeFile(pagePath, content, 'utf-8');
  return NextResponse.json({ success: true });
}

async function handleReorder(order: unknown, page: string) {
  if (!order || !Array.isArray(order)) {
    return NextResponse.json({ error: 'Missing order array' }, { status: 400 });
  }

  const { content, sections, pagePath } = await readAndParseSections(page);

  for (const id of order) {
    if (!sections.find(s => s.id === id)) {
      return NextResponse.json({ error: `Unknown section id: ${id}` }, { status: 400 });
    }
  }

  const reordered = order.map(id => {
    const section = sections.find(s => s.id === id);
    if (!section) throw new Error(`Section not found: ${id}`);
    return section;
  });
  const newContent = content.replace(SECTIONS_REGEX, formatSectionsArray(reordered));
  await fs.writeFile(pagePath, newContent, 'utf-8');

  return NextResponse.json({ success: true });
}
