import { Publisher, Channels, ExpirationCompleted } from '@dticketing/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompleted> {
  readonly channel = Channels.ExpirationCompleted;
}
