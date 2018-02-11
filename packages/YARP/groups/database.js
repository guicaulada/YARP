var db = require('../base/database.js').db;

module.exports = {
  //Group Database Interaction
  addGroup : function(name){
    var group = db.groups.findOne({name : name});
    if (group == null){
      group = {
        name : name,
        permissions : []
      }
      db.groups.save(group);
      return true;
    }
    return false;
  },
  addPermission: function(name,permission){
    var group = db.groups.findOne({name : name});
    if (group == null){
      group = {
        name : name,
        permissions : [permission]
      }
    } else if (group.permissions.indexOf(permission) > -1) {
      return false;
    } else {
      group.permissions.push(permission);
    }
    db.groups.update({name : name}, group, {multi: false, upsert: true});
    return true;
  },
  removeGroup : function(name){
    var group = db.groups.findOne({name : name});
    if (group == null){
      return false;
    } else {
      db.groups.remove({name : name});
      return true;
    }
  },
  removePermission: function(name,permission){
    var group = db.groups.findOne({name : name});
    if (group == null){
      return false;
    } else if (group.permissions.indexOf(permission) < 0){
      return false;
    } else {
      db.groups.update({name : name}, {permissions : group.permissions.filter(e => e !== permission)}, {multi: false, upsert: false});
      return true;
    }
  },
  takeGroup : function(userid,group){
    var user = db.users.findOne({id : parseInt(userid)});
    if (user == null){
      return false;
    } else {
      db.users.update(user, {groups : user.groups.filter(e => e !== group)}, {multi: false, upsert: false});
      return true;
    }
  },
  giveGroup : function(userid,group){
    var user = db.users.findOne({id : parseInt(userid)});
    if (user == null){
      return false;
    } else {
      user.groups.push(group);
      db.users.update(user, {groups : user.groups}, {multi: false, upsert: false});
      return true;
    }
  },
  hasPermission : function(player,permission){
    var user = db.users.findOne({identifier : player.socialClub});
    var result = false;
    var removed = false;
    var readd = false;
    user.groups.forEach(function(g){
      var group = db.groups.findOne({name : g});
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
};
