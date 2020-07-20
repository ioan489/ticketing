import { Publisher, TicketUpdatedEvent, Subjects } from '@dticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
