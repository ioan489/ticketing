import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      getAuthCookie(): Promise<string[]>;
    }
  }
}

let mongoDb: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'gdfgdfg';
  mongoDb = new MongoMemoryServer();
  const uri = await mongoDb.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoDb.stop();
  await mongoose.connection.close();
});

global.getAuthCookie = async () => {
  const email = 'test@yahoo.com',
    password = '1234';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
