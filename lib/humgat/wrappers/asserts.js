// lib/humgat/wrappers/asserts.js

var Asserts = modulue.exports = function(humgat) {
  var ho = humgat;

  ho.assert = function(condition, message, reason) {
    var results = this.results;

    if(condition) {
      results.addSuccess(message);
    } else {
      results.addFailure(message, reason);
    }
  };

  ho.assertEqual = function(expected, actual, message) {
    this.assert(
      expected === actual,
      message,
      '' + expected + ' === ' + actual
    );
  };
};
