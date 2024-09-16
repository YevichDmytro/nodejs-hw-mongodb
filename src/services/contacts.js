import ContactsCollection from '../db/models/Contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
}) => {
  const skip = (page - 1) * perPage;

  const data = await ContactsCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder})
  const totalItems = await ContactsCollection.find().countDocuments();

  const paginationData = calculatePaginationData({ totalItems, perPage, page });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};
export const getContactById = async (contactId) =>
  await ContactsCollection.findById(contactId);

export const createContact = async (payload) =>
  await ContactsCollection.create(payload);

export const patchContact = async (contactId, payload) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!contact || !contact.value) return null;

  return {
    contact: contact.value,
    isNew: Boolean(contact?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) =>
  await ContactsCollection.findOneAndDelete({ _id: contactId });
