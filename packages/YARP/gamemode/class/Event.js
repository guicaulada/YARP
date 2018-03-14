'use strict';
/**
 * @file Event class
 */
module.exports = class Event{
  constructor(_id,cb){
    if ((typeof _id) === 'object' || (_id && cb) != null) {
      this._id = _id._id || _id;
      this.cb = _id.cb || cb;
    }
  }

  static load(){
    return yarp.dbm.load(Event);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
}
