// test/humgat/wrappers/assert-test.js

'use strict';

var expect = require('chai').expect;
var Asserts = require('../../../lib/humgat/wrappers/asserts');

describe('Asserts', function() {
  var obj, results, asserts;

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

    asserts = new Asserts(obj);
  });

  describe('#assert', function() {
    beforeEach(function() {
      asserts.assert(true, 'All is good');
      asserts.assert(false, 'Oh, my ears!', 'I forgot my clock');
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
      asserts.assertEqual('foo', 'bar', 'Unbelievable');
      asserts.assertEqual('baz', 'baz', 'Equality');
    });

    it('should call addSuccess when expected === actual', function() {
      expect(results.success).to.eq('Equality');
    });

    it('should call addFailure when expected !== actual', function() {
      expect(results.failure).to.eq('Unbelievable');
      expect(results.reason).to.eq('"foo" === "bar"');
    });
  });

  describe('delegation', function() {
    beforeEach(function() {
      obj.assert(true, 'Delegation works');
    });

    it('should assign to obj its assert/assertEqual methods', function() {
      expect(results.success).to.eq('Delegation works');
    });
  });
});
