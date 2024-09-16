import { contactTypeList } from '../../constants/contacts.js';

const parseType = (type) => {
  if (typeof type !== 'string') return;

  const isType = (type) => contactTypeList.includes(type);
  if (isType(type)) return type;
};

const parseBoolean = (value) => ({ true: true, false: false }[value]);

const parseContactFilterParams = ({ type, isFavorite }) => {
  const parseContactType = parseType(type);
  const parseIsFavorite = parseBoolean(isFavorite);

  return {
    type: parseContactType,
    isFavorite: parseIsFavorite,
  };
};

export default parseContactFilterParams;
