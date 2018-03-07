'use strict';
/**
 * @file Command class
 */
module.exports = class Command{
  constructor(id,category,hint,cb){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.category = id.category;
      this.hint = id.hint;
      this.cb = id.cb;
    } else if ((id && hint && category && cb) != null){
      this._id = id;
      this.category = category;
      this.hint = hint;
      this.cb = cb;
    }
  }

  static load(){
    return yarp.Manager.load(Command);
  }
  save(){
    yarp.Manager.save(this);
    mp.events.addCommand(this._id, eval(this.cb));
  }
}
