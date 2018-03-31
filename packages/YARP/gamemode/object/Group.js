'use strict';
/**
 * @file Group class
 */
module.exports = class Group extends yarp.gmo{
  constructor(id,type,permissions,enter,leave){
    super();
    if ((typeof id) === 'object' || (id) != null) {
      this._id = id._id || id;
      this._type = id._type || type || false;
      this._permissions = id._permissions || (((yarp.groups && yarp.groups[id]) != null) ?
        yarp.groups[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.groups[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._enter = id._enter || ((enter) ? enter.toString() : "() => {}");
      this._leave = id._leave || ((leave) ? leave.toString() : "() => {}");
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  get users(){
    let users = {};
    for (id in yarp.users){
      let user = yarp.users[id];
      if (user.hasGroup(this.id)){
        users[id] = user;
      }
    }
    return users;
  }

  get characters(){
    let characters = {};
    for (id in yarp.characters){
      let character = yarp.characters[id];
      if (character.hasGroup(this.id)){
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

  static config(file){
    let groups = require(file);
    for (let id in groups){
      let group = groups[id];
      new yarp.Group(id,group.type,group.permissions,group.enter,group.leave);
    }
  }
}
