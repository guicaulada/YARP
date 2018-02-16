var db = require('diskdb'); // https://www.npmjs.com/package/diskdb
var bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
var utils = require(`./utils.js`);
var cfg = require('./config.js');

db.connect('./packages/YARP/_db');
db.loadCollections(['users','groups','characters']);
exports.db = db;

exports.users = {};
exports.groups = {};
exports.characters = {};

//Users DB Interaction
exports.users.getUserByPlayer = function(player){
  var user = db.users.findOne({social_club : player.socialClub});
  return user;
};

exports.users.verifyAuthentication = function(player, password){
  var user = db.users.findOne({social_club : player.socialClub});
  var last_login = {
    ip : player.ip,
    date : utils.getFormattedDate()
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
      groups : ["user"]
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

//Characters DB Interaction
exports.characters.createCharacter = function(player, name, age, sex, jface){
  var character = db.characters.findOne({name : name});
  if(character == null){
    var last_login = {
      ip : player.ip,
      date : utils.getFormattedDate()
    }
    character = {
      id : db.characters.count()+1,
      social_club : player.socialClub,
      last_login : last_login,
      groups : ["user"],
      job : "Citizen",
      name : name,
      age : age,
      model : sex,
      wallet : cfg.swallet,
      bank : cfg.sbank,
      registration : utils.generateRegistration(),
      face : JSON.parse(jface),
      health : 100,
      armour : 0,
      position : { "x" : cfg.basics.first_spawn.x, "y" : cfg.basics.first_spawn.y, "z" : cfg.basics.first_spawn.z, "h" : cfg.basics.first_spawn.h },
      weapons : {},
      inventory : {weight: 0},
      customization : {},
      decoration : {},
      clothes : {}
    };
    db.characters.save(character);
    return db.characters.find({social_club : player.socialClub});
  } else {
    return null;
  }
};

exports.characters.updateCharacterWorldData = function(character){
  db.characters.update({name : character.name}, {
    position : { "x" : character.position.x, "y" : character.position.y, "z" : character.position.z, "h" : character.position.h },
    health : character.health,
    armour : character.armour,
  }, {multi: false, upsert: false});
};

exports.characters.getUserByRegistration = function(reg){
  var character = db.characters.findOne({registration: reg});
  if(character != null){
    var user = db.users.findOne({social_club : character.social_club});
    return user;
  } else {
    return null;
  }
};

exports.characters.getPlayerCharacters = function(player){
  var characters = db.characters.find({social_club : player.socialClub});
  return characters;
};


exports.characters.getCharacterByPlayer = function(player){
  var character = db.characters.findOne({name: player.name});
  return character;
};

exports.characters.tryWalletPayment = function(player, value){
  var character = db.characters.findOne({name: player.name});
  if (character.wallet-value >= 0){
    db.characters.update({name : character.name}, {wallet : character.wallet-value}, {multi: false, upsert: false});
    player.notify(`Paid ~r~$${value}.`);
    return true;
  } else {
    player.notify(`~r~Not enough money in your wallet.`);
    return false;
  }
};

exports.characters.tryBankPayment = function(player, value){
  var character = db.characters.findOne({name: player.name});
  if (character.bank-value >= 0){
    db.characters.update({name : character.name}, {bank : character.bank-value}, {multi: false, upsert: false});
    player.notify(`Paid ~r~$${value}.`);
    return true;
  } else {
    player.notify(`~r~Not enough money in your bank.`);
    return false;
  }
};

exports.characters.tryGiveInventoryItem = function(player, id, amount){
  var item = cfg.items[id];
  if (item != null){
    var character = db.characters.findOne({name: player.name});
    if (character.inventory.weight+item.weight < cfg.basics.max_weight){
      if (character.inventory[id] != null){
        character.inventory[id] = character.inventory[id]+amount;
      } else {
        character.inventory[id] = amount;
      }
      character.inventory.weight = character.inventory.weight + (amount*item.weight)
      db.characters.update({name : character.name}, {inventory : character.inventory}, {multi: false, upsert: false});
      player.notify(`Received ~g~${amount} ${item.name}.`);
      return true;
    } else {
      player.notify(`~r~Inventory is full.`);
      return false;
    }
  } else {
    player.notify(`~r~ERROR: Invalid item.`);
  }
};
//Groups DB Interaction
exports.groups.addGroup = function(name){
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

exports.groups.addPermission = function(name,permission){
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

exports.groups.removeGroup = function(name){
  var group = db.groups.findOne({name : name});
  if (group == null){
    return false;
  } else {
    db.groups.remove({name : name});
    return true;
  }
};

exports.groups.removePermission = function(name,permission){
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

exports.groups.takeGroup = function(userid,group){
  var user = db.users.findOne({id : parseInt(userid)});
  if (user == null){
    return false;
  } else {
    db.users.update(user, {groups : user.groups.filter(e => e !== group)}, {multi: false, upsert: false});
    return true;
  }
};

exports.groups.giveGroup = function(userid,group){
  var user = db.users.findOne({id : parseInt(userid)});
  if (user == null){
    return false;
  } else {
    user.groups.push(group);
    db.users.update(user, {groups : user.groups}, {multi: false, upsert: false});
    return true;
  }
};

exports.groups.hasPermission = function(player,permission){
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
