import { Listener, OrderCreated, Channels } from '@dticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreated> {
  readonly channel = Channels.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreated['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job:', delay);

    await expirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }
}
