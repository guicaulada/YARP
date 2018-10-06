'use strict';
/**
 * Implements a Weapon.
 */
class Weapon extends yarp.Item {
  /**
   * Creates an instance of Weapon.
   * @extends {yarp.Object}
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
   * @memberof Weapon
   */
  constructor(params) {
    super(params);
    if ((params.id && params.name) != null) {
      this._ammo = this.default(params.ammo, false);
      this._bone = this.default(params.bone, 0);
      this._position = this.default(params.position, new mp.Vector3(0, 0, 0));
      this._rotation = this.default(params.rotation, new mp.Vector3(0, 0, 0));
      this._visible = this.default(params.visible, true);
      this._options.Equip = (player) => {
        let character = player.character;
        character.giveWeapon(this, 1);
      };
      if (!this._visible) this._alpha = 0;
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Weapon class requires id and name to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Weapon;
