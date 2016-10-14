// lib/humgat/exceptions.js

var inPhantom = (typeof(global.phantom) === 'object');

var wrapError = (inPhantom ?
  function(error) {
    Error.call(error);
  } :
  function(error) {
    Error.captureStackTrace(error, error.constructor);
  }
);

exports.ProcessExitError = function(code, message) {
  wrapError(this);

  this.code = code;
  this.message = (message || "Without reason");
};
