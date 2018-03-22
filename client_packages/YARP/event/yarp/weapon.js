'use strict';
/**
* @file Weapon events
*/

let equiped = {};
mp.events.add('equipWeapon', (weaponJson) => {
	let weapon = JSON.parse(weaponJson);
	let obj = mp.objects.new(mp.game.joaat(weapon._model),  mp.players.local.position,
	{
		rotation: new mp.Vector3(0,0,0),
		alpha: 255,
		dimension:  mp.players.local.dimension
	});
	obj.attachTo(
		mp.players.local.handle, mp.players.local.getBoneIndex(weapon._bone),
		weapon._position.x, weapon._position.y, weapon._position.z,
		weapon._rotation.x, weapon._rotation.y, weapon._rotation.z,
		false, false, false, false, 2, true
	);
  equiped[weapon._id] = obj;
});

mp.events.add('unequipWeapon', (id) => {
	if (equiped[id] != null){
		equiped[id].destroy();
		equiped[id] = null;
	}
});

mp.events.add('unequipAllWeapons', () => {
	for (id in equiped){
		equiped[id].destroy();
	}
	equiped = {};
});
