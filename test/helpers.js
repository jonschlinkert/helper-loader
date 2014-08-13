/*!
 * helper-loader <https://github.com/jonschlinkert/helper-loader>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var assert = require('assert');
var should = require('should');
var loader = require('..');
var _ = require('lodash');


describe('helper helpers', function () {

  describe('.set():', function () {
    it('should add a helper to `cache`.', function () {
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
  });

  describe('.load():', function () {
    it('should add multiple helpers to `cache`.', function () {
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

      var cache = Object.keys(helper.cache);
      cache.should.have.length(4);
    });
  });
});