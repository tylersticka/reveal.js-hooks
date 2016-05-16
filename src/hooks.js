/**
 * Dependencies
 */

const Reveal = require('reveal.js');
const R = require('ramda');
const Hook = require('./lib/hook.js');
const tryJSON = require('./utils/tryJSON.js');

/**
 * Constants
 */

const DEFAULTS = {
  hookAttr: 'data-hook',
  optionsAttr: 'data-hook-options'
};
const OPTIONS = R.merge(DEFAULTS, Reveal.getConfig().hooks);
const STORE = {};

/**
 * Internal functions
 */

function getElementHook (element) {
  var hook;
  var name;
  
  if (!R.isNil(element)) {
    name = element.getAttribute(OPTIONS.hookAttr);
    
    if (!R.isNil(name) && R.has(name, STORE)) {
      hook = STORE[name];
    }
  }
  
  return hook;
}

function getElementOptions (element) {
  var options;
  
  if (!R.isNil(element)) {
    options = element.getAttribute(OPTIONS.optionsAttr);
    options = tryJSON(options);
  }
  
  return options;
}

function triggerAction (element, events, event) {
  var hook = getElementHook(element);
  var action;
  var options;
  
  if (R.isNil(hook)) {
    return;
  }
  
  action = hook.find(events);
  
  if (R.isNil(action)) {
    return;
  }
  
  options = getElementOptions(element);
  
  action.trigger(element, event, options);
}

/**
 * Public functions
 */

function add (name, events, callback, options) {
  const hook = STORE[name] || new Hook(name);
  hook.add(events, callback, options);
  STORE[name] = hook;
}

function addEach (name, hooks, options) {
  options = R.merge({ context: hooks }, options);
  R.forEach(event => add(name, event, hooks[event], options), R.keys(hooks));
}

function map (maps) {
  return (name, hooks, options) => {
    options = R.merge({ context: hooks }, options);
    hooks = R.map(mapTo => hooks[mapTo], maps);
    addEach(name, hooks, options);
  };
}

/**
 * Event listeners
 */

Reveal.addEventListener('slidechanged', event => {
  triggerAction(event.currentSlide, ['slidechanged', 'slideshown'], event);
  triggerAction(event.previousSlide, ['slidechanged', 'slidehidden'], event);
});

Reveal.addEventListener('ready', event => {
  triggerAction(event.currentSlide, ['ready'], event);
});

Reveal.addEventListener('fragmentshown', event => {
  triggerAction(event.fragment, ['fragmentshown'], event);
});

Reveal.addEventListener('fragmenthidden', event => {
  triggerActions(event.fragment, ['fragmenthidden'], event);
});

/**
 * Plugin
 */

module.exports = {
  add: add,
  addEach: addEach,
  map: map
};

// map({
//   'ready slideshown': 'restart',
//   'slidehidden': 'kill'
// })('helloWorld', {
//   'restart': function () {
//     console.log('restart');
//   },
//   'kill': function () {
//     console.log('kill');
//   }
// });