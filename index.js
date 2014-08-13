'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var boson = require('boson');
var debug = require('debug')('helpers-loader');
var utils = require('./utils');
var extend = _.extend;


/**
 * ## Loader
 *
 * Create a new instance of `Loader`, optionally
 * passing default `options`.
 *
 * **Example:**
 *
 * ```js
 * var Loader = require('template-loader');
 * var templates = new Loader();
 * ```
 *
 * @class `Loader`
 * @param {Object} `options` Default options for front-matter and template naming.
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
 * Template cache
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
  loader.options = {};
  loader.cache = {};

  loader.extend(opts);
  loader.fallback('rename', utils.rename);
  loader.fallback('cwd', process.cwd());
  loader.fallback('helpers', {});
};


/**
 * Fallback on default options if
 * they are not defined by the user.
 *
 * @api private
 */

loader.fallback = function(key, value) {
  return loader.options[key] ?
    loader.option(key) :
    loader.option(key, value);
};


/**
 * Extend the options.
 *
 * @api private
 */

loader.extend = function(obj) {
  return _.extend(loader.options, obj);
};


/**
 * ## .option
 *
 * Set or get an option.
 *
 * ```js
 * loader.option('a', true)
 * loader.option('a')
 * // => true
 * ```
 *
 * @method option
 * @param {String} `key`
 * @param {*} `value`
 * @return {*}
 * @api public
 */

loader.option = function(key, value) {
  var args = [].slice.call(arguments);

  if (args.length === 1 && typeof key === 'string') {
    return loader.options[key];
  }

  if (typeof key === 'object') {
    _.extend.apply(_, [loader.options].concat(args));
    return loader;
  }

  loader.options[key] = value;
  return loader;
};


/**
 * Resolve and load helpers defined on the config.
 *
 * @param  {Object} `options`
 * @return {[type]}
 */

loader.load = function (value) {
  var args = [].slice.call(arguments);
  debug('helpers', arguments);

  if (!value) {
    return value;
  }

  var method = loader[utils.typeOf(value)];
  if (method) {
    return method.apply(loader, args);
  }
  return {};
};


/**
 * Set templates on the cache.
 *
 * @param  {String} `name` Template name
 * @param  {String} `str` String to parse.
 * @param  {Object} `options` loader options
 * @api public
 */

loader.set = function (name, str, options) {
  var o = {};
  if (utils.typeOf(str) === 'string') {
    o[name] = {
      content: str
    };
  } else {
    o[name] = str;
  }
  loader.object(o, options);
  return loader;
};


/**
 * Get a template from the cache.
 *
 * @param  {String} `key` The name of the template to get.
 * @api public
 */

loader.get = function (key) {
  if (!key) {
    return loader.cache;
  }
  return loader.cache[key];
};


/**
 * Resolve the `name`d npm module name, filepath or glob pattern, passing
 * the results to `loader.load()`.
 *
 * @method `string`
 * @param {String} `name` NPM module name, file path or glob pattern to resolve.
 * @return {Object} object of key/value helper pairs.
 * @api private
 */

loader.string = function (str) {
  var resolved = boson(str);
  var o = {};

  resolved.forEach(function (filepath) {
    try {
      var helper = require(filepath);
      if (utils.typeOf(helper) === 'object') {
        extend(o, helper);
      } else {
        extend(o, loader.load(helper));
      }
    } catch(err) {
      return err;
    }
  });

  _.extend.apply(_, [loader.cache].concat(o));
  return o;
};


/**
 * noop, just return the `helper` object.
 *
 * @method `object`
 * @param {Object} `helper` A helper object.
 * @param {Object} object of key/value helper pairs.
 * @api private
 */

loader.object = function (helper) {
	_.extend.apply(_, [loader.cache].concat(helper));
  return helper;
};


/**
 * Execute the function and if the result is an Object, return that
 * Otherwise pass the results back through `helpers`
 *
 * @method `function`
 * @param {Function} `fn`
 * @return {Object} object of key/value helper pairs.
 * @api private
 */

loader.function = function (fn) {
  var helper = fn.call();
  if (utils.typeOf(helper) === 'object') {
    return helper;
  }
  return loader.load(helper);
};


/**
 * Loop over the array and call `helpers` for each item.
 *
 * @method `array`
 * @param {Array} `arr`
 * @return {Object} object of key/value helper pairs.
 * @api private
 */

loader.array = function (arr) {
  var o = {};
  _.unique(arr).forEach(function (helper) {
    extend(o, loader.load(helper));
  });
  _.extend.apply(_, [loader.cache].concat(o));
  return o;
};


/**
 * Export `helpers`
 */

module.exports = loader;
