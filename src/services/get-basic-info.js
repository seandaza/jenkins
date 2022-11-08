import UserModel from '../models/user';
import instance, { END_POINTS } from './api-instance';

/**
 * Function to get information from a user
 * @param {string} token Authentication token
 * @returns An object with information from a user
 */
export const getBasicInfo = async (token) => {
  const request = await instance.get(END_POINTS.BASIC_INFO, {
    headers: { Authorization: `Token: ${token}` },
  });

  if (request.data?.mo_profile) {
    const { identification, customer, full_name, email } =
      request.data.mo_profile;

    const {
      available_amount,
      is_preapproved,
      configs,
      kyc_status,
      score_amount,
      phone_number,
      pending_loan,
      request_loan_step,
    } = customer.basic_data;

    return new UserModel({
      id: customer.id,
      identification,
      fullName: full_name,
      email,
      score: Math.floor(score_amount),
      availableAmount: Math.floor(available_amount),
      isPreapproved: is_preapproved,
      configs,
      kycStatus: kyc_status,
      phoneNumber: phone_number,
      pendingLoan: pending_loan
        ? {
            loan_id: pending_loan.loan_id,
            amount: Number(pending_loan.amount),
          }
        : undefined,
      requestLoanStep: request_loan_step,
      documents: request.data?.legal_documents,
    });
  }
};
