import instance, { END_POINTS } from './api-instance';

/**
 * Function to get all payments by loan
 * @param {string} token Authentication token
 * @param {string} customerID UserID
 * @param {string} loanID LoanID
 * @returns An object array with payments
 */
export const getPayments = async (token, customerID, loanID) => {
  const request = await instance.get(END_POINTS.PAYMENTS(customerID, loanID), {
    headers: { Authorization: `Token: ${token}` },
  });

  if (request.data) {
    return request.data;
  }
};
