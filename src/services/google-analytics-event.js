import ReactGA from 'react-ga';
import { analytics } from '../utilities/firebase-app';

export const CATEGORIES = {
  HOME: 'Home',
  CASH_ADVANCE: 'CashAdvance',
  CASH_ADVANCE_LIST: 'CashAdvance list',
  PAID_LOANS: 'Paid loan',
  LOAN_SUMMARY: 'Loan summary',
  LOAN_DETAILS: 'Loan details',
  LANDING: 'Landing',
  HOW_IT_WORKS: 'How it works',
  FAQ: 'FAQs',
  WRITING_US: 'Writing us',
  HELP: 'Help',
};

export const ACTIONS = {
  CLICK: 'click',
  VISIT: 'visit',
  REQUEST: 'request',
  RESPONSE: 'response',
  SELECT: 'select',
};

/**
 * @typedef GoogleAnalyticsObject
 * @property {string} category
 * @property {string} action
 * @property {string} label
 * @property {object} value
 */

/**
 * add event in google analytics
 * @param {GoogleAnalyticsObject} param
 */
export const addGoogleAnalyticsEvent = ({ category, action, label, value }) => {
  analytics.logEvent(category, { [action]: label || action });
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
