import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'daniel@yahoo.com',
      password: '1234',
    })
    .expect(201);
});

it('returns a 400 with a invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tfghfgh.com',
      password: '1234',
    })
    .expect(400);
});

it('return a 400 with a invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tfghfgh.com',
      password: 'p',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@yahoo.com',
      password: '1234',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@yahoo.com',
      password: '1234',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@yahoo.com',
      password: '1234',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
