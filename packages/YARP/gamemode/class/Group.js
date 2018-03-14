'use strict';
/**
 * @file Group class
 */
module.exports = class Group{
  constructor(_id,type,permissions,cb_in,cb_out){
    if ((typeof _id) === 'object' || (_id && type && permissions && cb_in && cb_out) != null) {
      this._id = _id._id || _id;
      this.type = _id.type || type;
      this.permissions = _id.permissions || (((yarp.groups && yarp.groups[_id]) != null) ?
        yarp.groups[_id].permissions.concat(permissions.filter(function (item) {
          return yarp.groups[_id].permissions.indexOf(item) < 0;
        })) : permissions);
      this.cb_in = _id.cb_in || ((cb_in) ? cb_in.toString() : false);
      this.cb_out = _id.cb_out || ((cb_out) ? cb_out.toString() : false);
    }
  }

  static load(){
    return yarp.dbm.load(Group);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
  get users(){
    let users = {};
    for (id in yarp.users){
      let user = yarp.users[id];
      if (user.hasGroup(this._id)){
        users[id] = user;
      }
    }
    return users;
  }
  get characters(){
    let characters = {};
    for (id in yarp.characters){
      let character = yarp.characters[id];
      if (character.hasGroup(this._id)){
        characters[id] = character;
      }
    }
    return characters;
  }
  addPermission(permission){
    if (this.permissions.indexOf(permission) == -1) {
      this.permissions.push(permission);
    }
  }
  removePermission(permission){
    if (this.permissions.indexOf(permission) > -1) {
      this.permissions.splice(this.permissions.indexOf(permission), 1);
    }
  }
  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    if (this.permissions.indexOf("*") > -1){
      result = true;
    }
    if (this.permissions.indexOf(permission) > -1){
      result = true;
    }
    if (this.permissions.indexOf(`-${permission}`) > -1){
      removed = true;
    }
    if (this.permissions.indexOf(`+${permission}`) > -1){
      readd = true;
    }
    if (removed && !readd){
      result = false;
    }
    return result;
  }
  hasPermissions(permissions){
    for (let i = 0; i < permissions.length; i++){
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }
}
