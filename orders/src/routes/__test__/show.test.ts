import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('feches the order', async () => {
  const ticketId = mongoose.Types.ObjectId();
  const cookie = global.getAuthCookie();

  const ticket = Ticket.build({
    id: ticketId.toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId })
    .expect(201);

  const { body: fechedOrder } = await request(app)
    .get('/api/orders/' + order.id)
    .set('Cookie', cookie)
    .expect(200);

  expect(fechedOrder.id).toEqual(order.id);
});
