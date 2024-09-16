import ContactsCollection from '../db/models/Contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavorite) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData({
    contactsCount,
    perPage,
    page,
  });

  return {
    data: contacts,
    page,
    perPage,
    totalItems: contactsCount,
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
