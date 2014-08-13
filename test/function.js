/*!
 * helper-loader <https://github.com/jonschlinkert/helper-loader>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT)
 */

var assert = require('assert');
var should = require('should');
var loader = require('..');


describe('load functions:', function () {
  describe('.function():', function () {
    it('should load helpers from a function', function () {
      var helpers = loader();

      var fn = function () {
        return {
          foo: function () {
            return 'foo';
          },
          bar: function () {
            return 'bar';
          }
        };
      };

      var actual = helpers.load(fn);

      actual.cache.should.have.property('foo');
      actual.cache.should.have.property('bar');

      var foo = helpers.get('foo');
      assert.equal(typeof foo, 'function');
    });
  });
});