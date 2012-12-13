util = require 'util'
_    = require 'underscore'

class Base

  super: (method)->
    super_ = @constructor.super_
    
    throw new Error 'Does not have a super class' unless super_

    unless _(method).isString()
      args   = if _(method).isArguments() then method else arguments
      method = super_
    else
      method = super_::[method]
      args   = Array::slice.call arguments, 1
      args   = args[0] if _(args[0]).isArguments()

    @constructor.super_ = super_.super_
    val = method.apply this, args
    @constructor.super_ = super_

    val

  @extend: (child, parent, proto, clsProps)->
    unless _(parent).isFunction()
      clsProps = proto
      proto    = parent
      parent   = Base

    proto    = {} unless _(proto).isObject()
    clsProps = {} unless _(clsProps).isObject()

    util.inherits(child, parent)
    _(child.prototype).extend proto
    _(child).extend clsProps

    child

module.exports = Base

