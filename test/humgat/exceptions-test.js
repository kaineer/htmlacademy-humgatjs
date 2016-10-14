// test/humgat/exceptions-test.js

var expect = require('chai').expect;
var ProcessExitError = require('../../lib/humgat/exceptions').ProcessExitError;

describe('ProcessExitError', function() {
  var error, unknownError;

  beforeEach(function() {
    error = new ProcessExitError(42, "I've got my reason");
    unknownError = new ProcessExitError(38);
  });

  it('keeps exit code', function() {
    expect(error.code).to.eq(42);
    expect(unknownError.code).to.eq(38);
  });

  it('keeps reason', function() {
    expect(error.message).to.eq('I\'ve got my reason');
  });

  it('sets default reason', function() {
    expect(unknownError.message).to.eq('Without reason');
  });

  it('has a stack field when thrown', function() {
    try {
      throw error;
    } catch(err) {
      expect(typeof(err.stack)).not.to.eq('undefined');
    }
  });
});
