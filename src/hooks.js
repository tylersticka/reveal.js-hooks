/**
 * Dependencies
 */

var Reveal = require('reveal.js');
var R = require('ramda');

/**
 * Classes
 */

var Hook = require('./lib/hook.js');

/**
 * Constants
 */

var DEFAULTS = {
  hookAttr: 'data-hook',
  optionsAttr: 'data-hook-options'
};
var OPTIONS = R.merge(DEFAULTS, Reveal.getConfig().hooks);
var STORE = {};
var LISTENERS = {};

/**
 * Internal functions
 */

function getElementHook (element) {
  
}

function getElementOptions (element) {
  
}

function triggerElementHook (element, eventNames, event) {
  console.log(eventNames);
}

function addHook (name, eventNames, action, options) {
  
}

/**
 * Event listeners
 */

Reveal.addEventListener('slidechanged', function (event) {
  triggerElementHook(event.currentSlide, ['slidechanged', 'slideshown'], event);
  triggerElementHook(event.previousSlide, ['slidechanged', 'slidehidden'], event);
});

Reveal.addEventListener('ready', function (event) {
  triggerElementHook(event.currentSlide, ['ready'], event);
});

Reveal.addEventListener('fragmentshown', function (event) {
  triggerElementHook(event.fragment, ['fragmentshown'], event);
});

Reveal.addEventListener('fragmenthidden', function (event) {
  triggerElementHooks(event.fragment, ['fragmenthidden'], event);
});

/**
 * Assemble and export plugin
 */

module.exports = {};

// function HookAction (events, action) {
//   if (R.is(String, events)) {
//     events = events.replace(/\s{2,}/g, ' ');
//     events = events.trim();
//     events = events.split(' ');
//   }
//   this.events = events || [];
//   this.action = action || noop;
// }

// HookAction.prototype.toString = function () {
//   return this.events.join(' ');
// };