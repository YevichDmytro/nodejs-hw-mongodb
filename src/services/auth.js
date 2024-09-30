import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/user.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);

  const refreshToken = randomBytes(30).toString('base64');
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const signup = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
  delete data._doc.password;

  return data;
};

export const signin = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(401, 'Email or password invalid');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw createHttpError(401, 'Email or password invalid');

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSession();

  return await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
};

export const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });

export const refreshSession = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!oldSession) throw createHttpError(401, 'Session not found');

  if (new Date() > oldSession.refreshTokenValidUntil)
    throw createHttpError(401, 'Session token expired');

  await SessionCollection.deleteOne({ _id: sessionId });

  const sessionData = createSession();

  return await SessionCollection.create({
    userId: oldSession._id,
    ...sessionData,
  });
};

export const signout = async (sessionId) =>
  await SessionCollection.deleteOne({ _id: sessionId });

export const findUser = (filter) => UserCollection.findOne(filter);
