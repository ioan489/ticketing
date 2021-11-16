import app, { Request, Response } from 'express';

const Router = app.Router();

Router.post('/api/auth/signout', (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { Router as signOut };
