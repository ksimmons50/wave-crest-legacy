import * as fs from 'fs/promises';
import * as path from 'path';

/** Validates file path is within project and exists */
export async function validateFilePath(file: string): Promise<{ absolutePath: string } | { error: string; status: number }> {
  const projectRoot = process.cwd();
  const absolutePath = path.resolve(projectRoot, file);

  if (!absolutePath.startsWith(projectRoot)) {
    return { error: 'Invalid file path - must be within project directory', status: 403 };
  }

  try {
    await fs.access(absolutePath);
  } catch {
    return { error: 'File not found', status: 404 };
  }

  return { absolutePath };
}
