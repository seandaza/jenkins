import instance, { END_POINTS } from './api-instance';

/**
 * @param {string} userId
 * @param {string} loanId
 * @param {string} documentName
 * @param {string} token
 */
export const getLoanDocuments = async (userId, loanId, documentName, token) => {
  instance.get(END_POINTS.LOAN_DOCUMENTS(userId, loanId, documentName), {
    headers: {
      Authorization: `Token: ${token}`,
    },
  });
};
