import instance, { END_POINTS } from './api-instance';

const updateContactInfo = async (customerID, body, token) => {
  const request = await instance.patch(
    END_POINTS.CONTACT_INFO(customerID),
    {
      email: body.email,
      phone_number: body.phone,
      occupation: body.occupation,
      policies: body.documents.map(({ name, version }) => ({
        name_contract: name,
        version,
      })),
    },
    {
      headers: { Authorization: `Token: ${token}` },
    }
  );
  return request.data;
};

export default updateContactInfo;
