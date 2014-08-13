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

    it('should set helpers when the name is defined as a string:', function () {
      var helpers = loader();
      helpers.set('a', function (str) {
      	return str;
      });

      var a = helpers.get('a');
      assert.equal(typeof a, 'function');
    });

    it('should allow multiple helpers to be defined:', function () {
      var helpers = loader();

      helpers.set('a', function (str) {
      	return str;
      });

      helpers.set('b', function (str) {
      	return str;
      });

      var a = helpers.get('a');
      var b = helpers.get('b');
      assert.equal(typeof a, 'function');
      assert.equal(typeof b, 'function');
    });
  });
});