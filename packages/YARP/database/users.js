var bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
var db = require('../exports/database.js');
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

exports.getUserByPlayer = function(player){
  return db.diskdb.users.findOne({socialClub : player.socialClub});
};

exports.getUserBySocialClub = function(socialClub){
  return db.diskdb.users.findOne({socialClub : socialClub});
};

exports.updateUserData = function(socialClub, data){
  db.diskdb.users.update({socialClub: socialClub}, data, {multi: false, upsert: false});
};

exports.getAuthUser = function(player, password){
  var user = exports.getUserByPlayer(player);
  var lastLogin = {
    ip : player.ip,
    date : utils.getFormattedDate()
  }
  if (user == null) {
    var hash = bcrypt.hashSync(password, 10);
    user = {
      socialClub : player.socialClub,
      password : hash,
      lastLogin : lastLogin,
      whitelisted : false,
      banned : false,
      groups : []
    };
    db.diskdb.users.save(user);
  } else {
    if(bcrypt.compareSync(password, user.password)){
      exports.updateUserData(user.socialClub, {lastLogin : lastLogin})
    } else {
      user = null;
    }
  }
  return user;
};

exports.getGroupByType = function(player,type){
  var user = exports.getUserByPlayer(player);
  if (user != null){
    for (name of user.groups){
      var group = db.groups.getGroupByName(name);
      if (group.type == type){
        return group.name;
      }
    }
  }
  return null;
};

exports.tryTakeGroupByPlayer = function(player,name){
  var user = exports.getUserByPlayer(player);
  if (user != null && user.groups.indexOf(name) > -1){
    exports.updateUserData(user.socialClub, {groups : user.groups.filter(e => e !== name)});
    return true;
  }
  return false;
};

exports.tryGiveGroupByPlayer = function(player,name){
  var user = exports.getUserByPlayer(player);
  var group = db.groups.getGroupByName(name);
  if (group != null) {
    if (user != null && user.groups.indexOf(name) < 0){
      if (group.type != null){
        for (let i = 0; i < user.groups.length; i++){
          var u_group = db.groups.getGroupByName(user.groups[i]);
          if (u_group.type == group.type){
            user.groups.splice(i, 1);
          }
        }
      }
      user.groups.push(group.name);
      exports.updateUserData(user.socialClub, {groups : user.groups});
      return true;
    }
  }
  return false;
};

exports.tryTakeGroupBySocialClub = function(socialClub,name){
  var user = exports.getUserBySocialClub(socialClub);
  if (user != null && user.groups.indexOf(name) > -1){
    exports.updateUserData(user.socialClub, {groups : user.groups.filter(e => e !== name)});
    return true;
  }
  return false;
};

exports.tryGiveGroupBySocialClub = function(socialClub,name){
  var user = exports.getUserBySocialClub(socialClub);
  var group = db.groups.getGroupByName(name);
  if (group != null) {
    if (user != null && user.groups.indexOf(name) < 0){
      if (group.type != null){
        for (let i = 0; i < user.groups.length; i++){
          var u_group = db.groups.getGroupByName(user.groups[i]);
          if (u_group.type == group.type){
            user.groups.splice(i, 1);
          }
        }
      }
      user.groups.push(group.name);
      exports.updateUserData(user.socialClub, {groups : user.groups});
      return true;
    }
  }
  return false;
};

exports.hasPermission = function(player,permission){
  var user = exports.getUserByPlayer(player);
  let result = false;
  let removed = false;
  let readd = false;
  if (user != null){
    user.groups.forEach(function(name){
      var group = db.groups.getGroupByName(name);
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
  }
  if (removed && !readd){
    result = false;
  }
  return result;
};

exports.hasPermissions = function(player,permissions){
  for (let i = 0; i < permissions.length; i++){
    if (!exports.hasPermission(player,permissions[i])) {
      return false;
    }
  }
  return true;
};
