import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '@dticketing/common';
import { natsWrapper } from '../../nats-wrapper';

it('returns a error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.getAuthCookie())
    .send({ ticketId })
    .expect(404);
});

it('returns a error if the ticket is already reserved', async () => {
  const ticketId = mongoose.Types.ObjectId();

  const ticket = Ticket.build({
    id: ticketId.toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    userId: 'sdfsdfds',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket: ticket,
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.getAuthCookie())
    .send({ ticketId })
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticketId = mongoose.Types.ObjectId();

  const ticket = Ticket.build({
    id: ticketId.toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const res = await request(app)
    .post('/api/orders')
    .set('Cookie', global.getAuthCookie())
    .send({ ticketId })
    .expect(201);
});

it('emits an order created event', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.getAuthCookie())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
