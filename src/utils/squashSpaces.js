const R = require('ramda');

module.exports = R.pipe(
  R.replace(/\s{2,}/g, ' '),
  R.trim()
);