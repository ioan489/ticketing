import nats from 'node-nats-streaming';
import { TicketCreatedPubliser } from './events/ticket-created-publisher';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const data = {
    id: '123',
    title: 'concert',
    price: 20,
  };

  await new TicketCreatedPubliser(stan).publish(data);
});
