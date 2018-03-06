'use strict';
/**
 * @file Item class
 */
module.exports = class Transaction{
  constructor(id,type,value,source,target,date){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.type = id.type;
      this.value = id.value;
      this.source = id.source;
      this.target = id.target;
      this.date = id.date;
    } else if ((id && type && value && source && target && date) != null) {
      this._id = id;
      this.type = type;
      this.value = value;
      this.source = source;
      this.target = target;
      this.date = yarp.utils.getTimestamp(date);
    }
  }

  save(){
    yarp.Manager.save(this);
  }
}
