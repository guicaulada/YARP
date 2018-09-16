'use strict';
/**
* @file Weapon events
* @namespace client.weapon
*/

let equiped = {};

/**
 * Attach a weapon model to the character.
 * @event equipWeapon
 * @memberof client.weapon
 * @param {String} weaponJson The weapon data in JSON.
 */
mp.events.add('equipWeapon', (weaponJson) => {
  let weapon = JSON.parse(weaponJson);
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
    equiped[weapon._id] = obj;
  }
});

/**
 * Deletes specific equiped weapon.
 * @event unequipWeapon
 * @memberof client.weapon
 * @param {String} id The weapon id.
 */
mp.events.add('unequipWeapon', (id) => {
  if (equiped[id] != null) {
    equiped[id].destroy();
    equiped[id] = null;
  }
});

/**
 * Deletes every equiped weapon.
 * @event unequipAllWeapons
 * @memberof client.weapon
 */
mp.events.add('unequipAllWeapons', () => {
  for (id in equiped) {
    if (equiped[id] != null) {
      equiped[id].destroy();
      equiped[id] = null;
    }
  }
  equiped = {};
});

mp.events.add('takeWeapon', (weaponHash) => {
  if ((typeof weaponHash) === 'string') weaponHash = mp.game.joaat(weaponHash);
  yarp.utils.removeWeapon(weaponHash);
});

mp.events.add('setWeaponAmmo', (weaponHash, ammo) => {
  if ((typeof weaponHash) === 'string') weaponHash = mp.game.joaat(weaponHash);
  yarp.utils.setWeaponAmmo(weaponHash, ammo);
});
