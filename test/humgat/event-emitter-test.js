// test/humgat/event-emitter-test.js

var expect = require('chai').expect;
var EventEmitter = require('../../lib/humgat/event-emitter');

describe('EventEmitter', function() {
  var emitter, obj;

  beforeEach(function() {
    obj = {};
    emitter = new EventEmitter(obj);
  });

  it('responds to on', function() {
    expect(emitter).to.respondTo('on');
  });

  it('responds to off', function() {
    expect(emitter).to.respondTo('off');
  });

  it('responds to emit', function() {
    expect(emitter).to.respondTo('emit');
  });

  describe('on/off/emit', function() {
    var target, callback;

    beforeEach(function() {
      target = {};
      callback = function(value) {
        target.hello = value || 'world';
      };
    });

    context('`on` without context and arguments', function() {
      beforeEach(function() {
        emitter.on('hello', callback);
        emitter.emit('hello');
      });

      it('runs callback', function() {
        expect(target.hello).to.eq('world');
      });
    });

    context('`on` without context, with argument', function() {
      beforeEach(function() {
        emitter.on('hello', callback);
        emitter.emit('hello', 'Pete');
      });

      it('runs callback with specified argument', function() {
        expect(target.hello).to.eq('Pete');
      });
    });

    context('`off` without callback', function() {
      beforeEach(function() {
        emitter.on('hello', callback);
        emitter.off('hello');
        emitter.emit('hello');
      });

      it('does not run callback', function() {
        expect(target.hello).to.be.an('undefined');
      });
    });

    context('`off` with callback', function() {
      beforeEach(function() {
        emitter.on('hello', callback);
        emitter.off('hello', callback);
        emitter.emit('hello');
      });

      it('does not run callback', function() {
        expect(target.hello).to.be.an('undefined');
      });
    });
  });

});
