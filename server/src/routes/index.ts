import fs from 'node:fs';
import path from 'node:path';

export default fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.ts')
  .map((file) => require(path.resolve(__dirname, file)).default);
