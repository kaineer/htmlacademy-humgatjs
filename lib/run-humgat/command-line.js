// lib/commander/command-line.js

'use strict';

var path = require('path');
var execSync = require('child_process').execSync;

var CommandLine = module.exports = function(program) {
  this.program = program;
};

Object.assign(CommandLine.prototype, {
  getBinaryPath: function() {
    var program = this.program;

    return (
      program.binaryPath ||
      (program.binaryPath = execSync('which phantomjs'))
    );
  },

  getIndexPath: function() {
    return path.resolve(
      path.join(__dirname, '/../index.js')
    );
  },

  getScriptPath: function() {
    return path.resolve(this.program.scriptPath);
  },

  isOk: function() {
    return (
      this.getBinaryPath() && this.getIndexPath() && this.getScriptPath()
    );
  },

  toString: function() {
    return [
      this.getBinaryPath(), this.getIndexPath(), this.getScriptPath()
    ].join(' ');
  }
});
