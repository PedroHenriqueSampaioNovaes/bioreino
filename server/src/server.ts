import './config/preload-env';
import './db/connection';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import { errorHandling } from './middlewares/errorHandling';

const app = express();
const PORT = 3333;

app.use(express.json());

// Creates a base API route for other routes
routes.forEach((route) => app.use('/api', route));

// Handle error api
app.use(errorHandling);

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
);
