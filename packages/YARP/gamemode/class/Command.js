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
      this.cb = _id.cb || cb.toString();
    }
  }

  static load(){
    return yarp.dbm.load(Command);
  }

  static get categories(){
    let res = {};
    for (let k in yarp.commands){
      let cmd = yarp.commands[k];
      if (!res[cmd.category]){
        res[cmd.category] = [];
      }
      res[cmd.category].push(cmd._id);
    }
    return res;
  }

  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
}
