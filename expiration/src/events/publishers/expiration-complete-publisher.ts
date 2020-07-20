import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@dticketing/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
