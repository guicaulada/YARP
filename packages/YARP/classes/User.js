'use strict';

/**
 * Implements a User.
 * @class User
 */
class User extends yarp.Object {
  /**
   * Creates an instance of User.
   * @extends {yarp.Object}
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.password
   * @param {String} [params.lastLogin='']
   * @param {Boolean} [params.whitelisted=false]
   * @param {Boolean} [params.banned=false]
   * @param {Array<String>} [params.groups=[]]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @memberof User
   */
  constructor(params) {
    super();
    if ((params.id && params.password) != null) {
      this._id = params.id;
      this._password = params.password;
      this._lastLogin = this.default(params.lastLogin, '');
      this._whitelisted = this.default(params.whitelisted, false);
      this._banned = this.default(params.banned, false);
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      this._groups = this.default(params.groups, []);
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('User class requires id and password to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Get user characters.
   * @instance
   * @function characters
   * @return {Object} Characters indexed by name.
   * @memberof User
   */
  get characters() {
    let characters = {};
    for (let id in yarp.characters) {
      if (yarp.characters.hasOwnProperty(id)) {
        let character = yarp.characters[id];
        if (character.socialClub == this.id) {
          characters[id] = character;
        }
      }
    }
    return characters;
  }

  /**
   * Call enter fuction for character and it's groups.
   * @instance
   * @function enter
   * @return {Function} Enter functions.
   * @memberof User
   */
  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].enter(player);
        yarp.server.userJoinedGroup(player, this, group);
      }
    };
  }

  /**
   * Call leave fuction for character and it's groups.
   * @instance
   * @function leave
   * @return {Function} Leave functions.
   * @memberof User
   */
  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].leave(player);
        yarp.server.userLeftGroup = (player, this, group);
      }
    };
  }

  /**
   * Set's the enter function as a string
   * @instance
   * @function enter
   * @param {Function} value Enter function.
   * @memberof User
   */
  set enter(value) {
    this._enter = value.toString();
  }

  /**
   * Set's the leave function as a string
   * @instance
   * @function leave
   * @param {Function} value Leave function.
   * @memberof User
   */
  set leave(value) {
    this._leave = value;
  }

  /**
   * Update character last login.
   * @instance
   * @function updateLastLogin
   * @param {String} ip Character ip.
   * @memberof User
   */
  updateLastLogin(ip) {
    this.lastLogin = `${ip} ${yarp.utils.server.getTimestamp(new Date())}`;
  }

  /**
   * Verify password.
   * @instance
   * @function verifyPassword
   * @param {String} password Password to comapare with hash.
   * @return {Boolean} True if the password matches the hash.
   * @memberof User
   */
  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  /**
   * Give a group.
   * @instance
   * @function giveGroup
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @memberof User
   */
  giveGroup(group) {
    if (this.groups.indexOf(group) == -1) {
      if (yarp.groups[group]) {
        let type = yarp.groups[group].type;
        if (type) {
          let sameType = this.getGroupByType(type);
          if (sameType) {
            this.takeGroup(sameType);
          }
        }
        let player = this.player;
        if (player) {
          yarp.groups[group].enter(player);
          yarp.server.userJoinedGroup(player, this, group);
        }
      }
      this.groups.push(group);
      return true;
    }
    return false;
  }

  /**
   * Take a group.
   * @instance
   * @function takeGroup
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @memberof User
   */
  takeGroup(group) {
    if (this.groups.indexOf(group) > -1) {
      if (yarp.groups[group]) {
        let player = this.player;
        if (player) {
          yarp.groups[group].leave(player);
          yarp.server.userLeftGroup(player, this, group);
        }
      }
      this.groups.splice(this.groups.indexOf(group), 1);
      return true;
    }
    return false;
  }

  /**
   * Get group by type.
   * @instance
   * @function getGroupByType
   * @param {String} type Group type.
   * @return {String} Group id.
   * @memberof User
   */
  getGroupByType(type) {
    for (let id of this.groups) {
      let group = yarp.groups[id];
      if (group != null) {
        if (group.type == type) {
          return id;
        }
      }
    }
  }

  /**
   * Get groups by types.
   * @instance
   * @function getGroupByTypes
   * @param {Array<String>} types Group types.
   * @return {Array<String>} Group ids.
   * @memberof User
   */
  getGroupsByTypes(types) {
    let groups = [];
    for (let id of this.groups) {
      let group = yarp.groups[id];
      if (group != null) {
        if (types.indexOf(group.type) >= 0) {
          groups.push(group);
        }
      }
    }
    return groups;
  }

  /**
   * Check if has group.
   * @instance
   * @function hasGroup
   * @param {String} id Group id.
   * @return {Boolean} If has or not the group.
   * @memberof User
   */
  hasGroup(id) {
   return (this.groups.indexOf(id) > -1);
  }

  /**
   * Check if has all groups.
   * @instance
   * @function hasGroup
   * @param {Array<String>} groups Group ids.
   * @return {Boolean} If has or not all the groups.
   * @memberof User
   */
  hasGroups(groups) {
    for (let i = 0; i < groups.length; i++) {
      if (!this.hasGroup(groups[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if has permission.
   * @instance
   * @function hasPermission
   * @param {String} permission Permission.
   * @return {Boolean} If has or not the permission.
   * @memberof User
   */
  hasPermission(permission) {
    let result = false;
    let removed = false;
    let readd = false;
    if (permission[0] == '#') {
      let parts = permission.split('.');
      let item = this.inventory[parts[0]];
      let operation = parts[1][0];
      let value = Number(parts[1].splice(1, parts[1].length));
      switch (operation) {
        case '>':
        result = (item > value);
        break;
        case '<':
        result = (item < value);
        break;
        default:
        result = (item == value);
        break;
      }
    } else if (permission[0] == '@') {
      let parts = permission.split('.');
      let skill = this.skills[parts[0]];
      let operation = parts[1][0];
      let value = Number(parts[1].splice(1, parts[1].length));
      switch (operation) {
        case '>':
        result = (skill > value);
        break;
        case '<':
        result = (skill < value);
        break;
        default:
        result = (skill == value);
        break;
      }
    } else {
      for (let id of this.groups) {
        let group = yarp.groups[id];
        if (group != null) {
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
          if ((!result) || (!readd && removed)) {
            for (let inh of group.inherits) {
              let child = yarp.groups[inh];
              if (child.permissions.indexOf('*') > -1) {
                result = true;
              }
              if (child.permissions.indexOf(permission) > -1) {
                result = true;
              }
              if (child.permissions.indexOf(`-${permission}`) > -1) {
                removed = true;
              }
              if (child.permissions.indexOf(`+${permission}`) > -1) {
                readd = true;
              }
            }
          }
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
   * @param {Array<String>} permissions Permissions.
   * @return {Boolean} If has or not all permissions.
   * @memberof User
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

module.exports = User;
