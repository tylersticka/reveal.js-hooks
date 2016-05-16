const R = require('ramda');

module.exports = R.tryCatch(function (str) {
  str = R.replace(/(\r\n|\n|\r|\t)/gm, '', str);
  return JSON.parse(str);
}, R.F);