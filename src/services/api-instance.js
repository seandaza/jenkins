import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_MO_API,
});

export const END_POINTS = {
  BASIC_INFO: '/partner/customers/info',
  TEMPORAL_DOCUMENTS: '/partner/contracts/temporary/',
  /**
   * @param {string} customerID
   */
  LEGAL_DOCUMENTS: (customerID) =>
    `/partner/customers/${customerID}/documents/`,
  /**
   * @param {string} customerID
   */
  CONTACT_INFO: (customerID) => `/partner/customers/${customerID}/`,
  /**
   * @param {string} customerID
   */
  CONTACT_FORM: (customerID) => `/partner/customers/${customerID}/contact/`,
  /**
   * @param {string} customerID
   */
  KYC_STATUS: (customerID) => `/partner/customers/${customerID}/kyc/`,
  /**
   * @param {string} customerID
   */
  GET_LOANS: (customerID) => `/partner/customers/${customerID}/loans/`,
  /**
   * @param {string} customerID
   */
  CREATE_LOAN: (customerID) => `/partner/customers/${customerID}/loans/`,
  /**
   * @param {string} customerID
   */
  PATCH_LOAN: (customerID) => `/partner/customers/${customerID}/loans/`,
  /**
   * @param {string} customerID
   * @param {string} loanID
   */
  PAYMENTS: (customerID, loanID) =>
    `/partner/customers/${customerID}/loans/${loanID}/payments/`,
  LOAN_DOCUMENTS: (customerID, loanID, documentName) =>
    `/partner/customers/${customerID}/loans/${loanID}/documents/${documentName}/`,
};

export default instance;
