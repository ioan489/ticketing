import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, currentUser } from '@dticketing/common';
import { newOrdersRouter } from './routes/new';
import { showOrdersRouter } from './routes/show';
import { indexOrdersRouter } from './routes/index';
import { deleteOrdersRouter } from './routes/delete';

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
app.use(newOrdersRouter);
app.use(showOrdersRouter);
app.use(indexOrdersRouter);
app.use(deleteOrdersRouter);

app.use(errorHandler);

export { app };
