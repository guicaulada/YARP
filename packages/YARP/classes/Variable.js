'use strict';
/**
 * Creates a Variable.
 * @namespace yarp.Variable
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Variable id.
 * @param value - Variable value.
 */

class Variable extends yarp.GMObject{
  constructor(id,value){
    super();
    if ((id && value) != null){
      this._id = id;
      this._value = value;
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Variable
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Variable(obj._id,obj._value);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Variable
   * @param {string} file - Config file path.
   */
  static config(file){
    let variables = require(file);
    for (let id in variables){
      new Variable(id,variables[id]);
    }
  }
}

module.exports = Variable;
