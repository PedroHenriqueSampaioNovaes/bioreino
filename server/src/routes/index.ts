import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import courseRoutes from './courseRoutes';

type Route = {
  router: Router;
  baseRoute: string;
};

export default [courseRoutes];

// Automates route export
// export default fs
//   .readdirSync(__dirname)
//   .filter((file) => file.indexOf('.') !== 0 && file !== 'index.ts')
//   .map((file) => require(path.resolve(__dirname, file)).default) as Route[];
