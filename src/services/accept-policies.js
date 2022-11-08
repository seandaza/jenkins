import instance, { END_POINTS } from './api-instance';

const patchLoan = async (customerID, { status, documents }, token) => {
  await instance.patch(
    END_POINTS.PATCH_LOAN(customerID),
    {
      status,
      policies: documents?.map(({ name, version }) => ({
        name_contract: name,
        version,
      })),
    },
    {
      headers: { Authorization: `Token: ${token}` },
    }
  );
};

export default patchLoan;
