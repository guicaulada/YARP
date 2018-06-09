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
   * @param {*} id
   * @memberof Transaction
   */
  constructor(
    type,
    value,
    source,
    target = source,
    date = new Date(),
    id = yarp.transactions.length,
  ) {
    super();
    if (typeof type === 'object') {
      let {
        type: ntype,
        value: value,
        source: source,
        target: target,
        date: date,
        id: id,
      } = type;
      return new yarp.Transaction(ntype, value, source, target, new Date(date), id);
    } else if ((type && value && source) != null) {
      this._id = id;
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
