# helper-loader [![NPM version](https://badge.fury.io/js/helper-loader.png)](http://badge.fury.io/js/helper-loader)

> Load helpers from file paths, globs or objects, and cache them as normalized objects.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i helper-loader --save-dev
```

## Usage

```js
var Loader = require('helper-loader');
var helpers = new Loader();
```

## API
### Loader

Create a new instance of `Loader`, optionally
passing default `options`.

**Example:**

```js
var Loader = require('helper-loader');
var helpers = new Loader();
```

* `options` {Object}: Default options for front-matter and helper naming.


Options cache



Template cache



### .option

Set or get an option.

```js
loader.option('a', true)
loader.option('a')
// => true
```

* `key` {String}
* `value` {*}
* `return` {*}


Parse files and extract front matter.

* `str` {String}: String to parse.
* `options` {Object}: Options to pass to [gray-matter].


Set helpers on the cache.

* `name` {String}: Template name
* `str` {String}: String to parse.
* `options` {Object}: loader options


Get a helper from the cache.

* `key` {String}: The name of the helper to get.


Normalize and flatten `locals` and `data` objects.

* `obj` {Object}: The object to normalize.
* `return` {Object}


Resolve, load, and parse all files based on type.

* `pattern` {*}: Array, object, function or string.
* `options` {Object}: loader options.
* `return` {Array}  Array of file objects.


Resolve files paths and require them in, calling `.load()`
for futher processing.

* `pattern` {String}: Glob patterns or file paths.
* `options` {Object}: loader options.
* `return` {Object}


Normalize a helper object.

* `obj` {Object}: The object to normalize.
* `options` {Object}: Locals or loader options.


Load multiple helper objects.

* `objects` {Object}: Template objects.
* `options` {Object}: loader options.


Call `load` for each item in the array.

* `patterns` {Object}: Glob patterns or array of filepaths.
* `options` {Object}: Additional options to pass
* `return` {Array}  a list of files as Vinyl objects


Call the function and pass the results to
`load` for futher processing.

* `fn` {Function}: Function to call.
* `locals` {Object}: Locals or loader options.
* `return` {*}


Resolve modules by `name` and require them. `name` can
be a module name, filepath or glob pattern.

* `name` {String}: npm module name, file path or glob pattern to resolve
* `options` {Object}: Options to pass to [resolve-dep].


Call the function and pass the results to
`load` for futher processing.

* `fn` {Function}: Function to call.
* `locals` {Object}: Locals or loader options.
* `return` {*}


Call the function and pass the results to
`load` for futher processing.

* `fn` {Function}: Function to call.
* `locals` {Object}: Locals or loader options.
* `return` {*}


Export `Loader`

### .set

```js
helpers.set(object, [locals]);
```

### .setFile

**Params:**

* `filepath`
* `locals`


```js
helpers.setFile(glob, [locals]);
```

### .load

```js
helpers.load([helper], [locals]);
```

**Params:**

* `helper`: **{String|Array|Object}**
* `locals`: **{Object}**
* `return`: **{Object}** Returns an object with `data`, `content`, `original` and `locals` properties.

#### helper formats

**Object**

**String**

**Array**




## Examples

```js
helpers.load('a/b/*.tmpl');
helpers.load(['a/b*.tmpl', 'c/d*.tmpl']);
helpers.load(['a/b*.tmpl', 'c/d*.tmpl'], {a: 'b'});
helpers.load({a: {data: {}, content: ''}});
helpers.load({a: {data: {}, content: ''}}, {a: 'b'});
```




## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 12, 2014._