'use strict';
/**
 * @file Group class
 */
module.exports = class Group{
  constructor(id,type,permissions,enter,leave){
    if ((typeof id) === 'object' || (id) != null) {
      this._id = id._id || id;
      this._type = id._type || type || false;
      this._permissions = id._permissions || (((yarp.groups && yarp.groups[id]) != null) ?
        yarp.groups[id].permissions.concat(permissions.filter(function (item) {
          return yarp.groups[id].permissions.indexOf(item) < 0;
        })) : (permissions || []));
      this._enter = id._enter || ((enter) ? enter.toString() : false);
      this._leave = id._leave || ((leave) ? leave.toString() : false);
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Group);
  }

  static config(file){
    let groups = require(file);
    for (let id in groups){
      let group = groups[id];
      new yarp.Group(id,group.type,group.permissions,group.enter,group.leave);
    }
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
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
