import './config/preload-env';
import './db/connection';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import { errorHandling } from './middlewares/errorHandling';
import { verifyApiKey } from './middlewares/verifyApiKey';

const app = express();
const PORT = 3333;

import fs from 'fs';
import path from 'path';

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

console.log('teste1', fs.readdirSync(__dirname, { withFileTypes: true }));

console.log('teste path1', path.resolve());
console.log('teste path2', path.resolve('./src/resources/mail/'));
console.log('teste path3', path.resolve('./src/resources/mail/auth'));
console.log(
  'teste path4',
  path.resolve('./src/resources/mail/auth/forgot_password.html')
);

console.log(
  'teste2',
  fs.readdirSync(__dirname + '/resources', { withFileTypes: true })
);

console.log(
  'teste3',
  fs.readdirSync(__dirname + '/resources/mail', { withFileTypes: true })
);

console.log(
  'teste4',
  fs.readdirSync(__dirname + '/resources/mail/auth', { withFileTypes: true })
);

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
);
