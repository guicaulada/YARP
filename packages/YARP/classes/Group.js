'use strict';
/**
 * Implements a Group.
 * @class yarp.Group
 * @extends yarp.GMObject
 */
class Group extends yarp.GMObject {
  /**
   *Creates an instance of Group.
   * @param {*} id
   * @param {boolean} [type=false]
   * @param {*} [inherits=[]]
   * @param {*} [permissions=[]]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @memberof yarp.Group
   */
  constructor(
    id,
    type = false,
    inherits = [],
    permissions = [],
    enter = () => {},
    leave = () => {}
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        type: type,
        inherits: inherits,
        permissions: permissions,
        enter: enter,
        leave: leave,
      } = id;
      return new yarp.Group(nid, type, inherits, permissions, enter, leave);
    } else if ((id) != null) {
      this._id = id;
      this._type = type;
      this._inherits = inherits;
      this._permissions = permissions;
      this._enter = enter.toString();
      this._leave = leave.toString();
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Get users on group.
   * @instance
   * @function users
   * @memberof yarp.Group
   * @return {object} - Users.
   */
  get users() {
    let users = {};
    for (id in yarp.users) {
      if (yarp.users.hasOwnProperty(id)) {
        let user = yarp.users[id];
        if (user.hasGroup(this.id)) {
          users[id] = user;
        }
      }
    }
    return users;
  }

  /**
   * Get characters on group.
   * @instance
   * @function characters
   * @memberof yarp.Group
   * @return {object} - Characters.
   */
  get characters() {
    let characters = {};
    for (id in yarp.characters) {
      if (yarp.users.hasOwnProperty(id)) {
        let character = yarp.characters[id];
        if (character.hasGroup(this.id)) {
          characters[id] = character;
        }
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
  addPermission(permission) {
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
  removePermission(permission) {
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
   * @return {boolean} - If has or not the permission.
   */
  hasPermission(permission) {
    let result = false;
    let removed = false;
    let readd = false;
    if (this.permissions.indexOf('*') > -1) {
      result = true;
    }
    if (this.permissions.indexOf(permission) > -1) {
      result = true;
    }
    if (this.permissions.indexOf(`-${permission}`) > -1) {
      removed = true;
    }
    if (this.permissions.indexOf(`+${permission}`) > -1) {
      readd = true;
    }
    if ((!result) || (!readd && removed)) {
      for (group of this.inherits) {
        if (group.permissions.indexOf('*') > -1) {
          result = true;
        }
        if (group.permissions.indexOf(permission) > -1) {
          result = true;
        }
        if (group.permissions.indexOf(`-${permission}`) > -1) {
          removed = true;
        }
        if (group.permissions.indexOf(`+${permission}`) > -1) {
          readd = true;
        }
      }
    }
    if (removed && !readd) {
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
   * @return {boolean} - If has or not all permissions.
   */
  hasPermissions(permissions) {
    for (let i = 0; i < permissions.length; i++) {
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Group;
