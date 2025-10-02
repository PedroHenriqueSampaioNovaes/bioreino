import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import courseRoutes from './courseRoutes';
import categoryRoutes from './categoryRoutes';
import coursesProgressRoutes from './coursesProgressRoutes';
import planRoutes from './planRoutes';
import userRoutes from './userRoutes';
import stripeRoutes from './stripeRoutes';

type Route = {
  router: Router;
  baseRoute: string;
};

export default [courseRoutes, coursesProgressRoutes, categoryRoutes, planRoutes, userRoutes, stripeRoutes];

// Automates route export
// export default fs
//   .readdirSync(__dirname)
//   .filter((file) => file.indexOf('.') !== 0 && file !== 'index.ts')
//   .map((file) => require(path.resolve(__dirname, file)).default) as Route[];
