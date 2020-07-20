import { Publisher, OrderCancelledEvent, Subjects } from '@dticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
