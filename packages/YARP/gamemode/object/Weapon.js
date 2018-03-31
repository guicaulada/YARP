'use strict';
/**
 * @file Weapon class
 */
module.exports = class Weapon extends yarp.gmo{
  constructor(id,name,category,weight,ammo,model,bone,position,rotation,visible){
    super();
    if ((typeof id) === 'object' || (id && name) != null) {
      this._id = id._id || id;
      this._name = id._name || name;
      this._category = id._category || category || "None";
      this._weight = id._weight || weight || 5.0;
      this._ammo = id._ammo || ammo || 100;
      this._model = id._model || model || "";
      this._bone = id._bone || bone || 0;
      this._position = id._position || position || new mp.Vector3(0,0,0);
      this._rotation = id._rotation || rotation || new mp.Vector3(0,0,0);
      this._visible = id._visible || visible || true;
      if (!this._visible) this._alpha = 0;
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let weapons = require(file);
    for (let category in weapons){
      for (let id in weapons[category]){
        let weapon = weapons[category][id];
        new yarp.Weapon(id,weapon.name,category,weapon.weight,weapon.ammo,weapon.model,weapon.bone,weapon.position,weapon.rotation,weapon.visible);
        new yarp.Item(id,weapon.name,category,weapon.weight,false,weapon.model,(player) => {
          let character = yarp.characters[player.name];
          character.giveWeapon(weapon,amount);
        });
      }
    }
  }
}
