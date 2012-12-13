expect = require 'expect.js'
assert = require 'assert'
sinon  = require 'sinon'
Base   = require '../lib/Base'

describe 'Base', ->

  describe '#extend()', ->

    beforeEach ->
      @fn = ->
      Base.extend @fn

    it 'will add a #super_ property to a child', ->
      expect(@fn.super_).not.to.be undefined

    it 'will add the Base constructor as a child\'s #super_ property', ->
      expect(@fn.super_).to.be Base

    it 'will add the Base\'s prototype to a child', ->
      expect(@fn.prototype.super).to.be Base::super

    it 'will extend any parent on to a child', ->
      fn2 = ->
      Base.extend fn2, @fn
      expect(fn2.super_).to.be @fn

    it 'can add an object of methods to the child\'s prototype', ->

    it 'can add an object of properties to the child\'s constructor', ->

  describe '@super()', ->
    
    beforeEach ->
      @spy = Base::spy = sinon.spy()

      Fn  = ->
      Fn2 = ->

      Base.extend Fn

      Fn::spy2 = -> @super 'spy', arguments

      Base.extend Fn2, Fn

      @obj  = new Fn()
      @obj2 = new Fn2

    it 'will call the #super_\'s constructor when no arguments are passed', ->
      @obj.constructor.super_ = sinon.spy()
      @obj.super()
      assert @obj.constructor.super_.calledWith()

    it 'will call the #super_\'s method when a string is passed', ->
      @obj.super 'spy'
      assert @spy.calledWith()
      @obj.super 'spy', 'test', 'parameters'
      assert @spy.calledWith 'test', 'parameters'

    it 'can be used in the parent as well', ->
      @obj2.super 'spy2'
      assert @spy.calledWith()
      @obj2.super 'spy2', 'test', 'parameters'
      assert @spy.calledWith 'test', 'parameters'

