import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Data,
      required: true,
    },
    accessTokenValidUntil: {
      type: Data,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const SessionCollection = model('session', sessionSchema);
export default SessionCollection;
