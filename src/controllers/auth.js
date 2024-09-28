import * as authServices from '../services/auth.js';

export const signupController = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};

export const signinController = async (req, res) => {
  const signinCredits = await authServices.signin(req.body);

  res.cookie('refreshToken', signinCredits.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + signinCredits.refreshTokenValidUntil),
  });

  res.cookie('sessionId', signinCredits._id);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: signinCredits.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  console.log(req.cookies);
};
