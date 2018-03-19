'use strict';
/**
 * @file Npc class
 */
module.exports = class Npc{
  constructor(id,model,position,heading,despawn,drawDistance,visible,call){
    if ((typeof id) === 'object' || (id && model && position) != null){
      this._id = id._id || id;
      this._model = id._model || model;
      this._position = id._position || position;
      this._heading = id._heading || heading || 0;
      this._drawDistance = id._drawDistance || drawDistance || 100;
      this._visible = id._visible || visible || true;
      this._call = id._call || ((call) ? call.toString() : false);
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Npc);
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
