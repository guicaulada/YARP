var db = require('../exports/database.js');
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

exports.tryAddGroup = function(name, type){
  var group = exports.getGroupByName(name);
  if (group == null){
    group = {
      name : name,
      permissions : []
    }
    if (type != null){
      group.type = type;
    }
    db.diskdb.groups.save(group);
    return true;
  }
  return false;
};

exports.tryAddPermission = function(name,permission){
  var group = exports.getGroupByName(name);
  if (group == null){
    return false;
  } else if (group.permissions.indexOf(permission) > -1) {
    return false;
  } else {
    group.permissions.push(permission);
  }
  db.diskdb.groups.update({name : name}, group, {multi: false, upsert: true});
  return true;
};

exports.tryRemoveGroup = function(name){
  var group = exports.getGroupByName(name);
  if (group == null){
    return false;
  } else {
    db.diskdb.groups.remove({name : name});
    return true;
  }
};

exports.tryRemovePermission = function(name,permission){
  var group = exports.getGroupByName(name);
  if (group == null){
    return false;
  } else if (group.permissions.indexOf(permission) < 0){
    return false;
  } else {
    db.diskdb.groups.update({name : name}, {permissions : group.permissions.filter(e => e !== permission)}, {multi: false, upsert: false});
    return true;
  }
};

exports.getGroups = function(){
  return db.diskdb.groups.find();
};

exports.getGroupByName = function(name){
  return db.diskdb.groups.findOne({name : name});
};

exports.getGroupsByType = function(type){
  var groups = exports.getGroups();
  var result = [];
  for (group of groups){
    if (group.type == type){
      result.push(group);
    }
  }
  return result;
};

exports.hasPermission = function(name,permission){
  var group = exports.getGroupByName(name);
  let result = false;
  let removed = false;
  let readd = false;
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
};

exports.hasPermissions = function(player,permissions){
  for (let i = 0; i < permissions.length; i++){
    if (!exports.hasPermission(player,permissions[i])) {
      return false;
    }
  }
  return true;
};
