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
    it('should load helpers when the name is defined as a string:', function () {
      var helpers = loader();
      helpers.load('a', function (str) {
      	return str;
      });

      var a = helpers.get('a');
      assert(typeof a, 'function');
    });

    it('should load helpers defined as an object:', function () {
      var helpers = loader();
      helpers.load({
      	a: function (str) {
	      	return str;
	      }
      });

      var a = helpers.get('a');
      assert(typeof a, 'function');
    });

    it('should load multiple helpers onto the `cache` object.', function () {
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

    it('should load helpers from arrays of file paths', function () {
      var helpers = loader();
      helpers.load(['test/fixtures/a.js', 'test/fixtures/b.js', 'test/fixtures/c.js']);

      var a = helpers.get('a');
      var b = helpers.get('b');
      var c = helpers.get('d');

      assert(typeof a, 'function');
      assert(typeof b, 'function');
      assert(typeof c, 'function');
    });

    // describe('when helper are defined as functions:', function () {

    //   it('should load multiple helpers from functions:', function () {
    //     var helpers = loader();
    //     helpers.load({a: {layout: 'b', content: 'A above\n{{body}}\nA below' }});
    //     helpers.load({b: {layout: 'c', content: 'B above\n{{body}}\nB below' }});
    //     helpers.load({c: {layout: 'd', content: 'C above\n{{body}}\nC below' }});

    //     var a = helpers.get('a');
    //     var b = helpers.get('b');
    //     var c = helpers.get('d');

    //     assert(typeof a, 'function');
    //   });

    //   it('should load helpers from strings', function () {
    //     var helpers = loader();
    //     helpers.load('a', 'A above\n{{body}}\nA below', {layout: 'b'});
    //     helpers.load('b', 'B above\n{{body}}\nB below', {layout: 'c'});
    //     helpers.load('c', 'C above\n{{body}}\nC below', {layout: 'd'});

    //     var a = helpers.get('a');
    //     var b = helpers.get('b');
    //     var c = helpers.get('d');
    //     assert(typeof a, 'function');
    //     assert(typeof b, 'function');
    //     assert(typeof c, 'function');
    //   });

    //   it('should load helpers from file paths', function () {
    //     var helpers = loader();
    //     helpers.load('test/fixtures/a.tmpl', {layout: 'b'});
    //     var a = helpers.get('a');
    //     assert(typeof a, 'function');
    //   });


    //   it('should load helpers from globs', function () {
    //     var helpers = loader();
    //     helpers.load('test/fixtures/*.tmpl');

    //     helpers.cache.should.have.property('a');
    //     helpers.cache.should.have.property('b');
    //     helpers.cache.should.have.property('c');
    //     helpers.cache.should.have.property('d');
    //     helpers.cache.should.have.property('e');
    //     helpers.cache.should.have.property('f');
    //   });

    //   it('should load helpers from arrays of globs', function () {
    //     var helpers = loader();
    //     helpers.load(['test/**/*.md', 'test/**/*.tmpl']);

    //     helpers.cache.should.have.property('a');
    //     helpers.cache.should.have.property('b');
    //     helpers.cache.should.have.property('c');
    //     helpers.cache.should.have.property('d');
    //     helpers.cache.should.have.property('e');
    //     helpers.cache.should.have.property('f');
    //   });

    // });
  });
});
