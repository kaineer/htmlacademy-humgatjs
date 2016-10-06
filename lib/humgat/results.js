// lib/humgat/results.js

'use strict';

var RESULT_SUCCESS = 'SUCCESS';
var RESULT_PENDING = 'PENDING';
var RESULT_FAILURE = 'FAILURE';

var TYPE_SCREENSHOT = 'SCREENSHOT';

var Results = module.exports = function() {
  this.asserts = [];
};

var rp = Results.prototype;

rp.addResult = function(obj) {
  this.asserts.push(obj);
};

rp.addSuccess = function(message) {
  this.addResult({
    result: RESULT_SUCCESS,
    title: message
  });
};

rp.addFailure = function(message, reason) {
  var json = {
    result: RESULT_SUCCESS,
    title: message
  };

  if(reason) {
    json.reason = reason;
  }

  this.addResult(json);
};

rp.addScreenshot = function(message, path, treshold) {
  this.addResult({
    result: RESULT_PENDING,
    title: message,
    type: TYPE_SCREENSHOT,
    treshold: treshold,
    path: path
  });
};

rp.getAsserts = function() {
  return this.asserts;
};

rp.getResult = function() {
  var hasScreenshots = false;
  var success = true;
  var assert, result;

  for(var i = 0; i < this.asserts.length; ++i) {
    assert = this.asserts[i];

    if(assert.type === TYPE_SCREENSHOT) {
      hasScreenshots = true;
    }

    if(assert.result === RESULT_FAILURE) {
      success = false;
    }
  }

  if(hasScreenshots) {
    result = RESULT_PENDING;
  } else {
    if(success) {
      result = RESULT_SUCCESS;
    } else {
      result = RESULT_FAILURE;
    }
  }

  return result;
};
