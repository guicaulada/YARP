var db = require(`./base.js`).db;
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

exports.tryAddGroup = function(name, type){
  var group = db.groups.findOne({name : name});
  if (group == null){
    group = {
      name : name,
      permissions : []
    }
    if (type != null){
      group.type = type;
    }
    db.groups.save(group);
    return true;
  }
  return false;
};

exports.tryAddPermission = function(name,permission){
  var group = db.groups.findOne({name : name});
  if (group == null){
    return false;
  } else if (group.permissions.indexOf(permission) > -1) {
    return false;
  } else {
    group.permissions.push(permission);
  }
  db.groups.update({name : name}, group, {multi: false, upsert: true});
  return true;
};

exports.tryRemoveGroup = function(name){
  var group = db.groups.findOne({name : name});
  if (group == null){
    return false;
  } else {
    db.groups.remove({name : name});
    return true;
  }
};

exports.tryRemovePermission = function(name,permission){
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
