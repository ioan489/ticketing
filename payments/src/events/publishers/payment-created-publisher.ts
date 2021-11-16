import { Channels, Publisher, PaymentCreatedEvent } from '@dticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly channel = Channels.PaymentCreated;
}
