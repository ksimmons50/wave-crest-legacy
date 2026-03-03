import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import { validateFilePath } from '../utils/validateFilePath';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Only allowed in development mode' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { file, imageIndex = 0 } = body;

    if (!file) {
      return NextResponse.json(
        { error: 'Missing required parameter: file' },
        { status: 400 }
      );
    }

    const validation = await validateFilePath(file);
    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    const content = await fs.readFile(validation.absolutePath, 'utf-8');

    const endMarker = '{/* GALLERY_IMAGES_END */}';
    const endIndex = content.indexOf(endMarker);

    if (endIndex === -1) {
      return NextResponse.json(
        { error: 'Could not find GALLERY_IMAGES_END marker in file' },
        { status: 400 }
      );
    }

    const newImageBlock = `
      <div className="group relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={PROFESSIONAL_IMAGES[${imageIndex}].url}
          alt={PROFESSIONAL_IMAGES[${imageIndex}].description}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      `;

    // Insert the new block before the end marker
    const newContent =
      content.substring(0, endIndex) +
      newImageBlock +
      content.substring(endIndex);

    await fs.writeFile(validation.absolutePath, newContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: `Added image at index ${imageIndex}`,
    });

  } catch (error) {
    console.error('Gallery add image error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add image' },
      { status: 500 }
    );
  }
}
