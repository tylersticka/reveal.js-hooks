import R from 'ramda';

export default R.pipe(
  R.replace(/\s{2,}/g, ' '),
  R.trim()
);