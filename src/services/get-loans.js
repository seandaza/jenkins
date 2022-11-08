import instance, { END_POINTS } from './api-instance';

/**
 * @typedef {object} FilterType
 * @property {string} status Loan status
 * @property {string} month filter by month
 * @property {string} year filter by year
 * @property {Number} page query page
 * @property {Number} page_size query limiter
 */

/**
 * Funtion to get loans by status
 * @param {string} token Authentication token
 * @param {string} customerID UserId
 * @param {FilterType} filter query params
 * @returns {Object[]} An array object with loans by state
 */
export const getLoans = async (token, customerID, filter) => {
  const request = await instance.get(END_POINTS.GET_LOANS(customerID), {
    headers: { Authorization: `Token: ${token}` },
    params: filter,
  });

  if (request.data) {
    return request.data;
  }
};
