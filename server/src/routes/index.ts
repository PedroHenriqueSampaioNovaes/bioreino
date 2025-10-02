import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';

type Route = {
  router: Router;
  baseRoute: string;
};

// Automates route export
export default fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.ts')
  .map((file) => require(path.resolve(__dirname, file)).default) as Route[];
