import instance, { END_POINTS } from './api-instance';

/**
 * @typedef BodyType
 * @property {string} email
 * @property {string} message
 * @property {string} name
 * @property {string} subject
 * @property {string} phone
 */
/**
 * @param {string} userID
 * @param {string} token
 * @param {BodyType} body
 */
export const contactForm = async (userID, token, body) => {
  const request = await instance.post(
    END_POINTS.CONTACT_FORM(userID),
    {
      email: body.email,
      message: body.message,
      name: body.name,
      subject: body.subject,
      phone_number: body.phone,
    },
    {
      headers: {
        Authorization: `Token: ${token}`,
      },
    }
  );

  return request.data;
};
