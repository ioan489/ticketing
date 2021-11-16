import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  OrderStatus,
} from '@dticketing/common';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { stripe } from '../stripe';

import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { natsWrapper } from '../nats-wrapper';

const Router = express.Router();

Router.post(
  '/api/payments',
  requireAuth,
  [check('token').not().isEmpty(), check('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }

    const charge = await stripe.charges.create({
      amount: order.price * 100,
      currency: 'usd',
      source: token,
    });
    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ success: true });
  }
);

export { Router as newPaymentsRouter };
