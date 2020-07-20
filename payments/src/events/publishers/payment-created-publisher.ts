import { Publisher, PaymentCreatedEvent, Subjects } from '@dticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
