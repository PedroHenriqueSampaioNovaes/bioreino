import mongoose from 'mongoose';

async function initializeDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bioreino.l8j1rrn.mongodb.net/${process.env.DB}`
    );
  } catch (error) {
    console.error('Um erro ocorreu ao tentar se conectar com mongoose', error);
  }
}
initializeDb().then(() => {
  console.log('Conectou-se ao mongodb');
});
