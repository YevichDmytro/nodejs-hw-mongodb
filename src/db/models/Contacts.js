import { Schema, model } from 'mongoose';
import { contactTypeList } from '../../constants/contacts.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavorite',
  'contactType',
  'createdAt',
  'updatedAt',
];

const ContactsCollection = model('contact', contactsSchema);
export default ContactsCollection;
