import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouters = Router();

contactsRouters.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouters.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouters.post('/contacts', ctrlWrapper(createContactController));

contactsRouters.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);

contactsRouters.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

export default contactsRouters;
