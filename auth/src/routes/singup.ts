import { check } from 'express-validator';
import app, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError, validateRequest } from '@dticketing/common';
import { User } from '../models/user';

const Router = app.Router();

Router.post(
  '/api/auth/signup',
  [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Email is not valid.'),
    check('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { Router as signUpRouter };
