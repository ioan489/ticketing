import { Publisher, TicketUpdatedEvent, Channels } from '@dticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly channel = Channels.TicketUpdated;
}
