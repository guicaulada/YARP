'use strict';
/**
 * Creates a Weapon.
 * @namespace yarp.Weapon
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Weapon id.
 * @param {string} name - Weapon name.
 * @param {string} [category='None'] - Weapon category.
 * @param {string} [weight=5.0] - Weapon weight.
 * @param {string} [ammo=100] - Weapon ammo.
 * @param {string} [model=''] - Weapon model.
 * @param {number}  [bone=0] - Weapon bone.
 * @param {Vector3} [position=new mp.Vector3(0,0,0)] - Weapon position.
 * @param {Vector3} [rotation=new mp.Vector3(0,0,0)] - Weapon rotation.
 * @param {boolean} [visible=true] - Weapon visible.
 */

class Weapon extends yarp.GMObject{
  constructor(id,name,category,weight,ammo,model,bone,position,rotation,visible){
    super();
    if ((id && name) != null) {
      this._id = id;
      this._name = name;
      this._category = category || 'None';
      this._weight = weight || 5.0;
      this._ammo = ammo || 100;
      this._model = model || '';
      this._bone = bone || 0;
      this._position = position || new mp.Vector3(0,0,0);
      this._rotation = rotation || new mp.Vector3(0,0,0);
      this._visible = visible || true;
      if (!this._visible) this._alpha = 0;
      yarp.mng.register(this);
      this.makeGetterSetter();
      new yarp.Item(this.id,this.name,this.category,this.weight,false,this.model,(player) => {
        let character = yarp.characters[player.name];
        character.giveWeapon(this,0);
      });
      let ammoid = id.replace('WEAPON_','AMMO_');
      new yarp.Item(ammoid,this.name+' Ammo',this.category+' Ammo',0.1,false,'v_ret_gc_ammostack',(player) => {
        let character = yarp.characters[player.name];
        character.giveAmmo(ammoid,character.inventory[ammoid]);
      });
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Weapon
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Weapon(obj._id,obj._name,obj._category,obj._weight,obj._ammo,obj._model,obj._bone,obj._position,obj._rotation,obj._visible);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Weapon
   * @param {string} file - Config file path.
   */
  static config(file){
    let weapons = require(file);
    for (let category in weapons){
      for (let id in weapons[category]){
        let weapon = weapons[category][id];
        new Weapon(id,weapon.name,category,weapon.weight,weapon.ammo,weapon.model,weapon.bone,weapon.position,weapon.rotation,weapon.visible);
      }
    }
  }
}

module.exports = Weapon;
