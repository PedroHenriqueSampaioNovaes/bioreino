import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { getDirnamePath } from '../utils/getDirnamePath.js';

const __dirname = getDirnamePath(import.meta.url);

type Route = {
  router: Router;
  baseRoute: string;
};

// Automates route export
export async function loadRoutes(): Promise<Route[]> {
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && !/index\.[tj]s/.test(file));

  return Promise.all(
    files.map((file) => {
      const filePath = path.resolve(__dirname, file);
      return import(pathToFileURL(filePath).href).then(
        (module) => module.default,
      );
    }),
  );
}
