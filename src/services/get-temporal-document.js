import instance, { END_POINTS } from './api-instance';

/**
 * @typedef BodyTpe
 * @property {number} amount
 * @property {string} document
 */
/**
 * @param {string} token
 * @param {BodyTpe} body
 * @returns {string} URL
 */
export const getTemporalDocument = async (token, body) => {
  const request = await instance.post(
    END_POINTS.TEMPORAL_DOCUMENTS,
    {
      amount: body.amount,
      contract_name: body.document,
    },
    {
      headers: {
        Authorization: `Token: ${token}`,
      },
    }
  );

  return request.data.url;
};
