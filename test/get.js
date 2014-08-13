/*!
 * helper-loader <https://github.com/jonschlinkert/helper-loader>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT)
 */

var assert = require('assert');
var should = require('should');
var loader = require('..');


describe('helper get:', function () {
  describe('.get():', function () {
    it('should get a `set` helper to `cache`.', function () {
      var helper = loader();

      helper.set('a', function (str) {
      	return str;
      });
      helper.set('b', function (str) {
      	return str;
      });

      var cache = Object.keys(helper.cache);
      cache.should.have.length(2);
    });

    it('should get `load`ed helpers from the cache', function () {
      var helper = loader();

      helper.load({
        a: function (str) {
        	return str;
        },
        b: function (str) {
        	return str;
        },
        c: function (str) {
        	return str;
        },
        d: function (str) {
        	return str;
        }
      });
      var a = helper.get('a');
      var b = helper.get('b');

      assert.equal(typeof a, 'function');
      assert.equal(typeof b, 'function');
    });
  });
});