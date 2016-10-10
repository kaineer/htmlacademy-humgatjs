// lib/humgat/wrappers/asserts.js

'use strict';

var stringify = JSON.stringify;

var Asserts = module.exports = function(humgat) {
  this.humgat = humgat;
  this.results = humgat.results;

  // Delegation
  this.humgat.assert = this.assert.bind(this);
  this.humgat.assertEqual = this.assertEqual.bind(this);
};

var ap = Asserts.prototype;

ap.assert = function(condition, message, reason) {
  var results = this.results;

  if(condition) {
    results.addSuccess(message);
  } else {
    results.addFailure(message, reason);
  }
};

ap.assertEqual = function(expected, actual, message) {
  this.assert(
    expected === actual,
    message,
    '' + stringify(expected) + ' === ' + stringify(actual)
  );
};
