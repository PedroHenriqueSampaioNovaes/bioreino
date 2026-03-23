import mongoose from 'mongoose';
async function initializeDb(retries = 5) {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bioreino.l8j1rrnu.mongodb.net/${process.env.DB}`);
        console.log('Conectou-se ao MongoDB');
    }
    catch (error) {
        if (retries > 0) {
            setTimeout(() => initializeDb(retries - 1), 1000);
            return;
        }
        console.error('Um erro ocorreu ao tentar se conectar com o MongoDB', error);
    }
}
initializeDb();
