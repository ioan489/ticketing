import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from './ticket-created-event';
import { Channels } from './channels';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  channel = Channels.TicketCreated;
}
