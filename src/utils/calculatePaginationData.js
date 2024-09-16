const calculatePaginationData = ({ contactsCount, perPage, page }) => {
  const totalPages = Math.ceil(contactsCount / perPage);
  const hasNextPage = page !== totalPages;
  const hasPreviousPage = page !== 1;

  return {
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

export default calculatePaginationData;
