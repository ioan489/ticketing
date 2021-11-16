import { Publisher, OrderCreated, Channels } from '@dticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreated> {
  readonly channel = Channels.OrderCreated;
}
