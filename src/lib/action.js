import R from 'ramda';
import noop from '../utils/noop.js';
import splitSpaces from '../utils/splitSpaces.js';

export default class Action {
  constructor (events, callback = noop, options = {}) {
    events = splitSpaces(events);
    
    if (options.context) {
      callback = R.bind(callback, options.context);
    }
    
    this.events = events;
    this.callback = callback;
    this.options = options;
  }
  
  is (events) {
    events = splitSpaces(events);
    return R.lt(R.length(R.without(events, this.events)), this.events.length);
  }
  
  trigger () {
    return R.apply(this.callback, this.options.args || arguments);
  }
}