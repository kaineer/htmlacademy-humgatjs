// lib/run-humgat.js

'use strict';

var fs = require('fs');
var path = require('path');
var CommandLine = require('./run-humgat/command-line');

var spawn = require('child_process').spawn;

var setup = function(program, argv) {
  program.setVerbose = function() {
    program.verbose = true;
  };

  program.setDryRun = function() {
    program.dryRun = true;
  };

  program.setBinaryPath = function(_path) {
    try {
      if(fs.statSync(_path)) {
        program.binaryPath = _path;
      }
    } catch(err) {
      console.log('Binary path `' + path + '` could not be found');
      console.log(err.stack.toString());
    }
  };

  program
    .option('-V, --verbose', 'Output everything', program.setVerbose, true)
    .option('-B, --binary [path]', 'Phantomjs binary path', program.setBinaryPath)
    .option('-T, --dry', 'Dry run', program.setDryRun)
    .arguments('<path>')
    .action(function(scriptPath) {
      program.scriptPath = scriptPath;
    })
    .parse(argv);
};

module.exports = function runHumgat(argv) {
  var program = require('commander');
  var cmdLine = new CommandLine(program);

  setup(program, argv);

  if(cmdLine.isOk()) {
    if(program.verbose) {
      console.log('> ' + cmdLine.toString());
    }

    if(!program.dryRun) {
      spawn(
        cmdLine.getBinaryPath(), [
          cmdLine.getIndexPath(),
          cmdLine.getScriptPath()
        ]
      );
    }
  }
};
