const R = require('ramda');
const Action = require('./action.js');

class Hook {
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

module.exports = Hook;