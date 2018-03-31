'use strict';
/**
 * @file Variable class
 */
module.exports = class Variable extends yarp.gmo{
  constructor(id,value){
    super();
    if ((typeof id) === 'object' || (id && value) != null){
      this._id = id._id || id;
      this._value = id._value || value;
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let variables = require(file);
    for (let id in variables){
      new yarp.Variable(id,variables[id]);
    }
  }
}
