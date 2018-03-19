'use strict';
/**
 * @file Weapon class
 */
module.exports = class Weapon{
  constructor(id,name,category,weight,price,ammo,model,bone,position,rotation){
    if ((typeof id) === 'object' || (id && name) != null) {
      this._id = id._id || id;
      this._name = id._name || name;
      this._category = id._category || category || "None";
      this._weight = id._weight || weight || 5.0;
      this._price = id._price || price || 10000;
      this._ammo = id._ammo || ammo || 100;
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

  static config(file){
    let weapons = require(file);
    for (let category in weapons){
      for (let id in weapons[category]){
        let weapon = weapons[category][id];
        new yarp.Weapon(id,weapon.name,category,weapon.weight,weapon.price,weapon.ammo,weapon.model,weapon.bone,weapon.position,weapon.rotation);
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
