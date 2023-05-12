require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const PORT = 3000;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const userRouter = require('./routes/UserRouter');

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../client/dist/index.html', (error) => {
        if (error) res.status(500).send(error);
      }),
    );
  });
}

app.use('/api/user', userRouter);

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@bioreino.l8j1rrn.mongodb.net/`,
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
    console.log('Conectou ao banco!');
  })
  .catch((err) => console.log(err));
