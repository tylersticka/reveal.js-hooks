var R = require('ramda');
var Action = require('./action.js');

function Hook (name) {
  this.name = name;
  this.actions = [];
}

Hook.prototype.add = function (events, callback, options) {
  this.actions.push(new Action(events, callback, options));
};

module.exports = Hook;