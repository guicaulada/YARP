'use strict';
/**
 * @file Command class
 */
module.exports = class Command{
  constructor(id,call,category,hint){
    if ((typeof id) === 'object' || (id && call) != null){
      this._id = id._id || id;
      this._category = id._category || category || "None";
      this._hint = id._hint || hint || "There's no hint.";
      this._call = id._call || ((call) ? call.toString() : false);
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let commands = require(file);
    for (let category in commands){
      for (let id in commands[category]){
        let command = commands[category][id];
        new yarp.Command(id,command.call,category,command.hint);
      }
    }
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
