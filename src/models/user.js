/**
 * @typedef PendingLoan
 * @property {string} id
 * @property {number} amount
 * @typedef UserType
 * @property {string} id
 * @property {string} identification
 * @property {string} fullName
 * @property {string} email
 * @property {number} score
 * @property {number} availableAmount
 * @property {string} isPreapproved
 * @property {object[]} configs
 * @property {'ACCEPTED'|'IN_PROCESS'|'REQUIRED'|'NOT_FOUND'|'UNFINISHED'} kycStatus
 * @property {string} phoneNumber
 * @property {PendingLoan} pendingLoan
 * @property {object} documents
 * @property {number} requestLoanStep
 */

/**
 * User class, mean to hold user session data.
 */
export default class UserModel {
  /**
   * @constructor
   * @param {UserType} param
   */
  constructor({
    id,
    identification,
    fullName,
    email,
    availableAmount,
    isPreapproved,
    configs,
    kycStatus,
    phoneNumber,
    score,
    pendingLoan,
    documents,
    requestLoanStep = 0,
  }) {
    this.id = id;
    this.identification = identification;
    this.email = email;
    this.fullName = fullName;
    this.availableAmount = availableAmount;
    this.isPreapproved = isPreapproved;
    this.configs = configs;
    this.kycStatus = kycStatus;
    this.phoneNumber = phoneNumber;
    this.score = score;
    this.pendingLoan = pendingLoan;
    this.documents = documents;
    this.requestLoanStep = requestLoanStep;
  }
}
