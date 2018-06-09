'use strict';
/**
 * Implements a Variable.
 * @class yarp.Variable
 * @extends yarp.GMObject
 */
class Variable extends yarp.GMObject {
  /**
   *Creates an instance of Variable.
   * @param {*} id
   * @param {*} value
   * @memberof yarp.Variable
   */
  constructor(id, value) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        value: value,
      } = id;
      return new yarp.Variable(nid, value);
    } else if ((id && value) != null) {
      this._id = id;
      this._value = value;
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Variable;
