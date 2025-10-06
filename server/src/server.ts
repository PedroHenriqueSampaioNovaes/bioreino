import './config/preload-env';
import './db/connection';

import express from 'express';
import 'express-async-errors';

import path from 'node:path';

import routes from './routes';

import { errorHandling } from './middlewares/errorHandling';

const app = express();
const PORT = 3333;

app.get('/ping', (req, res) => {
  res.send(path.resolve());
});

app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Creates a base API route for other routes
routes.forEach((route) => {
  app.use(`/api${route.baseRoute}`, route.router);
});

// Handle error api
app.use(errorHandling);

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
);
