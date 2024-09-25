import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validationBody from '../middlewares/validationBody.js';
import { userSigninSchema, userSignupSchema } from '../validations/users.js';
import * as authControllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validationBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);

authRouter.post(
  '/auth/login',
  validationBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);

// authRouter.post('/auth/refresh', validationBody(), ctrlWrapper());
// authRouter.post('/auth/logout', validationBody(), ctrlWrapper());

export default authRouter;
