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
   * @param {Number} [params.ammo=false]
   * @param {String} [params.model='']
   * @param {Number} [params.bone=0]
   * @param {Vector3} [params.position=new mp.Vector3(0, 0, 0)]
   * @param {Vector3} [params.rotation=new mp.Vector3(0, 0, 0)]
   * @param {Boolean} [params.visible=false]
   * @memberof Weapon
   */
  constructor(params) {
    super(params);
    if ((params.id && params.name) != null) {
      this._ammo = this.default(params.ammo, false);
      this._bone = this.default(params.bone, 0);
      this._position = this.default(params.position, new mp.Vector3(0, 0, 0));
      this._rotation = this.default(params.rotation, new mp.Vector3(0, 0, 0));
      this._visible = this.default(params.visible, false);
      if (!this._visible) this._alpha = 0;
      yarp.mng.register(this);
      yarp.mng.register(this, yarp.Item);
      this.makeGetterSetter();
      this.options = (player, args) => {
        let options = {};
        if (player.character.hasEquipment(this.id)) {
          options['Unequip'] = (player) => {
            let amount = this.default(player.character.equipment[this.id], 0);
            if (player.character.takeEquipment(this.id, amount)) {
              player.character.giveItem(this.id, amount);
              player.removeWeapon(mp.joaat(this.id));
              yarp.client.unequipWeapon(player, this.id);
            }
          };
        } else {
          options['Equip'] = (player) => {
            let character = player.character;
            if (!character.hasEquipment(this.id)) {
              if (character.takeItem(this.id, 1)) {
                character.giveEquipment(this.id, 1);
                player.giveWeapon(mp.joaat(this.id), this.default(character.equipment[this.ammo], 0));
                yarp.client.equipWeapon(player, this);
              }
            }
          };
        }
        return options;
      };
    } else {
      throw new TypeError('Weapon class requires id and name to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Weapon;
