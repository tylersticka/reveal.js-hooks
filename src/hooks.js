/**
 * Dependencies
 */

import Reveal from 'reveal.js';
import R from 'ramda';
import Hook from './lib/hook.js';

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
  
}

function getElementOptions (element) {
  
}

function triggerElementHook (element, eventNames, event) {
  // console.log(eventNames);
}

function addHook (name, eventNames, action, options) {
  
}

/**
 * Event listeners
 */

Reveal.addEventListener('slidechanged', event => {
  triggerElementHook(event.currentSlide, ['slidechanged', 'slideshown'], event);
  triggerElementHook(event.previousSlide, ['slidechanged', 'slidehidden'], event);
});

Reveal.addEventListener('ready', event => {
  triggerElementHook(event.currentSlide, ['ready'], event);
});

Reveal.addEventListener('fragmentshown', event => {
  triggerElementHook(event.fragment, ['fragmentshown'], event);
});

Reveal.addEventListener('fragmenthidden', event => {
  triggerElementHooks(event.fragment, ['fragmenthidden'], event);
});

/**
 * Assemble and export plugin
 */

export default {};