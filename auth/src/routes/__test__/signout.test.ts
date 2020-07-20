import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'daniel@yahoo.com',
      password: '1234',
    })
    .expect(201);

  const response = await request(app).get('/api/users/signout').expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
