import { TicketUpdatedPublisher } from './ticket-updated-publisher';
import { Message } from 'node-nats-streaming';
import { Channels, Listener, OrderCancelled } from '@dticketing/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../models/ticket';

export class OrderCancelledListener extends Listener<OrderCancelled> {
  readonly channel = Channels.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelled['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: undefined });

    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
