import path from 'path';
import { fileURLToPath } from 'url';

export function getDirnamePath(url: string) {
  const __filename = fileURLToPath(url);
  const __dirname = path.dirname(__filename);

  return __dirname;
}
