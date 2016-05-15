import R from 'ramda';
import Action from './action.js';

class Hook {
  constructor (name) {
    this.name = name;
    this.actions = [];
  }
  
  add (events, callback, options) {
    this.actions.push(new Action(events, callback, options));
  }
}

export default Hook;