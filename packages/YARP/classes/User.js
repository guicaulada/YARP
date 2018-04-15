'use strict';

const bcrypt = require('bcryptjs');

/**
 * Creates a User.
 * @namespace yarp.User
 * @class
 * @extends yarp.GMObject
 * @param {string} id - User social club.
 * @param {string} password - User password.
 * @param {string} [lastLogin=''] - User last login.
 * @param {Float} [whitelisted=false] - User whitelisted.
 * @param {Float} [banned=false] - User banned.
 * @param {Array<string>} [groups=[]] - User groups.
 * @param {function} [enter=() => {}] - User enter function.
 * @param {function} [leave=() => {}] - User leave function.
 */
class User extends yarp.GMObject{
  constructor(id,password,lastLogin,whitelisted,banned,groups,enter,leave){
    super();
    if ((id && password) != null){
      this._id = id;
      this._password = (password.length == 60) ? password : bcrypt.hashSync(password, 10);
      this._lastLogin = lastLogin || '';
      this._whitelisted = whitelisted || false;
      this._banned = banned || false;
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      this._groups = groups || [];
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Get user player.
   * @instance
   * @function player
   * @memberof yarp.User
   * @returns {object} - Player.
   */
  get player(){
    for (let player of mp.players.toArray()) {
      if (player.socialClub == this.id){
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
   * @returns {object} - Characters indexed by name.
   */
  get characters(){
    let characters = {};
    for (let id in yarp.characters){
      let character = yarp.characters[id];
      if (character.socialClub == this.id){
        characters[id] = character;
      }
    }
    return characters;
  }

  /**
   * Get user active character.
   * @instance
   * @function character
   * @memberof yarp.User
   * @returns {object} - Active character.
   */
  get character(){
    for (let player of mp.players.toArray()) {
      if (player.socialClub == this.id){
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
   * @returns {function} - Enter functions.
   * @fires userJoinedGroup
   */
  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player)
      }
      for (let group of this.groups){
        yarp.groups[group].enter(player);
        mp.events.call('userJoinedGroup',player,this,group);
      }
    }
  }

  /**
   * Call leave fuction for character and it's groups.
   * @instance
   * @function leave
   * @memberof yarp.User
   * @returns {function} - Leave functions.
   * @fires userLeftGroup
   */
  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player)
      }
      for (let group of this.groups){
        yarp.groups[group].leave(player);
        mp.events.call('userLeftGroup',player,this,group);
      }
    }
  }

  set enter(value) {
    this._enter = value;
  }

  set leave(value) {
    this._leave = value;
  }

  /**
   * Update character last login.
   * @instance
   * @function updateLastLogin
   * @memberof yarp.User
   * @param {string} ip - Character ip.
   */
  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  /**
   * Verify password.
   * @instance
   * @function verifyPassword
   * @memberof yarp.User
   * @param {string} password - Password to comapare with hash.
   */
  verifyPassword(password){
    return bcrypt.compareSync(password, this.password);
  }

  /**
   * Give a group.
   * @instance
   * @function giveGroup
   * @memberof yarp.User
   * @param {string} group - Group id.
   * @returns {boolean} - Operation success/fail.
   * @fires userJoinedGroup
   */
  giveGroup(group){
    if (yarp.groups[group]) {
      if (this.groups.indexOf(group) == -1) {
        let type = yarp.groups[group].type;
        if (type){
          let same_type = this.getGroupByType(type);
          if (same_type){
            this.takeGroup(same_type);
          }
        }
        this.groups.push(group);
        let player = this.player;
        if (player) {
          yarp.groups[group].enter(player);
          mp.events.call('userJoinedGroup',player,this,group);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Take a group.
   * @instance
   * @function takeGroup
   * @memberof yarp.User
   * @param {string} group - Group id.
   * @returns {boolean} - Operation success/fail.
   * @fires userLeftGroup
   */
  takeGroup(group){
    if (yarp.groups[group]) {
      if (this.groups.indexOf(group) > -1) {
        this.groups.splice(this.groups.indexOf(group), 1);
        let player = this.player;
        if (player) {
          yarp.groups[group].leave(player);
          mp.events.call('userLeftGroup',player,this,group);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Get group by type.
   * @instance
   * @function getGroupByType
   * @memberof yarp.User
   * @param {string} type - Group type.
   * @returns {string} - Group id.
   */
  getGroupByType(type){
    this.groups.forEach(function(id){
      let group = yarp.groups[id];
      if (group != null) {
        if (group.type == type){
          return name;
        }
      }
    });
  }

  /**
   * Get groups by types.
   * @instance
   * @function getGroupByTypes
   * @memberof yarp.User
   * @param {Array<string>} type - Group types.
   * @returns {Array<string>} - Group ids.
   */
  getGroupsByTypes(types){
    let groups = [];
    this.groups.forEach(function(id){
      let group = yarp.groups[id];
      if (group != null) {
        if (types.indexOf(group.type) >= 0){
          groups.push(group);
        }
      }
    });
    return groups;
  }

  /**
   * Check if has group.
   * @instance
   * @function hasGroup
   * @memberof yarp.User
   * @param {string} id - Group id.
   * @returns {boolean} - If has or not the group.
   */
  hasGroup(id){
   return (this.groups.indexOf(id) > -1);
  }

  /**
   * Check if has all groups.
   * @instance
   * @function hasGroup
   * @memberof yarp.User
   * @param {Array<string>} id - Group ids.
   * @returns {boolean} - If has or not all the groups.
   */
  hasGroups(groups){
    for (let i = 0; i < groups.length; i++){
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
   * @param {string} permission - Permission.
   * @returns {boolean} - If has or not the permission.
   */
  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    if (permission[0] == '#') {
      let parts = permission.split('.');
      let item = this.inventory[parts[0]];
      let operation = parts[1][0];
      let value = Number(parts[1].splice(1,parts[1].length))
      switch(operation) {
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
      let value = Number(parts[1].splice(1,parts[1].length))
      switch(operation) {
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
      this.groups.forEach(function(id){
        let group = yarp.groups[id];
        if (group != null) {
          if (group.permissions.indexOf('*') > -1){
            result = true;
          }
          if (group.permissions.indexOf(permission) > -1){
            result = true;
          }
          if (group.permissions.indexOf(`-${permission}`) > -1){
            removed = true;
          }
          if (group.permissions.indexOf(`+${permission}`) > -1){
            readd = true;
          }
        }
      });
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
   * @memberof yarp.User
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
   * @memberof yarp.User
   * @param {object} object - Class object.
   */
  static load(obj){
    return new User(obj._id,obj._password,obj._lastLogin,obj._whitelisted,obj._banned,obj._groups,obj._enter,obj._leave);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.User
   * @param {string} file - Config file path.
   */
  static config(file){
    let users = require(file);
    for (let id in users){
      let user = users[id];
      if (yarp.users[id]) {
        for (let group of user.groups){
          yarp.users[id].giveGroup(group);
        }
        if (user.enter) {
          yarp.users[id].enter = user.enter.toString();
        }
        if (user.leave) {
          yarp.users[id].leave = user.leave.toString();
        }
      }
    }
  }
}

module.exports = User;
