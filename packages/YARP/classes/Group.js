'use strict';
/**
 * Creates a Group.
 * @namespace yarp.Group
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Group id.
 * @param {string} [type=null] - Group type.
 * @param {function} [enter=() => {}] - Group enter function.
 * @param {function} [leave=() => {}] - Group leave function.
 * @param {Array<string>} [permissions=[]] - Door permissions.
 * @param {Array<string>} [items=[]] - Group items.
 */

class Group extends yarp.GMObject{
  constructor(id,type,permissions,enter,leave){
    super();
    if ((id) != null) {
      this._id = id;
      this._type = type || null;
      this._permissions = ((permissions) ? (((yarp.groups && yarp.groups[id]) != null) ?
        yarp.groups[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.groups[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Get users on group.
   * @instance
   * @function users
   * @memberof yarp.Group
   * @returns {object} - Users.
   */
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

  /**
   * Get characters on group.
   * @instance
   * @function characters
   * @memberof yarp.Group
   * @returns {object} - Characters.
   */
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

  /**
   * Add permission to group.
   * @instance
   * @function addPermission
   * @memberof yarp.Group
   * @param {string} permission - Permission.
   */
  addPermission(permission){
    if (this.permissions.indexOf(permission) == -1) {
      this.permissions.push(permission);
    }
  }

  /**
   * Remove permission from group.
   * @instance
   * @function removePermission
   * @memberof yarp.Group
   * @param {string} permission - Permission.
   */
  removePermission(permission){
    if (this.permissions.indexOf(permission) > -1) {
      this.permissions.splice(this.permissions.indexOf(permission), 1);
    }
  }

  /**
   * Check if has permission.
   * @instance
   * @function hasPermission
   * @memberof yarp.Group
   * @param {string} permission - Permission.
   * @returns {boolean} - If has or not the permission.
   */
  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    if (this.permissions.indexOf('*') > -1){
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

  /**
   * Check if has all permissions.
   * @instance
   * @function hasPermission
   * @memberof yarp.Group
   * @param {Array<string>} permissions - Permissions.
   * @returns {boolean} - If has or not all permissions.
   */
  hasPermissions(permissions){
    for (let i = 0; i < permissions.length; i++){
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }


  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Group
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Group(obj._id,obj._type,obj._permissions,obj._enter,obj._leave);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Group
   * @param {string} file - Config file path.
   */
  static config(file){
    let groups = require(file);
    for (let id in groups){
      let group = groups[id];
      new Group(id,group.type,group.permissions,group.enter,group.leave);
    }
  }
}

module.exports = Group;
