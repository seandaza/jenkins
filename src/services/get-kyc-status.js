import instance, { END_POINTS } from './api-instance';

/**
 *
 * @param {string} customerID
 * @param {string} token
 */
const getKYCstatus = async (customerID, token) => {
  const request = await instance.get(END_POINTS.KYC_STATUS(customerID), {
    headers: { Authorization: `Token: ${token}` },
  });
  return request.data.status;
};

export default getKYCstatus;
