import R from 'ramda';
import Action from './action.js';

export default class Hook {
  constructor (name) {
    this.name = name;
    this.actions = [];
  }
  
  add (events, callback, options) {
    this.actions.push(new Action(events, callback, options));
  }
  
  find (events) {
    return R.find(action => action.is(events), this.actions);
  }
}