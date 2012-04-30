ICanHandlebarz.js
=================

A simple/powerful approach for doing client-side templating, combining the simplicity of [ICanHaz.js](http://icanhazjs.com/) with [Handlebars.js](http://handlebarsjs.com/).

ICanHandlebarz.js and ICanHandlebarz.min.js includes wycats's [Handlebars.js](https://github.com/wycats/handlebars.js/).

ICanHandlebarz-no-handlebars.js and ICanHandlebarz-no-handlebars.min.js does not include Handlebars.js. You have to include  yourself in your page.

ICanHandlebarz depends on jquery or zepto.

Writing templates
=================

Add your templates as:

``` html
<script id="helloWorld" type="text/html">
  Hello {{name}} ! <br />
  {{> helloWorldPartial}}
</script>
```

And your partials as:

``` html
<script id="helloWorldPartial" type="text/html" class="partial">
  Bye bye {{name}} !
</script>
```

Executing templates
===================

ICH will grab the templates (in the < scripts > tags with text/html) and it will compile all the templates to simple javascript functions. The function has one parameter the view and returns a jquery (or zepto) object, so you can do: 

```javascript
ich.helloWorld({name: "jose"})
	.appendTo("#my-container");

```

will append to an element with id "my-container" this:

```html
	hello jose ! <br /> Bye bye jose !
```

each compiled function has a helper to use with an array:


```javascript
ich.helloWorld.each([{name: "jose"}, {name: "juan"}])
	.appendTo("#my-container");

```

will append to an element with id "my-container" this:


```html
	hello jose ! <br /> Bye bye jose !
	hello juan ! <br /> Bye bye juan !
```

License
=======

This is a fork of [Mitchell Johnson's ICanHandleBarz](https://github.com/atomicobject/ICanHandlebarz.js) and is licensed under MIT.