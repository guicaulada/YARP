'use strict';
/**
 * @file Command class
 */
module.exports = class Command{
  constructor(id,category,hint,call){
    if ((typeof id) === 'object' || (id && category && hint && call) != null){
      this._id = id._id || id;
      this._category = id._category || category;
      this._hint = id._hint || hint;
      this._call = id._call || ((call) ? call.toString() : false);
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Command);
  }


  static config(file){
    let commands = require(file);
    for (let category in commands){
      for (let id in commands[category]){
        let command = commands[category][id];
        new yarp.Command(id,category,command.hint,command.call.toString());
      }
    }
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
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
