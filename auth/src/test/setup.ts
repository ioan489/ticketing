import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

declare global {
  var signup: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'sdfs';

  mongo = await MongoMemoryServer.create();

  await mongoose.connect(mongo.getUri());
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = async () => {
  const email = 'test@test.com';
  const password = '1234';

  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = res.get('Set-Cookie');

  return cookie;
};
