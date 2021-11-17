import app, { Request, Response } from 'express';
import { check } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@dticketing/common';
import { User } from '../models/user';
import Password from '../services/password';

const Router = app.Router();

Router.post(
  '/api/auth/signin',
  [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Email must be valid'),
    check('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const isPasswordValid = await Password.compare(
      existingUser.password,
      password
    );
    if (!isPasswordValid) {
      throw new BadRequestError('Invalid Credentials');
    }

    const jwtUser = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: jwtUser,
    };

    res.status(200).send(existingUser);
  }
);

export { Router as signInRouter };
