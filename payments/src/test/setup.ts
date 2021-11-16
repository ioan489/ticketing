import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signup: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'sdfs';

  mongo = await MongoMemoryServer.create();

  await mongoose.connect(mongo.getUri());
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = (id?: string) => {
  const user = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@yahoo.com',
  };

  const token = jwt.sign(user, process.env.JWT_KEY!);
  const session = { jwt: token };
  const jsonSession = JSON.stringify(session);
  const base64 = Buffer.from(jsonSession).toString('base64');

  return [`express:sess=${base64}`];
};
