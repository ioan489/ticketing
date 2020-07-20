import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  const ticket = Ticket.build({
    userId: '1234',
    title: 'concert',
    price: 10,
  });
  await ticket.save();

  const ticketFirstInstance = await Ticket.findById(ticket.id);
  const ticketSecondInstance = await Ticket.findById(ticket.id);

  ticketFirstInstance?.set({ price: 20 });
  ticketSecondInstance?.set({ price: 40 });

  await ticketFirstInstance?.save();

  try {
    await ticketSecondInstance?.save();
  } catch (err) {
    return done();
  }

  throw new Error('Should not reach this point');
});
