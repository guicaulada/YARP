'use strict';
/**
 * @file User class
 */
let bcrypt = require('bcryptjs');
module.exports = class User{
  constructor(id, password){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.password = id.password;
      this.lastLogin =  id.lastLogin;
      this.whitelisted = id.whitelisted;
      this.banned = id.banned;
      this.groups = id.groups;
    } else if ((id && password) != null){
      this._id = id;
      this.password = bcrypt.hashSync(password, 10);
      this.lastLogin =  "";
      this.whitelisted = false;
      this.banned = false;
      this.groups = [];
    }
  }

  save(){
    yarp.Manager.save(this);
  }

  get player(){
    mp.players.forEach((player, i) => {
      if (player.socialClub == this._id){
        return player;
      }
    });
    return null;
  }

  get characters(){
    let characters = {};
    for (let id in yarp.characters){
      let character = yarp.characters[id]
      if (character.socialClub == this._id){
        characters[id] = character;
      }
    }
    return characters;
  }

  get character(){
    mp.players.forEach((player, i) => {
      if (player.socialClub == this._id){
        return yarp.characters[player.name];
      }
    });
    return null;
  }

  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  verifyPassword(password){
    return bcrypt.compareSync(password, this.password);
  }

  addGroup(group){
    if (this.groups.indexOf(permission) == -1) {
      this.groups.push(permission);
    }
  }
  removeGroup(group){
    if (this.groups.indexOf(group) > -1) {
      this.groups.splice(this.groups.indexOf(permission), 1);
    }
  }

  getGroupByType(type){
    yarp.GroupManager.indexById().then(groups => {
      this.groups.forEach(function(name){
        let group = groups[name];
        if (group != null) {
          if (group.type == type){
            return name;
          }
        }
      });
    });
  }

  hasGroup(id){
   return (this.groups.indexOf(id) > -1);
  }

  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    this.groups.forEach(function(id){
      let group = yarp.groups[id];
      if (group != null) {
        if (group.permissions.indexOf("*") > -1){
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
      if (removed && !readd){
        result = false;
      }
      return result;
    });
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
