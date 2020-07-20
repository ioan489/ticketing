import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'Concert',
      price: 10,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'Concert',
      price: 10,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'Concert',
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'Concert',
      price: 20,
    })
    .expect(401);
});

it('returns a 400 if provided an invalid title or price', async () => {
  const cookie = global.getAuthCookie();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Concert',
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Concert',
      price: -20,
    })
    .expect(400);
});

it('update the ticket privided valid input ', async () => {
  const cookie = global.getAuthCookie();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Concert',
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new ticket',
      price: 20,
    })
    .expect(200);

  const resTicket = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send();

  expect(resTicket.body.title).toEqual('new ticket');
  expect(resTicket.body.price).toEqual(20);
});

it('publishes a event', async () => {
  const cookie = global.getAuthCookie();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Concert',
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new ticket',
      price: 20,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
