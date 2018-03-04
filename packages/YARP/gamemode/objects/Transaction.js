'use strict';
/**
 * @file Item class
 */
module.exports = class Transaction{
  constructor(id,type,value,source,target,date){
    this._id = id;
    this.type = type;
    this.value = value;
    this.source = source;
    this.target = target;
    this.date = yarp.utils.getTimestamp(date);
  }
}
