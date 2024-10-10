import { Router } from 'express';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { userSigninSchema, userSignupSchema } from '../validations/users.js';
import * as authControllers from '../controllers/auth.js';
import {
  loginWithGoogleOAuthSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/auth.js';

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

authRouter.post(
  '/send-reset-email',
  validationBody(requestResetEmailSchema),
  ctrlWrapper(authControllers.requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validationBody(resetPasswordSchema),
  ctrlWrapper(authControllers.resetPasswordController),
);

authRouter.get(
  '/get-oauth-url',
  ctrlWrapper(authControllers.getGoogleOAuthController),
);

authRouter.post(
  '/confirm-oauth',
  validationBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(authControllers.loginWithGoogleController),
);

export default authRouter;
