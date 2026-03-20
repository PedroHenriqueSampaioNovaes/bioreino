import './config/preload-env.js';
import './db/connection.js';

import express from 'express';
import 'express-async-errors';

import { loadRoutes } from './routes/index.js';

import { errorHandling } from './middlewares/errorHandling.js';
import { verifyApiKey } from './middlewares/verifyApiKey.js';

const app = express();
const PORT = 3333;

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use('/api', verifyApiKey);

// Creates a base API route for other routes
const routes = await loadRoutes();

routes.forEach((route) => {
  app.use(`/api${route.baseRoute}`, route.router);
});

app.use(errorHandling);

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`),
);
