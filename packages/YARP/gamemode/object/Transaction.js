'use strict';
/**
 * @file Item class
 */
module.exports = class Transaction extends yarp.gmo{
  constructor(type,value,source,target,date){
    super();
    if ((typeof id) === 'object' || (type && value && source) != null) {
      this._id = id._id || id || yarp.transactions.length;
      this._type = id._type || type;
      this._value = id._value || value;
      this._source = id._source || source;
      this._target = id._target || target || source;
      this._date = id._date || date || yarp.utils.getTimestamp(date);
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }
}
