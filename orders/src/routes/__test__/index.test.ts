import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const createTicket = async () => {
  const ticketId = mongoose.Types.ObjectId();

  const ticket = Ticket.build({
    id: ticketId.toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  return ticket;
};

it('fetches orders for a particular user', async () => {
  const ticket1 = await createTicket();
  const ticket2 = await createTicket();
  const ticket3 = await createTicket();

  const user1 = global.getAuthCookie();
  const user2 = global.getAuthCookie();

  await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  const res = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .expect(200);

  expect(res.body.length).toEqual(2);
  expect(res.body[0].id).toEqual(orderOne.id);
  expect(res.body[1].id).toEqual(orderTwo.id);
});
