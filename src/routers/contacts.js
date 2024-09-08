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

contactsRouters.get('/', ctrlWrapper(getAllContactsController));

contactsRouters.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouters.post('/', ctrlWrapper(createContactController));

contactsRouters.patch('/:contactId', ctrlWrapper(patchContactController));

contactsRouters.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouters;
