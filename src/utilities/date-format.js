export const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Deciembre',
];

export const DAY_WEEK_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

/**
 * Returns a string with date format
 * @param {Date} date Input date
 * @param {string} options Config format date
 */
export const dateFormat = (date, options = 'M/d/yyyy') => {
  const twoDigitPad = (num) => (num < 10 ? '0' + num : num);

  let day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    miliseconds = date.getMilliseconds(),
    h = hour % 12,
    hh = twoDigitPad(h),
    HH = twoDigitPad(hour),
    mm = twoDigitPad(minute),
    ss = twoDigitPad(second),
    aaa = hour < 12 ? 'AM' : 'PM',
    EEEE = DAY_WEEK_NAMES[date.getDay()],
    EEE = EEEE.substr(0, 3),
    dd = twoDigitPad(day),
    M = month + 1,
    MM = twoDigitPad(M),
    MMMM = MONTH_NAMES[month],
    MMM = MMMM.substr(0, 3),
    yyyy = year + '',
    yy = yyyy.substr(2, 2);

  options = options
    .replace('hh', hh)
    .replace('h', h)
    .replace('HH', HH)
    .replace('H', hour)
    .replace('mm', mm)
    .replace('m', minute)
    .replace('ss', ss)
    .replace('s', second)
    .replace('S', miliseconds)
    .replace('dd', dd)
    .replace('d', day)
    .replace('EEEE', EEEE)
    .replace('EEE', EEE)
    .replace('yyyy', yyyy)
    .replace('yy', yy)
    .replace('aaa', aaa);

  if (options.indexOf('MMM') > -1) {
    options = options.replace('MMMM', MMMM).replace('MMM', MMM);
  } else {
    options = options.replace('MM', MM).replace('M', M);
  }

  return options;
};
