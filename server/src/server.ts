import './config/preload-env';
import './db/connection';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import { errorHandling } from './middlewares/errorHandling';
import { verifyApiKey } from './middlewares/verifyApiKey';

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
routes.forEach((route) => {
  app.use(`/api${route.baseRoute}`, route.router);
});

// Handle error api
app.use(errorHandling);

console.log(fs.readdirSync(__dirname));

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
);
