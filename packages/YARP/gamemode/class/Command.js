'use strict';
/**
 * @file Command class
 */
module.exports = class Command{
  constructor(_id,category,hint,cb){
    if ((typeof _id) === 'object' || (_id && hint && category && cb) != null){
      this._id = _id._id || _id;
      this.category = _id.category || category;
      this.hint = _id.hint || hint;
      this.cb = _id.cb || cb;
    }
  }

  static load(){
    return yarp.mng.load(Command);
  }
  save(){
    yarp.mng.save(this);
  }
}
