'use strict';
/**
 * Weapon events
 * @memberof yarp.client
 */

let equipped = {};

/**
 * Attach a weapon model to the character.
 * @function equipWeapon
 * @memberof yarp.client
 * @param {Object} weapon The weapon data.
 */
yarp.client.equipWeapon = (weapon) => {
  let model = mp.game.joaat(weapon._model);
  if (mp.game.streaming.isModelValid(model)) {
    let obj = mp.objects.new(model, mp.players.local.position, {
      rotation: weapon._rotation,
      alpha: 255,
      dimension: mp.players.local.dimension,
    });
    obj.attachTo(
      mp.players.local.handle, mp.players.local.getBoneIndex(weapon._bone),
      weapon._position.x, weapon._position.y, weapon._position.z,
      weapon._rotation.x, weapon._rotation.y, weapon._rotation.z,
      false, false, false, false, 2, true
    );
    equipped[weapon._id] = obj;
  }
};

/**
 * Deletes specific equipped weapon.
 * @function unequipWeapon
 * @memberof yarp.client
 * @param {String} id The weapon id.
 */
yarp.client.unequipWeapon = (id) => {
  if (equipped[id] != null) {
    equipped[id].destroy();
    equipped[id] = null;
  }
};

/**
 * Deletes every equipped weapon.
 * @function unequipAllWeapons
 * @memberof yarp.client
 */
yarp.client.unequipAllWeapons = () => {
  for (id in equipped) {
    if (equipped[id] != null) {
      equipped[id].destroy();
      equipped[id] = null;
    }
  }
  equipped = {};
};

/**
 * Remove weapon from player.
 * @function equipWeapon
 * @memberof yarp.client
 * @param {*} weaponHash The weapon data.
 */
yarp.client.takeWeapon = (weaponHash) => {
  if ((typeof weaponHash) === 'string') weaponHash = mp.game.joaat(weaponHash);
  yarp.utils.client.removeWeapon(weaponHash);
};

/**
 * Takes ammo from player.
 * @function equipWeapon
 * @memberof yarp.client
 * @param {*} weaponHash The weapon data.
 * @param {Number} ammo The weapon data.
 */
yarp.client.setWeaponAmmo = (weaponHash, ammo) => {
  if ((typeof weaponHash) === 'string') weaponHash = mp.game.joaat(weaponHash);
  yarp.utils.client.setWeaponAmmo(weaponHash, ammo);
};
