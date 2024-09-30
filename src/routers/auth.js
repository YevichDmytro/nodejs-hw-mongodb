import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validationBody from '../middlewares/validationBody.js';
import { userSigninSchema, userSignupSchema } from '../validations/users.js';
import * as authControllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validationBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);

authRouter.post(
  '/login',
  validationBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));

authRouter.post('/logout', ctrlWrapper(authControllers.signoutController));

export default authRouter;
