import mongoose from 'mongoose';

import { app } from './app';

app.get('/api/auth', (req, res) => {
  res.send({});
});

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Conneted to MongoDb');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening onp ort 3000.');
  });
};

start();
