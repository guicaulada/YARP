'use strict';
/**
* @file Weapon events
*/

let equiped = {};
let objects = {};
mp.events.add('equipWeapon', (weaponJson) => {
	let weapon = JSON.parse(weaponJson);
	equiped[weapon.id] = weapon;
});

mp.events.add('render', () => {
  for (let id in equiped) {
    let hash = mp.game.joaat(id)
    if (yarp.utils.gotWeapon(hash)){
      let geared = false;
      if (objects[id] != null) {
        geared = true;
      }
      if (!geared && hash != yarp.utils.getCurrentWeapon()) {
        SetGear(id);
      } else if (geared && hash == yarp.utils.getCurrentWeapon()) {
        RemoveGear(id);
      }
    } else if (objects[id] != null) {
      RemoveGear(id);
    }
  }
});

mp.events.add('removeWeapon', (id) => {
	RemoveGear(id)
});

mp.events.add('removeWeapons', () => {
	RemoveGears()
});

function RemoveGear(id){
	yarp.utils.deleteObject(objects[id]);
  objects[id] = null;
}

function RemoveGears(){
	for (id in objects){
		yarp.utils.deleteObject(objects[id])
	}
	objects = {};
}

function SetGear(weapon){
  let pos = mp.players.local.position;
	let bone       = null;
	let boneX      = 0.0;
	let boneY      = 0.0;
	let boneZ      = 0.0;
	let boneXRot   = 0.0;
	let boneYRot   = 0.0;
	let boneZRot   = 0.0;
	let model      = null;

	if(equiped[id] != null ){
		bone     = weapon._bone;
		boneX    = weapon._position.x;
		boneY    = weapon._position.y;
		boneZ    = weapon._position.z;
		boneXRot = weapon._rotation.x;
		boneYRot = weapon._rotation.y;
		boneZRot = weapon._rotation.z;
		model    = weapon._model;
	}

	yarp.utils.spawnObject(model, pos, function(obj){
		let boneIndex = mp.players.local.getBoneIndex(bone);
		let bonePos 	= mp.players.local.getWorldPositionOfBone(boneIndex);
		obj.attachTo(mp.players.local.handle, boneIndex, boneX, boneY, boneZ, boneXRot, boneYRot, boneZRot, false, false, false, false, 2, true);
    objects[weapon.id] = obj;
	})
}
