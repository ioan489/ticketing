import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { Channels } from './channels';
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketCreatedlistener extends Listener<TicketCreatedEvent> {
  channel = Channels.TicketCreated;
  queueGroupName = 'tickets-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    msg.ack();
  }
}
