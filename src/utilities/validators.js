export const validateEmail = (email) =>
  RegExp(/^[\w-w.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);

export const validateNumeric = (text) => RegExp(/^[0-9]+$/).test(text);

export const validatePhone = (text) => RegExp(/^[0-9]{10,10}$/).test(text);

export const validateAlphaNum = (text) =>
  RegExp(
    /^[a-zA-ZÀ-ÿ0-9# -\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9# -\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9# -\u00f1\u00d1]+$/g
  ).test(text);

export const validateAlpha = (text) =>
  RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
  ).test(text);

export const formValidators = {
  alpha: (value) => validateAlpha(value),
  phone: (value) => validatePhone(value),
  alphanum: (value) => validateAlphaNum(value),
  email: (value) => validateEmail(value),
  any: (value) => !!value,
};

export const validator = (skema, form) => {
  return skema.find(({ name, type = 'alpha', isRequired = false }) => {
    if (!isRequired) return false;
    if (isRequired && !form[name]) return true;
    const isNotRight = !formValidators[type](form[name].trim());
    return isNotRight;
  });
};
