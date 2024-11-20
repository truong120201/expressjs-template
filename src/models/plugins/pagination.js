// pagination.js

/**
 * A helper function for paginating Sequelize models.
 * @param {Model} model - The Sequelize model to paginate.
 * @param {Object} options - Options for pagination and filtering.
 * @param {number} options.page - The current page number (starting from 1).
 * @param {number} options.pageSize - The number of items per page.
 * @param {Object} options.where - (Optional) Additional filtering options.
 * @param {Object} options.order - (Optional) Sorting options.
 * @returns {Object} - An object containing paginated data and metadata.
 */
async function paginate({ page = 1, pageSize = 10, where = {}, order = [['createdAt', 'DESC']] }) {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { count: totalItems, rows: data } = await this.findAndCountAll({
    where,
    order,
    limit,
    offset,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data,
    meta: {
      totalItems,
      totalPages,
      currentPage: page,
      pageSize,
    },
  };
}

export default paginate;
