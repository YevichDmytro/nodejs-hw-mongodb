import createHttpError from 'http-errors';
import * as contactsServices from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contacts.js';
import parseContactFilterParams from '../utils/filters/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const data = await contactsServices.getContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsServices.getContactById(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
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
    throw createHttpError(404, 'Contact not found');
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
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
