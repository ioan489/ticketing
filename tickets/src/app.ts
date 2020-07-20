import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { indexRouter } from './routes/index';
import { newRouter } from './routes/new';
import { showRouter } from './routes/show';
import { updateRouter } from './routes/update';
import { errorHandler } from '@dticketing/common';
import { NotFoundError } from '@dticketing/common';
import { currentUser } from '@dticketing/common';

const app = express();
app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(indexRouter);
app.use(newRouter);
app.use(showRouter);
app.use(updateRouter);
app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
