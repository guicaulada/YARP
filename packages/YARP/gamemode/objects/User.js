'use strict';
/**
 * @file User class
 */
let bcrypt = require('bcryptjs');
module.exports = class User{
  constructor(socialClub, password){
    if (socialClub && password){
      this._id = socialClub;
      this.password = bcrypt.hashSync(password, 10);
      this.lastLogin =  "";
      this.whitelisted = false;
      this.banned = false;
      this.groups = [];
    }
  }

  get player(){
    mp.players.forEach((player, i) => {
      if (player.socialClub == this.socialClub){
        return player;
      }
    });
    return null;
  }

  updateLastLogin(ip){
    this.lastLogin = `${ip} | ${yarp.utils.getTimestamp(new Date())}`;
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

  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    yarp.GroupManager.indexById().then(groups => {
      this.groups.forEach(function(name){
        let group = groups[name];
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
      });
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
