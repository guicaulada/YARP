'use strict';

/**
 * Implements a User.
 * @class yarp.User
 * @extends yarp.GMObject
 */
class User extends yarp.GMObject {
/**
 * Creates an instance of User.
 * @param {Object} params
 * @param {String} params.id
 * @param {String} params.password
 * @param {String} [params.lastLogin='']
 * @param {Boolean} [params.whitelisted=false]
 * @param {Boolean} [params.banned=false]
 * @param {Array<String>} [params.groups=[]]
 * @param {Function} [params.enter=() => {}]
 * @param {Function} [params.leave=() => {}]
 * @memberof yarp.User
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
   * Get user player.
   * @instance
   * @function player
   * @memberof yarp.User
   * @return {Object} Player.
   */
  get player() {
    for (let player of mp.players.toArray()) {
      if (player.socialClub == this.id) {
        return player;
      }
    }
    return null;
  }

  /**
   * Get user characters.
   * @instance
   * @function characters
   * @memberof yarp.User
   * @return {Object} Characters indexed by name.
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
   * Get user active character.
   * @instance
   * @function character
   * @memberof yarp.User
   * @return {Object} Active character.
   */
  get character() {
    for (let player of mp.players.toArray()) {
      if (player.socialClub == this.id) {
        return yarp.characters[player.name];
      }
    }
    return null;
  }

  /**
   * Call enter fuction for character and it's groups.
   * @instance
   * @function enter
   * @memberof yarp.User
   * @return {Function} Enter functions.
   * @fires userJoinedGroup
   */
  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].enter(player);
        mp.events.call('userJoinedGroup', player, this, group);
      }
    };
  }

  /**
   * Call leave fuction for character and it's groups.
   * @instance
   * @function leave
   * @memberof yarp.User
   * @return {Function} Leave functions.
   * @fires userLeftGroup
   */
  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].leave(player);
        mp.events.call('userLeftGroup', player, this, group);
      }
    };
  }

  /**
   * Set's the enter function as a string
   * @instance
   * @function enter
   * @memberof yarp.User
   * @param {Function} value Enter function.
   */
  set enter(value) {
    this._enter = value.toString();
  }

  /**
   * Set's the leave function as a string
   * @instance
   * @function leave
   * @memberof yarp.User
   * @param {Function} value Leave function.
   */
  set leave(value) {
    this._leave = value;
  }

  /**
   * Update character last login.
   * @instance
   * @function updateLastLogin
   * @memberof yarp.User
   * @param {String} ip Character ip.
   */
  updateLastLogin(ip) {
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  /**
   * Verify password.
   * @instance
   * @function verifyPassword
   * @memberof yarp.User
   * @param {String} password Password to comapare with hash.
   * @return {Boolean} True if the password matches the hash.
   */
  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  /**
   * Give a group.
   * @instance
   * @function giveGroup
   * @memberof yarp.User
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @fires userJoinedGroup
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
          mp.events.call('userJoinedGroup', player, this, group);
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
   * @memberof yarp.User
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @fires userLeftGroup
   */
  takeGroup(group) {
    if (this.groups.indexOf(group) > -1) {
      if (yarp.groups[group]) {
        let player = this.player;
        if (player) {
          yarp.groups[group].leave(player);
          mp.events.call('userLeftGroup', player, this, group);
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
   * @memberof yarp.User
   * @param {String} type Group type.
   * @return {String} Group id.
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
   * @memberof yarp.User
   * @param {Array<String>} types Group types.
   * @return {Array<String>} Group ids.
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
   * @memberof yarp.User
   * @param {String} id Group id.
   * @return {Boolean} If has or not the group.
   */
  hasGroup(id) {
   return (this.groups.indexOf(id) > -1);
  }

  /**
   * Check if has all groups.
   * @instance
   * @function hasGroup
   * @memberof yarp.User
   * @param {Array<String>} groups Group ids.
   * @return {Boolean} If has or not all the groups.
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
   * @memberof yarp.User
   * @param {String} permission Permission.
   * @return {Boolean} If has or not the permission.
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
   * @memberof yarp.User
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

module.exports = User;
