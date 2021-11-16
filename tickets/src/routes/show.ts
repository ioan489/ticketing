import express, { Request, Response } from 'express';
import { NotFoundError } from '@dticketing/common';

import { Ticket } from '../models/ticket';

const Router = express.Router();

Router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { Router as showTicketRouter };
