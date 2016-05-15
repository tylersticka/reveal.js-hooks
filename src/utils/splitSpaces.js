var R = require('ramda');
var squashSpaces = require('./squashSpaces.js');

module.exports = R.ifElse(
  R.isArrayLike(),
  R.identity(),
  R.pipe(squashSpaces, R.split(' '))
);