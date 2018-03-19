'use strict';
/**
 * @file Event class
 */
module.exports = class Event{
  constructor(id,call){
    if ((typeof id) === 'object' || (id && call) != null) {
      this._id = id._id || id;
      this._call = id._call || ((call) ? call.toString() : "() => {}");
      this.mp = new mp.Event(this._id, eval(this._call));
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let events = require(file);
    for (let id in events){
      let event = events[id];
      new yarp.Event(id,event.call);
    }
  }

  save(){
    yarp.dbm.save(this);
  }

  remove(){
    this.mp.destroy();
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
