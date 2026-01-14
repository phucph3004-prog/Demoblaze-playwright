import fs from 'node:fs';
import path from 'node:path';

export async function ensureDir(dir: string) {
  const full = path.resolve(dir);
  await fs.promises.mkdir(full, { recursive: true });
}
