import bcrypt from 'bcrypt';
import UserCollection from '../db/models/User.js';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/user.js';
import SessionCollection from '../db/models/Session.js';

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

  const accessToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);

  const refreshToken = randomBytes(30).toString('base64');
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

  const userSession = await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return userSession;
};

export const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });

export const findUser = (filter) => UserCollection.findOne(filter);
