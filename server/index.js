require('dotenv').config();

const express = require('express');
const verifyApiKey = require('./helpers/verify-api-key');
const app = express();

app.use(express.json());
app.use('/api', verifyApiKey);

const routes = require('./routes/index');
routes.forEach((route) => app.use('/api', route));

const path = require('path');
const PORT = 3000;

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.resolve('client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
