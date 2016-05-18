# reveal.js-hooks

A plugin for [Reveal.js](https://github.com/hakimel/reveal.js) to make slide and fragment events easier (at least for me).

Check out [Anything](https://github.com/rajgoel/reveal.js-plugins/tree/master/anything) if you prefer scripting from the slides themselves.

## Installation

Copy `dist/hooks.js` or `dist/hooks.min.js` to your reveal.js presentation folder (presumably `plugin/`).

Add the file path to your `Reveal.initialize` dependencies:

```javascript
Reveal.initialize({
  // ...
  dependencies: [
    // ...
    {
      src: '/plugin/hooks/hooks.js', 
      // Optional: Don't load unless you're using it
      condition: function () { return !!document.querySelector('[data-hook]'); }
    }
    // ...
  ]
});
```

## Usage

The plugin works by listening for various Reveal events, checking if any affected elements have a `data-hook` attribute, and firing any registered hooks that match its value.

Let's add a hook that will `console.log` a message when the slide changes...

```html
<section data-hook='foo'>...</section>
```

```js
RevealHooks.add('foo', 'slidechanged', function () {
  console.log('slide changed');
});
```

But that's not very exciting. Let's add multiple actions at once with the `addEach` method...

```js
RevealHooks.addEach('foo', {
  'ready slideshown': function () {
    console.log('Hello!');
  },
  'slidehidden': function () {
    console.log('Goodbye!');
  }
});
```

Notice how the first action is attached to both the `ready` and `slideshown` events. That way this action will work even if the slide is the very first one shown!

(More to come!)