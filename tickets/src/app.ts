import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, currentUser } from '@dticketing/common';
import { newTicketsRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { updateTicketRouter } from './routes/update';
import { indexTicketRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false,
  })
);
app.use(currentUser);

app.use(newTicketsRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);
app.use(indexTicketRouter);

app.use(errorHandler);

export { app };
