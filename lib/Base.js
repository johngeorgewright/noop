var util = require('util');

function isArguments(obj){
  return !!(obj && obj.hasOwnProperty('callee'));
}

function Base(){}

Base.prototype.super = function(method){
  var super_ = this.constructor.super_,
      args, val;

  if(!super_){
    throw new Error('Does not have a super class.');
  }

  if(typeof method !== 'string'){
    args   = isArguments(method) ? method : arguments;
    method = super_;
  }
  else{
    method = super_.prototype[method];
    args   = Array.prototype.slice.call(arguments, 1);

    if(isArguments(args[0])){
      args = args[0];
    }
  }

  this.constructor.super_ = super_.super_;
  val = method.apply(this, args);
  this.constructor.super_ = super_;

  return val;
};

Base.extend = function(child, parent, proto, clsProps){
  var key;

  if(typeof parent !== 'function'){
    clsProps = proto;
    proto    = parent;
    parent   = Base;
  }

  if(typeof proto !== 'object'){
    proto = {};
  }

  if(typeof clsProps !== 'object'){
    clsProps = {};
  }

  util.inherits(child, parent);
  util._extend(child.prototype, proto);
  
  for(key in clsProps){
    if(clsProps.hasOwnProperty(key)){
      child[key] = clsProps[key];
    }
  }

  return child;
};

module.exports = Base;

