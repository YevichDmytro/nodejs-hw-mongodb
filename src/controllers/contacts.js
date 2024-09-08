import createHttpError from 'http-errors';
import * as contactsServices from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await contactsServices.getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contactsServices.getContactById(contactId);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId} !`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const data = await contactsServices.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsServices.patchContact(contactId, req.body);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: data.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsServices.deleteContact(contactId);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};
