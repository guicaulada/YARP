'use strict';
/**
 * Implements a Transaction.
 * @class yarp.Transaction
 * @extends yarp.GMObject
 */
class Transaction extends yarp.GMObject {
  /**
   *Creates an instance of Transaction.
   * @param {*} type
   * @param {*} value
   * @param {*} source
   * @param {*} [target=source]
   * @param {*} [date=new Date()]
   * @memberof yarp.Transaction
   */
  constructor(
    type,
    value,
    source,
    target = source,
    date = new Date()
  ) {
    super();
    if (typeof id === 'object') {
      let {
        type: type,
        value: value,
        source: source,
        target: target,
        date: date,
      } = id;
      return new yarp.Transaction(type, value, source, target, date);
    } else if ((type && value && source) != null) {
      this._id = yarp.transactions.length;
      this._type = type;
      this._value = value;
      this._source = source;
      this._target = target;
      this._date = yarp.utils.getTimestamp(date);
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Transaction;
