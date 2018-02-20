var utils = require('./YARP/exports/utils.js');

let playerWeapons = {};
let weaponsConfig = {};

mp.events.add('setWeaponsConfig', (weaponsJson) => {
	weaponsConfig = JSON.parse(weaponsJson);
});

mp.events.add('render', () => {
  for (weaponModel in weaponsConfig) {
    let weaponHash = mp.game.joaat(weaponModel)
    if (utils.gotWeapon(weaponHash)){
      let onPlayer = false;
      if (playerWeapons[weaponModel] != null) {
        onPlayer = true;
      }
      if (!onPlayer && weaponHash != utils.getCurrentWeapon()) {
        SetGear(weaponModel);
      } else if (onPlayer && weaponHash == utils.getCurrentWeapon()) {
        RemoveGear(weaponModel);
      }
    } else if (playerWeapons[weaponModel] != null) {
      RemoveGear(weaponModel);
    }
  }
});

mp.events.add('removeWeapon', (weaponName) => {
	RemoveGear(weaponName)
});

mp.events.add('removeWeapons', (weaponName) => {
	RemoveGears()
});

function RemoveGear(weapon){
	DeleteWeapon(playerWeapons[weapon]);
  playerWeapons[weapon] = null;
}

function RemoveGears(){
	for (weapon in playerWeapons){
		DeleteWeapon(playerWeapons[weapon])
	}
	playerWeapons = {};
}

function SpawnObject(model, pos, cb) {
  if ((typeof model) === 'string'){
    model = mp.game.joaat(model);
  }
  mp.game.streaming.requestModel(model, () => {
    let obj = mp.objects.new(model, pos, {
      rotation: new mp.Vector3(0, 0, 0),
      alpha: 255,
      dimension: 0
    });

    if (cb != null){
      cb(obj)
    }
  });
}

function DeleteWeapon(object){
  mp.game.object.deleteObject(object.handle);
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

	if(weaponsConfig[weapon] != null ){
		bone     = weaponsConfig[weapon].bone;
		boneX    = weaponsConfig[weapon].x;
		boneY    = weaponsConfig[weapon].y;
		boneZ    = weaponsConfig[weapon].z;
		boneXRot = weaponsConfig[weapon].xRot;
		boneYRot = weaponsConfig[weapon].yRot;
		boneZRot = weaponsConfig[weapon].zRot;
		model    = weaponsConfig[weapon].model;
	}

	SpawnObject(model, pos, function(obj){
		let boneIndex = mp.players.local.getBoneIndex(bone);
		let bonePos 	= mp.players.local.getWorldPositionOfBone(boneIndex);
		obj.attachTo(mp.players.local.handle, boneIndex, boneX, boneY, boneZ, boneXRot, boneYRot, boneZRot, false, false, false, false, 2, true);
    playerWeapons[weapon] = obj;
	})
}
