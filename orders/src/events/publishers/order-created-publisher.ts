import { Publisher, OrderCreatedEvent, Subjects } from '@dticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
