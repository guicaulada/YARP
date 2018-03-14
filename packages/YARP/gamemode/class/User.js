'use strict';
/**
 * @file User class
 */
let bcrypt = require('bcryptjs');
module.exports = class User{
  constructor(_id, password, lastLogin, whitelisted, banned, groups){
    if ((typeof _id) === 'object' || (_id && password) != null){
      this._id = _id._id || _id;
      this.password = _id.password || bcrypt.hashSync(password, 10);
      this.lastLogin = _id.lastLogin || lastLogin || "";
      this.whitelisted =  _id.whitelisted || whitelisted || false;
      this.banned = _id.banned || banned || false;
      this.groups = _id.groups || groups || [];
    }
  }

  static load(){
    return yarp.dbm.load(User);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }

  get player(){
    for (let player of mp.players.toArray()) {
      if (player.socialClub == this._id){
        return player;
      }
    }
    return null;
  }

  get characters(){
    let characters = {};
    for (let id in yarp.characters){
      let character = yarp.characters[id];
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

  joinedGroup(group){
    let player = this.player;
    if (group) {
      if (yarp.groups[group].cb_in){
        let cb = eval(yarp.groups[group].cb_in);
        cb(player);
        mp.events.call('yarp_userJoinedGroup',player,this,group);
      }
    } else {
      for (let group of this.groups){
        if (yarp.groups[group].cb_in){
          let cb = eval(yarp.groups[group].cb_in);
          cb(player);
          mp.events.call('yarp_userJoinedGroup',player,this,group);
        }
      }
    }
  }

  leftGroup(group){
    let player = this.player;
    if (group) {
      if (yarp.groups[group].cb_out){
        let cb = eval(yarp.groups[group].cb_out);
        cb(player);
        mp.events.call('yarp_userLeftGroup',player,this,group);
      }
    } else {
      for (let group of this.groups){
        if (yarp.groups[group].cb_out){
          let cb = eval(yarp.groups[group].cb_out);
          cb(player);
          mp.events.call('yarp_userLeftGroup',player,this,group);
        }
      }
    }
  }

  giveGroup(group){
    if (this.groups.indexOf(group) == -1) {
      let type = yarp.groups[group].type;
      if (type){
        let same_type = this.getGroupByType(type);
        if (same_type){
          this.takeGroup(same_type);
          this.leftGroup(group);
        }
      }
      this.groups.push(group);
      this.joinedGroup(group);
      return true;
    }
    return false;
  }
  takeGroup(group){
    if (this.groups.indexOf(group) > -1) {
      this.groups.splice(this.groups.indexOf(group), 1);
      this.leftGroup(group);
      return true;
    }
    return false;
  }

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
    });
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

  isDev(){
    return yarp.variables.devs.value.indexOf(this._id) > -1
  }
}
