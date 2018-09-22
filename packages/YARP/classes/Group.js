'use strict';
/**
 * Implements a Group.
 */
class Group extends yarp.Object {
  /**
   * Creates an instance of Group.
   * @extends yarp.Object
   * @param {Object} params
   * @param {String} params.id
   * @param {Boolean} [params.type=false]
   * @param {Array<String>} [params.inherits=[]]
   * @param {Array<String>} [params.permissions=[]]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @memberof Group
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._type = this.default(params.type, false);
      this._inherits = this.default(params.inherits, []);
      this._permissions = this.default(params.permissions, {});
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Group class requires id to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Get users on group.
   * @instance
   * @function users
   * @memberof Group
   * @return {Object} Users.
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
   * @memberof Group
   * @return {Object} Characters.
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
   * @memberof Group
   * @param {String} permission Permission.
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
   * @memberof Group
   * @param {String} permission Permission.
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
   * @memberof Group
   * @param {String} permission Permission.
   * @return {Boolean} If has or not the permission.
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
   * @memberof Group
   * @param {Array<String>} permissions Permissions.
   * @return {Boolean} If has or not all permissions.
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
