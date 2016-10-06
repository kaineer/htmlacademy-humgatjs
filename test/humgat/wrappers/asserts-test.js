// test/humgat/wrappers/assert-test.js

'use strict';

var expect = require('chai').expect;
var mixinAsserts = require('../../../lib/humgat/wrappers/asserts');

describe('Asserts', function() {
  var obj, results;

  beforeEach(function() {
    results = {
      addSuccess: function(message) {
        this.success = message;
      },
      addFailure: function(message, reason) {
        this.failure = message;
        this.reason = reason;
      }
    };

    obj = {
      results: results
    };

    mixinAsserts(obj);
  });

  describe('#assert', function() {
    beforeEach(function() {
      obj.assert(true, 'All is good');
      obj.assert(false, 'Oh, my ears!', 'I forgot my clock');
    });

    it('should call addSuccess when condition is met', function() {
      expect(results.success).to.eq('All is good');
    });

    it('should call addFailure when condition is not met', function() {
      expect(results.failure).to.eq('Oh, my ears!');
      expect(results.reason).to.eq('I forgot my clock');
    });
  });

  describe('#assertEqual', function() {
    beforeEach(function() {
      obj.assertEqual('foo', 'bar', 'Unbelievable');
      obj.assertEqual('baz', 'baz', 'Equality');
    });

    it('should call addSuccess when expected === actual', function() {
      expect(results.success).to.eq('Equality');
    });

    it('should call addFailure when expected !== actual', function() {
      expect(results.failure).to.eq('Unbelievable');
      expect(results.reason).to.eq('"foo" === "bar"');
    });
  });
});
