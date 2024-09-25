import { Schema, model } from 'mongoose';
import { emailRegex } from '../../constants/user.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     email: {
//       type: String,
//       match: emailRegex,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   { versionKey: false, timestamps: true },
// );

const UserCollection = model('user', userSchema);
export default UserCollection;
