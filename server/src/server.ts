import express from 'express';

const app = express();

const PORT = 3333;

app.use(express.json());

// Creates a base API route for other routes
routes.forEach((route) => app.use('/api', route));

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
);
