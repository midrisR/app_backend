const getPagination = (page, perPage) => {
  const limit = perPage ? +perPage : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalProducts, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalProducts / limit);

  return {
    totalProducts,
    products,
    totalPages,
    currentPage,
  };
};
module.exports = { getPagination, getPagingData };
