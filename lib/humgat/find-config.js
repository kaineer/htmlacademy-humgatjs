// lib/humgat/find-config.js

'use strict';

var pathsToSee = [
  'tests/lib/config/index.js',
  'config.js',
  'config/index.js',
  'phantomjs/config.js',
  'phantomjs/config/index.js'
];

var fs = require('fs');

module.exports = function findConfig() {
  for(var i = 0; i < pathsToSee.length; ++i) {
    var configPath = fs.workingDirectory + fs.separator + pathsToSee[i];

    if(fs.isFile(configPath)) {
      return require(configPath);
    }
  }

  return {};
};
