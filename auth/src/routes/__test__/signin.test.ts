import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@yahoo.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when a incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'daniel@yahoo.com',
      password: '1234',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'daniel@yahoo.com',
      password: 'dfgd',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'daniel@yahoo.com',
      password: '1234',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'daniel@yahoo.com',
      password: '1234',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
