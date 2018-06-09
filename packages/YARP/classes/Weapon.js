'use strict';
/**
 * Implements a Weapon.
 * @class yarp.Weapon
 * @extends yarp.GMObject
 */
class Weapon extends yarp.GMObject {
  /**
   *Creates an instance of Weapon.
   * @param {*} id
   * @param {*} name
   * @param {string} [category='None']
   * @param {number} [weight=0]
   * @param {number} [ammo=0]
   * @param {string} [model='']
   * @param {number} [bone=0]
   * @param {*} [position=new mp.Vector3(0, 0, 0)]
   * @param {*} [rotation=new mp.Vector3(0, 0, 0)]
   * @param {boolean} [visible=true]
   * @memberof yarp.Weapon
   */
  constructor(
    id,
    name,
    category = 'None',
    weight = 0,
    ammo = 0,
    model = '',
    bone = 0,
    position = new mp.Vector3(0, 0, 0),
    rotation = new mp.Vector3(0, 0, 0),
    visible = true
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        name: name,
        category: category,
        weight: weight,
        ammo: ammo,
        model: model,
        bone: bone,
        position: position,
        rotation: rotation,
        visible: visible,
      } = id;
      return new yarp.Weapon(nid, name, category, weight, ammo, model, bone, position, rotation, visible);
    } else if ((id && name) != null) {
      this._id = id;
      this._name = name;
      this._category = category;
      this._weight = weight;
      this._ammo = ammo;
      this._model = model;
      this._bone = bone;
      this._position = position;
      this._rotation = rotation;
      this._visible = visible;
      if (!this._visible) this._alpha = 0;
      yarp.mng.register(this);
      this.makeGetterSetter();
      new yarp.Item(this.id, this.name, this.category, this.weight, false, this.model, {
        Equip: (player) => {
          let character = yarp.characters[player.name];
          character.giveWeapon(this, 0);
        },
      });
      let ammoid = id.replace('WEAPON_', 'AMMO_');
      new yarp.Item(ammoid, this.name + ' Ammo', this.category + ' Ammo', 0.1, false, 'v_ret_gc_ammostack', {
        Equip: (player) => {
          let character = yarp.characters[player.name];
          character.giveAmmo(ammoid, character.inventory[ammoid]);
        },
      });
    }
  }
}

module.exports = Weapon;
