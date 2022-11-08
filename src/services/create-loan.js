import instance, { END_POINTS } from './api-instance';

/**
 * @typedef BodyType
 * @property {number} amount
 * @property {string} configID
 */
/**
 * Function to create a loan
 * @param {string} token Authentication token
 * @param {string} customerID UserID
 * @param {BodyType} body Loan amount requested
 */
export const createLoan = async (token, customerID, body) => {
  const request = await instance.post(
    END_POINTS.CREATE_LOAN(customerID),
    {
      amount: body.amount,
      config_id: body.configID,
    },
    {
      headers: { Authorization: `Token: ${token}` },
    }
  );
  return request.data.loan;
};
