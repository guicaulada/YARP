'use strict';
/**
 * @file Group class
 */
import GroupManager from '../managers/GroupManager';
export default class Group{
  constructor(name,type){
    this._id = GroupManager.getNewId();
    this.name = name;
    this.type = type || 'default';
    this.permissions = [];
  }
  save(){
    GroupManager.save(this);
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
