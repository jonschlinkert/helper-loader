'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var boson = require('boson');
var debug = require('debug')('helpers-loader');
var extend = _.extend;


/**
 * Create a new instance of `Loader`, optionally
 * passing default `options`.
 *
 * **Example:**
 *
 * ```js
 * var Loader = require('helper-loader');
 * var helpers = new Loader();
 * ```
 *
 * @class `Loader`
 * @param {Object} `options` Default options for front-matter and helper naming.
 * @api public
 */

function loader(options) {
  loader.init(options);
  return loader;
}


/**
 * Options cache
 *
 * @type {Object}
 */

loader.options = {};


/**
 * Helper cache
 *
 * @type {Object}
 */

loader.cache = {};


/**
 * Initialize default configuration.
 *
 * @api private
 */

loader.init = function(opts) {
  debug('init', arguments);
  this.options = opts || {};
  this.cache = {};
};


/**
 * Set or get an option.
 *
 * ```js
 * loader.option('a', true)
 * loader.option('a')
 * // => true
 * ```
 *
 * @method option
 * @param {String} `key` The name of the option.
 * @param {*} `value` The value to assign.
 * @return {*}
 * @api public
 */

loader.option = function(key, value) {
  var args = [].slice.call(arguments);

  if (args.length === 1 && typeof key === 'string') {
    return this.options[key];
  }

  if (typeof key === 'object') {
    extend.apply(_, [this.options].concat(args));
    return this;
  }

  this.options[key] = value;
  return this;
};


/**
 * Resolve and load helpers onto the cache.
 *
 * ```js
 * // require a helper
 * loader.load(require('foo'));
 *
 * // Pass a string or array of file paths or glob patterns
 * loader.load('a.js');
 * loader.load(['a.js', 'b.js', 'c.js']);
 * loader.load(['*.js']);
 *
 * // pass an object
 * loader.load({
 *  a: function (str) {
 *    return str;
 *   }
 * });
 *
 * // pass an array of objects
 * helper.load([{
 *   a: function (str) {
 *    return str;
 *   },
 *   b: function (str) {
 *    return str;
 *   }
 * }]);
 * ```
 *
 * @return {Object} `loader`
 * @api public
 */

loader.load = function (value) {
  var args = [].slice.call(arguments);
  debug('helpers', arguments);

  if (!value) {
    return value;
  }

  var method = this[typeOf(value)];
  if (method) {
    return method.apply(this, args);
  }

  return this;
};


/**
 * Store a `helper` on the cache by `name`.
 *
 * ```js
 * loader.set('foo', function(str) {
 *   return str;
 * })
 * ```
 *
 * @param  {String} `name` Helper name
 * @param  {String} `helper` File path, glob pattern or object.
 * @api public
 */

loader.set = function (name, helper) {
  var o = {};
  o[name] = helper;
  this.load(o);
  return this;
};


/**
 * Get `helper` from the cache.
 *
 * ```js
 * loader.get('foo')
 * //=> [function]
 * ```
 *
 * @param  {String} `helper` The name of the helper to get.
 * @api public
 */

loader.get = function (helper) {
  if (!helper) {
    return this.cache;
  }
  return this.cache[helper];
};


/**
 * Resolve an npm module by `name`, filepath or glob pattern, passing
 * the results to `loader.load()`.
 *
 * @param {String} `name` The npm module name, file path or glob pattern to resolve.
 * @return {Object} `loader`
 * @api private
 */

loader.string = function (name, options) {
  var opts = extend({}, this.options, options);
  var helpers = boson(name, opts);
  this.load(helpers);
  return this;
};


/**
 * Extend the given object onto the `cache`.
 *
 * @method `object`
 * @param {Object} `helper` A helper object.
 * @param {Object} `loader`
 * @api private
 */

loader.object = function (helper) {
  _.extend.apply(_, [this.cache].concat(helper));
  return this;
};


/**
 * Execute the function and if the result is an Object, return that
 * Otherwise pass the results back through `helpers`
 *
 * @method `function`
 * @param {Function} `fn`
 * @return {Object} `loader`
 * @api private
 */

loader.function = function (fn) {
  var helper = fn.call();
  if (typeOf(helper) === 'object') {
    return helper;
  }
  this.load(helper);
  return this;
};


/**
 * Loop over the array and call `helpers` for each item.
 *
 * @method `array`
 * @param {Array} `arr`
 * @return {Object} `loader`
 * @api private
 */

loader.array = function (arr) {
  _.unique(arr).forEach(function (helper) {
    return loader.load(helper);
  });
  return this;
};


/**
 * Utility method
 *
 * @api private
 */

function typeOf(value) {
  return Object.prototype.toString.call(value)
    .toLowerCase()
    .replace(/\[object ([\S]+)\]/, '$1');
}



/**
 * Export `helpers`
 */

module.exports = loader;
