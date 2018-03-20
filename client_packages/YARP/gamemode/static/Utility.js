'use strict';
/**
 * @file Utility class
 */
// Credits to kamperr
exports = class Utility {
  static get weaponSlots(){
    return new Set([1993361168,1277010230,932043479,690654591,1459198205,195782970,-438797331,896793492,495159329,-1155528315,-515636489,-871913299,-1352759032,-542958961,1682645887,-859470162,-2125426402,2067210266,-538172856,1783244476,439844898,-24829327,1949306232,-1941230881,-1033554448,320513715,-695165975,-281028447,-686713772,347509793,1769089473,189935548,248801358,386596758,-157212362,436985596,-47957369, 575938238]);
  }

  static getWeaponTypeInSlot(weaponSlot){
    return mp.game.invoke('0xBBDDEBFD9564D52C', mp.players.local.handle, weaponSlot);
  }

  static getWeaponAmmo(weaponhash){
    return mp.game.invoke('0x2406A9C8DA99D3F4', mp.players.local.handle, weaponhash);
  }

  static removeWeapon(weaponhash){
    return mp.game.invoke('0xA48F593CC7A71FCC', mp.players.local.handle, weaponhash);
  }

  static setWeaponAmmo(weaponhash, ammo){
    return mp.game.invoke('0xC8207C41C6D1E3CF', mp.players.local.handle, weaponhash, ammo);
  }

  static getCurrentWeapon(){
    return mp.game.invoke('0x6678C142FAC881BA', mp.players.local.handle)
  }

  static giveWeaponComponent(weaponhash, component){
    return mp.game.invoke('0xAD084726D7F23594', mp.players.local.handle, weaponhash, component);
  }

  static getWeaponClipSize(weaponhash){
    return mp.game.invoke('0xADBCA3534D2F6BEB', weaponhash);
  }

  static gotWeapon(weaponhash){
    return mp.game.invoke('0xBEF481E5CF03DC93', mp.players.local.handle, weaponhash, false);
  }

  static getAllWeapons(){
    const weapons = {};
    this.weaponSlots.forEach(weaponSlot => {
      const weapon = this.getWeaponTypeInSlot(mp.players.local.handle, weaponSlot);
      if (weapon !== 0 && weapon !== -1569615261) {
          weapons[weapon] = { ammo: this.getAmmoWeapon(mp.players.local.handle, weapon) };
      }
    });
    return weapons;
  }

  static getCameraDirection(){
    // Credits to https://github.com/ImagicTheCat/vRP/blob/vrpex/vrp/client/base.lua#L46 - Thank you for teaching me so much.
    const heading = mp.game.cam.getGameplayCamRelativeHeading()+mp.players.local.getHeading();
    const pitch = mp.game.cam.getGameplayCamRot(0).x;
    var x = -Math.sin(heading*Math.PI/180.0);
    var y = Math.cos(heading*Math.PI/180.0);
    var z = Math.sin(pitch*Math.PI/180.0);
    var len = Math.sqrt(x*x+y*y+z*z);
    if (len != 0) {
      x = x/len;
      y = y/len;
      z = z/len;
    }
    return {"x":x,"y":y,"z":z};
  }

  static spawnObject(model, pos, cb) {
    if ((typeof model) === 'string'){
      model = mp.game.joaat(model);
    }
    mp.game.streaming.requestModel(model, () => {
      let obj = mp.objects.new(model, pos, {
        rotation: new mp.Vector3(0, 0, 0),
        alpha: 255,
        dimension: mp.players.local.dimension
      });
      if (cb != null){
        cb(obj)
      }
    });
  }

  static deleteObject(object){
    mp.game.object.deleteObject(object.handle);
  }
}
