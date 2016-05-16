/**
 * Dependencies
 */

import Reveal from 'reveal.js';
import R from 'ramda';
import Hook from './lib/hook.js';
import tryJSON from './utils/tryJSON.js';

/**
 * Constants
 */

const DEFAULTS = {
  hookAttr: 'data-hook',
  optionsAttr: 'data-hook-options'
};
const OPTIONS = R.merge(DEFAULTS, Reveal.getConfig().hooks);
const STORE = {};
const LISTENERS = {};

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

function triggerAction (element, eventNames, event) {
  var hook = getElementHook(element);
  var action;
  var options;
  
  if (R.isNil(hook)) {
    return;
  }
  
  action = hook.find(eventNames);
  
  if (R.isNil(action)) {
    return;
  }
  
  options = getElementOptions(element);
  
  action.trigger(element, event, options);
}

function addHook (name, eventNames, callback, options) {
  const hook = STORE[name] || new Hook(name);
  hook.add(eventNames, callback, options);
  STORE[name] = hook;
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
 * Assemble and export plugin
 */

addHook('helloWorld', 'ready slideshown', function () { console.log('hello world'); });

export default {};