'use strict';
/**
 * @file Gamemode Object class
 */
module.exports = class GMObject{
  constructor() {
    if (this.constructor === GMObject) {
      throw new TypeError('Abstract class GMObject cannot be instantiated directly.');
    }
  }

  save(){
    yarp.dbm.save(this);
  }

  remove(){
    if (this.mp) this.mp.destroy();
    yarp.dbm.remove(this);
  }

  get data() {
    let data = {};
    for (let key of Object.keys(this)) {
      if (key[0] == '_') {
        data[key] = this[key];
      }
    }
    return data;
  }

  get call(){
    return (eval(this._call));
  }

  set call(value) {
    this._call = value;
  }

  get enter() {
    return (eval(this._enter))
  }

  set enter(value) {
    this._enter = value;
  }

  get leave() {
    return (eval(this._leave))
  }

  set leave(value) {
    this._leave = value;
  }

  makeGetterSetter(){
    for (let key in this){
      if (key[0] == '_'){
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
