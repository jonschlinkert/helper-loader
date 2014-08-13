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
      var helpers = loader();

      helpers.set('a', function (str) {
      	return str;
      });
      helpers.set('b', function (str) {
      	return str;
      });

      var cache = Object.keys(helpers.cache);
      cache.should.have.length(2);
    });
  });

  describe('.load():', function () {
    it('should add multiple helpers to `cache`.', function () {
      var helpers = loader();
      helpers.load({
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

      var cache = Object.keys(helpers.cache);
      cache.should.have.length(4);
    });
  });

  describe('helper._function()', function () {
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
      var actual = helpers._function(fn);
      helpers.cache.should.have.property('foo');
      helpers.cache.should.have.property('bar');
    });
  });

  describe('helper._array()', function () {
    it('should load different types of helpers from an array', function () {
      var helpers = loader();

      var arr = [
        'test/fixtures/two.js',
        {
          foo: function () {
            return 'hi';
          }
        },
        function () {
          return {
            foo: function () {
              return 'hi';
            }
          };
        },
        [
          'test/fixtures/three.js',
          {
            bar: function () {
              return 'hi';
            }
          },
          function () {
            return {
              bar: function () {
                return 'hi';
              }
            };
          }
        ]
      ];

      var actual = helpers._array(arr);
      helpers.cache.should.have.property('two');
      helpers.cache.should.have.property('foo');
      helpers.cache.should.have.property('three');
      helpers.cache.should.have.property('bar');
    });
  });

  describe('._string()', function () {
    it('should load helpers from a string', function () {
      var helpers = loader();

      var str = __dirname + '/fixtures/wrapped/wrapped.js';
      var actual = helpers._string(str);
      helpers.cache.should.have.property('wrapped');
    });

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
      var actual = helpers._function(fn);
      helpers.cache.should.have.property('foo');
      helpers.cache.should.have.property('bar');
    });

    it('should load helpers from an object', function () {
      var helpers = loader();

      var obj = require('./fixtures/wrapped/wrapped.js');
      var actual = helpers.load(obj);

      helpers.cache.should.have.property('wrapped');
    });

    it('should load helpers from an object', function () {
      var helpers = loader();

      var obj = {
        foo: function () {
          return 'hi';
        }
      };
      var actual = helpers._object(obj);
      helpers.cache.should.have.property('foo');
    });

    it('should load helpers from a function', function () {
      var helpers = loader();

      var fn = require('./fixtures/two.js');
      var actual = helpers.load(fn);

      helpers.cache.should.have.property('two');
    });

    it('should load different types of helpers from an array', function () {
      var helpers = loader();
      var arr = [
        'test/fixtures/two.js',
        {
          foo: function () {
            return 'hi';
          }
        },
        function () {
          return {
            foo: function () {
              return 'hi';
            }
          };
        },
        [
          'test/fixtures/three.js',
          {
            bar: function () {
              return 'hi';
            }
          },
          function () {
            return {
              bar: function () {
                return 'hi';
              }
            };
          }
        ]
      ];

      var actual = helpers._array(arr);
      helpers.cache.should.have.property('two');
      helpers.cache.should.have.property('foo');
      helpers.cache.should.have.property('three');
      helpers.cache.should.have.property('bar');
    });
  });
});
