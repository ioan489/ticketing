import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler } from '@dticketing/common';
import { signInRouter } from './routes/singin';
import { signUpRouter } from './routes/singup';
import { signOut } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

const app = express();
app.set('trust proxy', true);
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false,
  })
);

app.use(json());
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOut);
app.use(currentUserRouter);
app.use(errorHandler);

export { app };
