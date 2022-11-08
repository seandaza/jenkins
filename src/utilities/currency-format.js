/**
 * Returns a string with currency format
 * @param {number} amount Amount prev format
 * @param {string} currency ISO currency code
 * @param {string} locale Unicode locale identifier
 */
export const currencyFormat = (
  amount = 0,
  currency = 'MXN',
  locale = 'en-us'
) => {
  amount = amount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$${amount} ${currency}`.replace(/\.00([^\d])/g, '$1');
};
