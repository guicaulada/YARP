'use strict';
/**
 * @file Hotkey class
 */
module.exports = class Hotkey{
  constructor(id,key,call,args,hint,category){
    if ((typeof id) === 'object' || (id && key && call) != null){
      this._id = id._id || id;
      this._key = id._key || key || "NONE";
      this._category = id._category || category || "None";
      this._hint = id._hint || hint || "There's no hint.";
      this._call = id._call || ((call) ? call.toString() : null);
      this._args = id._args || args || [];
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let hotkeys = require(file);
    for (let category in hotkeys){
      for (let id in hotkeys[category]){
        let hotkey = hotkeys[category][id];
        new yarp.Hotkey(id,hotkey.key,hotkey.call,hotkey.hint,category);
      }
    }
  }

  bind(player) {
    player.call('playerBindKey',[this.id,this.key]);
  }

  unbind(player) {
    player.call('playerUnbindKey',[this.id]);
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
