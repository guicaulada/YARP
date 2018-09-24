'use strict';
/**
 * Implements a Variable.
 * @class Variable
 */
class Variable extends yarp.Object {
  /**
   * Creates an instance of Variable.
   * @extends {yarp.Object}
   * @param {Object} params
   * @param {String} params.id
   * @param {*} params.value
   * @memberof Variable
   */
  constructor(params) {
    super();
    if ((params.id && params.value) != null) {
      this._id = params.id;
      this._value = params.value;
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Variable class requires id and value to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Variable;
