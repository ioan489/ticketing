import { Publisher, TicketCreatedEvent, Channels } from '@dticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly channel = Channels.TicketCreated;
}
