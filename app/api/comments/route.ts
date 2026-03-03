import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

const COMMENTS_FILE = path.join(process.cwd(), 'app/components/comments/data/comments.json');

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ comments: [] });
  }

  try {
    const content = await fs.readFile(COMMENTS_FILE, 'utf-8');
    const comments = JSON.parse(content);
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Comments editing is only allowed in development mode' },
      { status: 403 }
    );
  }

  try {
    const { comments } = await request.json();
    
    await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Comments save error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save comments' },
      { status: 500 }
    );
  }
}

