// lib/humgat/wrappers/asserts.js

'use strict';

var stringify = JSON.stringify;

module.exports = function Asserts(humgat) {
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
      '' + stringify(expected) + ' === ' + stringify(actual)
    );
  };
};
