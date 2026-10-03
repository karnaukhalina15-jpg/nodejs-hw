import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
const authRouter = Router();

authRouter.post('/auth/register', celebrate(registerUserSchema), registerUser);
authRouter.post('/auth/login', celebrate(loginUserSchema), loginUser);
authRouter.post('/auth/logout', logoutUser);
authRouter.post('/auth/refresh', refreshUserSession);
authRouter.post(
  '/auth/request-reset-email',
  celebrate({ body: requestResetEmailSchema }),
  requestResetEmail,
);
authRouter.post(
  '/auth/reset-password',
  celebrate({ body: resetPasswordSchema }),
  resetPassword,
);
export default authRouter;
