'use strict';
/**
 * @file Weapon class
 */
module.exports = class Weapon{
  constructor(id,name,category,weight,model,bone,position,rotation){
    if ((typeof id) === 'object' || (id && name && category && weight) != null) {
      this._id = id._id || id;
      this._name = id._name || name;
      this._category = id._category || category;
      this._weight = id._weight || weight;
      this._model = id._model || model || "";
      this._bone = id._bone || bone || 0;
      this._position = id._position || position || new mp.Vector3(0,0,0);
      this._rotation = id._rotation || rotation || new mp.Vector3(0,0,0);
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Weapon);
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
