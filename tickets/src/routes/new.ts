import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { requireAuth, validateRequest } from '@dticketing/common';

import { natsWrapper } from '../nats-wrapper';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/ticket-created-publisher';

const Router = express.Router();

Router.post(
  '/api/tickets',
  requireAuth,
  [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const userId = req.currentUser!.id;

    const ticket = Ticket.build({
      title,
      price,
      userId,
    });

    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { Router as newTicketsRouter };
