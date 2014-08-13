/*!
 * helper-loader <https://github.com/jonschlinkert/helper-loader>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT)
 */

var assert = require('assert');
var should = require('should');
var loader = require('..');


describe('helper load:', function () {
  describe('.load():', function () {

    it('should load required helpers:', function () {
      var helpers = loader();

      helpers.load(require('./fixtures/obj/a.js'));

      helpers.load(require('node-foo'));
      helpers.load(require('node-bar'));
      helpers.load(require('node-baz')({}));

      var a = helpers.get('a');
      var foo = helpers.get('foo_aaa');
      var bar = helpers.get('bar_aaa');
      var baz = helpers.get('baz_aaa');

      assert.equal(typeof a, 'function');
      assert.equal(typeof foo, 'function');
      assert.equal(typeof bar, 'function');
      assert.equal(typeof baz, 'function');
    });

    it('should load helpers defined as an object:', function () {
      var helpers = loader();
      helpers.load({
      	a: function (str) {
	      	return str;
	      }
      });

      var a = helpers.get('a');
      assert.equal(typeof a, 'function');
    });

    it('should load multiple helpers defined as objects.', function () {
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

    it('should load an array of helpers.', function () {
      var helper = loader();
      helper.load([{
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
      }]);

      var cache = Object.keys(helper.cache);
      cache.should.have.length(4);
    });

    it('should load helper objects defined as file paths:', function () {
      var helpers = loader();
      helpers.load('test/fixtures/obj/a.js');

      var a = helpers.get('a');
      assert.equal(typeof a, 'function');
    });

    it('should load helper objects defined as an array of file paths:', function () {
      var helpers = loader();
      helpers.load(['test/fixtures/obj/a.js', 'test/fixtures/obj/b.js', 'test/fixtures/obj/c.js']);

      var a = helpers.get('a');
      var b = helpers.get('b');
      var c = helpers.get('c');

      assert.equal(typeof a, 'function');
      assert.equal(typeof b, 'function');
      assert.equal(typeof c, 'function');
    });

    it('should load helper objects defined as an array of glob patterns:', function () {
      var helpers = loader();
      helpers.load(['test/fixtures/obj/*.js']);

      var a = helpers.get('a');
      var b = helpers.get('b');
      var c = helpers.get('c');

      assert.equal(typeof a, 'function');
      assert.equal(typeof b, 'function');
      assert.equal(typeof c, 'function');
    });

    it('should load helper objects defined as a string of glob patterns:', function () {
      var helpers = loader();
      helpers.load('test/fixtures/obj/*.js');

      var a = helpers.get('a');
      var b = helpers.get('b');
      var c = helpers.get('c');

      assert.equal(typeof a, 'function');
      assert.equal(typeof b, 'function');
      assert.equal(typeof c, 'function');
    });

    it('should return wrapped helpers.', function () {
      var helpers = loader();
      helpers.load(__dirname + '/fixtures/wrapped/*.js');

      var a = helpers.get('wrapped');
      assert.equal(typeof a, 'function');
    });

  });

});
