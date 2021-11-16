import app, { Request, Response } from 'express';
import { currentUser } from '@dticketing/common';

const Router = app.Router();

Router.get(
  '/api/auth/currentuser',
  currentUser,
  async (req: Request, res: Response) => {
    const payload = req.currentUser || null;
    res.send({ currentUser: payload });
  }
);

export { Router as currentUserRouter };
