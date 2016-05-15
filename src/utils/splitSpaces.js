import R from 'ramda';
import squashSpaces from './squashSpaces.js';

export default R.ifElse(
  R.isArrayLike(),
  R.identity(),
  R.pipe(squashSpaces, R.split(' '))
);