import { Channels, Listener, OrderCreated } from '@dticketing/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreated> {
  readonly channel = Channels.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreated['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status,
    });
    await order.save();

    msg.ack();
  }
}