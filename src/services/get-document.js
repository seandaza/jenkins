import instance, { END_POINTS } from './api-instance';

/**
 * @typedef ParamTypes
 * @property {string} document
 * @property {string} version
 */
/**
 * @param {string} userID
 * @param {string} token
 * @param {ParamTypes} params
 * @returns {string} URL
 */
export const getDocument = async (userID, token, params) => {
  const request = await instance.get(END_POINTS.LEGAL_DOCUMENTS(userID), {
    headers: {
      Authorization: `Token: ${token}`,
    },
    params: {
      document_name: params.document,
      version: params.version,
    },
  });
  return request.data.url;
};
