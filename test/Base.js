var expect = require('expect.js'),
    assert = require('assert'),
    sinon  = require('sinon'),
    Base   = require('../lib/Base');

describe('Base', function(){

  describe('##extend()', function(){
    
    beforeEach(function(){
      this.fn = function TestFn(){};
      Base.extend(this.fn);
    });

    it('will add a ##super_ property to a child', function(){
      expect(this.fn.super_).not.to.be(undefined);
    });

    it('will add the Base constructor as the child\'s ##super_ property', function(){
      expect(this.fn.super_).to.be(Base);
    });

    it('will add the Base\'s prototype to a child', function(){
      expect(this.fn.prototype.super).to.be(Base.prototype.super);
    });

    it('will extend and parent on to a child', function(){
      function fn2(){}
      Base.extend(fn2, this.fn);
      expect(fn2.super_).to.be(this.fn);
    });

    it('can add an object of methods to this child\'s prototype', function(){
    });

    it('can add an object of properties to the child\'s constructor', function(){
    });

  });

  describe('#super()', function(){

    beforeEach(function(){
      Base.prototype.spy = sinon.spy();

      function Fn(){};
      function Fn2(){};

      Base.extend(Fn);

      Fn.prototype.spy2 = function(){
        return this.super('spy', arguments);
      };

      Base.extend(Fn2, Fn);

      this.obj  = new Fn();
      this.obj2 = new Fn2();
    });

    it('will call the ##super_\'s constructor when no arguments are passed', function(){
      this.obj.constructor.super_ = sinon.spy();
      this.obj.super();
      assert(this.obj.constructor.super_.calledWith());
    });

    it('will call the ##super_\'s method when a string is passed', function(){
      this.obj.super('spy');
      assert(Base.prototype.spy.calledWith());
      this.obj.super('spy', 'test', 'parameters');
      assert(Base.prototype.spy.calledWith('test', 'parameters'));
    });

    it('can be used in the parent as well', function(){
      this.obj2.super('spy2');
      assert(Base.prototype.spy.calledWith());
      this.obj2.super('spy2', 'test', 'parameters');
      assert(Base.prototype.spy.calledWith('test', 'parameters'));
    });

  });

});

