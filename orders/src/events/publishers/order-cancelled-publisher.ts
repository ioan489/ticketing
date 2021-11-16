import { Publisher, OrderCancelled, Channels } from '@dticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelled> {
  readonly channel = Channels.OrderCancelled;
}
