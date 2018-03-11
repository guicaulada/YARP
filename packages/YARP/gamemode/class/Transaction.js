'use strict';
/**
 * @file Item class
 */
module.exports = class Transaction{
  constructor(_id,type,value,source,target,date){
    if ((typeof _id) === 'object' || (_id && type && value && source && target && date) != null) {
      this._id = _id._id || _id;
      this.type = _id.type || type;
      this.value = _id.value || value;
      this.source = _id.source || source;
      this.target = _id.target || target;
      this.date = _id.date || date || yarp.utils.getTimestamp(date);
    }
  }

  static load(){
    return yarp.mng.load(Transaction);
  }
  save(){
    yarp.mng.save(this);
  }
}
