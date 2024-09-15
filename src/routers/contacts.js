import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validationBody from '../middlewares/validationBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validations/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouters = Router();

contactsRouters.get('/', ctrlWrapper(getAllContactsController));

contactsRouters.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouters.post(
  '/',
  validationBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouters.patch(
  '/:contactId',
  isValidId,
  validationBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouters.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouters;
