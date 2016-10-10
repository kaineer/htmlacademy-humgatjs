// lib/humgat/index.js

'use strict';

var DOM = require('./dom');
var Screenshot = require('./screenshots');
var Results = require('./results');

var EventEmitter = require('./event-emitter');
var Logger = require('./utils/logger');

var mixinJsonResult = require('./wrappers/json-result');
var Asserts = require('./wrappers/asserts');

var defaultConfig = {
  screenshots: './tmp'
};

var Humgat = module.exports = function(config) {
  this.config = config || defaultConfig;

  this.results = new Results();
  this.dom = new DOM(this);
  this.screenshot = new Screenshot(this, this.config.screenshots);
  this.logger = new Logger(this.config.logger);
  this.asserts = new Asserts(this);
};

Humgat.create = function(config) {
  var humgat = new Humgat(config);

  if(config.exitWithJson) {
    // TODO: JsonResult - оборачивает humgat
    //   добавляет методы, которые позволят выходить с результатами
    //   выведенными в JSON
    mixinJsonResult(humgat);
  }

  return humgat;
};


var hp = Humgat.prototype;

hp.on = EventEmitter.on;
hp.off = EventEmitter.off;
hp.emit = EventEmitter.emit;
