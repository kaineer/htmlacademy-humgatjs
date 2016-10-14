// test/humgat/results-test.js

'use strict';

var expect = require('chai').expect;
var Results = require('../../lib/humgat/results');

describe('Results', function() {
  var results;

  beforeEach(function() {
    results = new Results();
  });

  it('should be ok', function() {
    expect(results).to.be.ok;
  });

  it('should have addResult method', function() {
    expect(results).to.respondTo('addResult');
  });

  it('should have addSuccess method', function() {
    expect(results).to.respondTo('addSuccess');
  });

  it('should have addFailure method', function() {
    expect(results).to.respondTo('addFailure');
  });

  describe('#addResult', function() {
    beforeEach(function() {
      results.addResult({title: 'Hello, results', result: 'SUCCESS'});
    });

    it('should keep it in asserts field', function() {
      expect(results.asJSON()).to.deep.eq({
        result: 'SUCCESS',
        asserts: [{
          title: 'Hello, results',
          result: 'SUCCESS'
        }]
      });
    });
  });

  describe('#addSuccess', function() {
    beforeEach(function() {
      results.addSuccess('Hello, success');
    });

    it('should keep it in asserts field with SUCCESS result', function() {
      expect(results.asJSON()).to.deep.eq({
        result: 'SUCCESS',
        asserts: [{
          title: 'Hello, success',
          result: 'SUCCESS'
        }]
      });
    });
  });

  describe('#addFailure', function() {
    beforeEach(function() {
      results.addFailure('Hello, failure', 'So much pain');
    });

    it('should keep it in asserts field with FAILURE result', function() {
      expect(results.asJSON()).to.deep.eq({
        result: 'FAILURE',
        asserts: [{
          title: 'Hello, failure',
          result: 'FAILURE',
          reason: 'So much pain'
        }]
      });
    });
  });
});
