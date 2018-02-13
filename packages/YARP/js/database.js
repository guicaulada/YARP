
var db = require('diskdb');
var bcrypt = require('bcryptjs');
var utils = require(`./utils.js`);
var cfg = require('./config.js');

db.connect('./packages/YARP/_db');
db.loadCollections(['users','groups']);
exports.db = db;

exports.USERS = {};
exports.GROUPS = {};

//Users Database Interaction
exports.USERS.getUserByPlayer = function(player){
  var user = db.users.findOne({social_club : player.socialClub});
  return user
};

exports.USERS.getUserByRegistration = function(reg){
  var user = db.users.findOne({characters : {registration: reg}});
  return user
};

exports.USERS.verifyAuthentication = function(player, password){
  var user = db.users.findOne({social_club : player.socialClub});
  var last_login = {
    ip : player.ip,
    date : utils.FUNCTIONS.getFormattedDate()
  }
  if (user == null) {
    var hash = bcrypt.hashSync(password, 10);
    user = {
      id : db.users.count()+1,
      social_club : player.socialClub,
      password : hash,
      last_login : last_login,
      whitelisted : false,
      banned : false,
      groups : ["user"],
      characters : []
    };
    db.users.save(user);
  } else {
    if(bcrypt.compareSync(password, user.password)){
      db.users.update(user, {last_login : last_login}, {multi: false, upsert: false});
    } else {
      user = null;
    }
  }
  return user;
};

exports.USERS.createCharacter = function(player, name, age, jskin){
  var user = db.users.findOne({social_club : player.socialClub});
  var last_login = {
    ip : player.ip,
    date : utils.FUNCTIONS.getFormattedDate()
  }
  character = {
    id :user.characters.length+1,
    last_login : last_login,
    groups : ["user"],
    job : "citizen",
    name : name,
    age : age,
    money : cfg.swallet,
    registration : utils.FUNCTIONS.generateRegistration(),
    customization : jskin,
    weapons : [],
    inventory : []
  };
  user.characters.push(character);
  db.users.update(user, {characters : user.characters}, {multi: false, upsert: false});
  return user;
};

//Group Database Interaction
exports.GROUPS.addGroup = function(name){
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
};

exports.GROUPS.addPermission = function(name,permission){
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
};

exports.GROUPS.removeGroup = function(name){
  var group = db.groups.findOne({name : name});
  if (group == null){
    return false;
  } else {
    db.groups.remove({name : name});
    return true;
  }
};

exports.GROUPS.removePermission = function(name,permission){
  var group = db.groups.findOne({name : name});
  if (group == null){
    return false;
  } else if (group.permissions.indexOf(permission) < 0){
    return false;
  } else {
    db.groups.update({name : name}, {permissions : group.permissions.filter(e => e !== permission)}, {multi: false, upsert: false});
    return true;
  }
};

exports.GROUPS.takeGroup = function(userid,group){
  var user = db.users.findOne({id : parseInt(userid)});
  if (user == null){
    return false;
  } else {
    db.users.update(user, {groups : user.groups.filter(e => e !== group)}, {multi: false, upsert: false});
    return true;
  }
};

exports.GROUPS.giveGroup = function(userid,group){
  var user = db.users.findOne({id : parseInt(userid)});
  if (user == null){
    return false;
  } else {
    user.groups.push(group);
    db.users.update(user, {groups : user.groups}, {multi: false, upsert: false});
    return true;
  }
};

exports.GROUPS.hasPermission = function(player,permission){
  var user = db.users.findOne({social_club : player.socialClub});
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
};
