'use strict';
/**
 * Implements a Weapon.
 * @class yarp.Weapon
 * @extends yarp.Object
 */
class Weapon extends yarp.Object {
  /**
   * Creates an instance of Weapon.
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.name
   * @param {String} [params.category='None']
   * @param {Number} [params.weight=0]
   * @param {Number} [params.ammo=0]
   * @param {String} [params.model='']
   * @param {Number} [params.bone=0]
   * @param {Vector3} [params.position=new mp.Vector3(0, 0, 0)]
   * @param {Vector3} [params.rotation=new mp.Vector3(0, 0, 0)]
   * @param {Boolean} [params.visible=true]
   * @memberof yarp.Weapon
   */
  constructor(params) {
    super();
    if ((params.id && params.name) != null) {
      this._id = params.id;
      this._name = params.name;
      this._category = this.default(params.category, 'None');
      this._weight = this.default(params.weight, 0);
      this._ammo = this.default(params.ammo, 0);
      this._model = this.default(params.model, '');
      this._bone = this.default(params.bone, 0);
      this._position = this.default(params.position, new mp.Vector3(0, 0, 0));
      this._rotation = this.default(params.rotation, new mp.Vector3(0, 0, 0));
      this._visible = this.default(params.visible, true);
      if (!this._visible) this._alpha = 0;
      yarp.mng.register(this);
      this.makeGetterSetter();
      new yarp.Item({
        id: this.id,
        name: this.name,
        category: this.category,
        weight: this.weight,
        spoil: false,
        model: this.model,
        options: {
          Equip: (player) => {
            let character = yarp.characters[player.name];
            character.giveWeapon(this, 0);
          },
        },
      });
      let ammoid = this.id.replace('WEAPON_', 'AMMO_');
      new yarp.Item({
        id: ammoid,
        name: this.name + ' Ammo',
        category: this.category + ' Ammo',
        weight: 0.1,
        spoil: false,
        model: 'v_ret_gc_ammostack',
        options: {
          Equip: (player) => {
            let character = yarp.characters[player.name];
            character.giveAmmo(ammoid, character.inventory[ammoid]);
          },
        },
      });
    } else {
      throw new TypeError('Weapon class requires id and name to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Weapon;
