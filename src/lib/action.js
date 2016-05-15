var R = require('ramda');
var noop = require('../utils/noop.js');
var splitSpaces = require('../utils/splitSpaces.js');

function Action (events, callback, options) {
  events = splitSpaces(events);
  callback = callback || noop;
  options = options || {};
  
  if (options.context) {
    callback = R.bind(callback, options.context);
  }
  
  this.events = events;
  this.callback = callback;
  this.options = options;
}

Action.prototype.is = function (events) {
  events = splitSpaces(events);
  return R.lt(R.length(R.without(events, this.events)), this.events.length);
};

Action.prototype.trigger = function () {
  return R.apply(this.callback, this.options.args || arguments);
};

module.exports = Action;