import { Message } from 'node-nats-streaming';
import { Listener, TicketCreatedEvent, Channels } from '@dticketing/common';

import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketCreatedlistener extends Listener<TicketCreatedEvent> {
  readonly channel = Channels.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
