// lib/humgat/event-emitter.js

var slice = Array.prototype.slice;

var EventEmitter = module.exports = function(obj) {
  this.__subscriptions = {};
};

var ep = EventEmitter.prototype;

ep.on = function(name, cb, ctx) {
  if(!this.__subscriptions[name]) {
    this.__subscriptions[name] = [];
  }

  this.__subscriptions[name].push({
    callback: cb,
    ctx: ctx
  });
};

ep.off = function(name, cb) {
  if(this.__subscriptions[name]) {
    if(typeof (cb) === 'function') {
      this.__subscriptions[name] = (
        this.__subscriptions[name].filter(function(fn) {
          return fn.callback !== cb;
        })
      );
    } else {
      this.__subscriptions[name] = [];
    }
  }
};

ep.emit = function(name) {
  var callbacks = this.__subscriptions[name] || [];
  var args = slice.call(arguments, 1);

  for(var i = 0; i < callbacks.length; ++i) {
    var cb = callbacks[i];
    cb.callback.apply(cb.ctx, args);
  }
};
