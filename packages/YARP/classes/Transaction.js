'use strict';
/**
 * Implements a Transaction.
 * @class yarp.Transaction
 * @extends yarp.Object
 */
class Transaction extends yarp.Object {
  /**
   * Creates an instance of Transaction.
   * @param {Object} params
   * @param {String} params.type
   * @param {Nuimber} params.value
   * @param {String} params.source
   * @param {String} [params.target=source]
   * @param {String} [params.date=yarp.utils.server.getTimestamp(new Date())]
   * @memberof Transaction
   */
  constructor(params) {
    super();
    if ((params.type && params.value && params.source) != null) {
      this._id = yarp.transactions.length;
      this._type = params.type;
      this._source = params.source;
      this._value = params.value;
      this._target = this.default(params.target, this._source);
      this._date = this.default(params.date, yarp.utils.server.getTimestamp(new Date()));
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Transaction class requires type, value and source to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Transaction;
