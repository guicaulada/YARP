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
exports.characters.tryCreateCharacter = function(player, name, age, sex, jface){
  var character = db.characters.findOne({name : name});
  if(character == null){
    var last_login = {
      ip : player.ip,
      date : utils.getFormattedDate()
    }
    character = {
      social_club : player.socialClub,
      last_login : last_login,
      groups : ["user"],
      profession : "Citizen",
      name : name,
      age : age,
      model : sex,
      wallet : cfg.basics.swallet,
      bank : cfg.basics.sbank,
      registration : utils.generateRegistration(),
      face : JSON.parse(jface),
      health : 100,
      armour : 0,
      position : { "x" : cfg.basics.first_spawn.x, "y" : cfg.basics.first_spawn.y, "z" : cfg.basics.first_spawn.z, "h" : cfg.basics.first_spawn.h },
      weapons : {},
      skills : {},
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
    return true;
  } else {
    return false;
  }
};

exports.characters.tryBankPayment = function(player, value){
  var character = db.characters.findOne({name: player.name});
  if (character.bank-value >= 0){
    db.characters.update({name : character.name}, {bank : character.bank-value}, {multi: false, upsert: false});
    return true;
  } else {
    return false;
  }
};

exports.characters.tryGiveInventoryItem = function(player, item, amount){
  if (item != null){
    if (item.weight != null){
      var character = db.characters.findOne({name: player.name});
      if (character.inventory.weight+item.weight < cfg.basics.max_weight){
        if (character.inventory[id] != null){
          character.inventory[id] = character.inventory[id]+amount;
        } else {
          character.inventory[id] = amount;
        }
        character.inventory.weight = character.inventory.weight + (amount*item.weight)
        db.characters.update({name : character.name}, {inventory : character.inventory}, {multi: false, upsert: false});
        return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.characters.getInventoryItems = function(player){
    var character = db.characters.findOne({name: player.name});
    let items = [];
    for (item_id in character.inventory){
      let item = cfg.items[item_id];
      if (item != null){
        item.amount = character.inventory[item_id];
        item.id = item_id;
        items.push(item);
      }
    }
    return items
};

exports.characters.giveWeapon = function(player, hash, amount){
  var character = db.characters.findOne({name: player.name});
  if (character.weapons[weaponHash] != null){
    character.weapons[weaponHash] = character.weapons[weaponHash]+amount;
  } else {
    character.weapons[weaponHash] = amount;
  }
  db.characters.update({name : character.name}, {weapons : character.weapons}, {multi: false, upsert: false});
};

exports.characters.getWeapons = function(player){
    var character = db.characters.findOne({name: player.name});
    return character.weapons;
};

exports.characters.removeAllWeapons = function(player){
  player.removeAllWeapons();
  var character = db.characters.findOne({name: player.name});
  db.characters.update({name : character.name}, {weapons : {}}, {multi: false, upsert: false});
};

exports.characters.tryRemoveBullets = function(player, hash, amount){
  var character = db.characters.findOne({name: player.name});
  if (character.weapons[hash] != null) {
    if (character.weapons[hash] - amount >= 0){
      character.weapons[hash] = character.weapons[hash] - amount;
      db.characters.update({name : character.name}, {weapons : character.weapons}, {multi: false, upsert: false});
      return true;
    }
  }
  return false;
};


exports.characters.setProfession = function(player,profession){
  var character = db.characters.findOne({name: player.name});
  let result = false;
  if (character != null){
    db.characters.update({name : player.name}, {profession : profession}, {multi: false, upsert: false});
    return true;
  }
  return false;
};

exports.characters.getProfession = function(player,group){
  var character = db.characters.findOne({name: player.name});
  return character.profession;
};

//Groups DB Interaction
exports.groups.tryAddGroup = function(name, job){
  var group = db.groups.findOne({name : name});
  if (group == null){
    group = {
      name : name,
      job: job,
      permissions : []
    }
    db.groups.save(group);
    return true;
  }
  return false;
};

exports.groups.tryAddPermission = function(name,permission){
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

exports.groups.tryRemoveGroup = function(name){
  var group = db.groups.findOne({name : name});
  if (group == null){
    return false;
  } else {
    db.groups.remove({name : name});
    return true;
  }
};

exports.groups.tryRemovePermission = function(name,permission){
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

exports.groups.tryTakeGroup = function(player,group){
  let dbdata = utils.getUserAndOrCharacter(player);
  let result = false;
  if (dbdata.character != null && dbdata.character.groups.indexOf(group) > -1)){
    db.characters.update(dbdata.character, {groups : dbdata.character.groups.filter(e => e !== group)}, {multi: false, upsert: false});
    result = true;
  }
  if (dbdata.user != null && dbdata.user.groups.indexOf(group) > -1)) {
    db.users.update(dbdata.user, {groups : dbdata.user.groups.filter(e => e !== group)}, {multi: false, upsert: false});
    result = true;
  }
  return result;
};

exports.groups.tryGiveGroup = function(player,group){
  let dbdata = utils.getUserAndOrCharacter(player);
  let result = false;
  if (dbdata.character != null && dbdata.character.groups.indexOf(group) < 0)){
    dbdata.character.groups.push(group);
    db.characters.update(dbdata.character, {groups : dbdata.character.groups}, {multi: false, upsert: false});
    result = true;
  }
  if (dbdata.user != null && dbdata.user.groups.indexOf(group) < 0)) {
    dbdata.user.groups.push(group);
    db.users.update(dbdata.user, {groups : dbdata.user.groups}, {multi: false, upsert: false});
    result = true;
  }
  return result;
};

exports.groups.hasPermission = function(player,permission){
  let dbdata = utils.getUserAndCharacter(player);
  let result = false;
  let removed = false;
  let readd = false;
  if (permission[0] == '#') {
    if (dbdata.character != null){
      let parts = permission.split('.');
      let item = dbdata.character.inventory[parts[0]];
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
    }
  } else if (permission[0] == '@') {
    if (dbdata.character != null){
      let parts = permission.split('.');
      let skill = dbdata.character.skills[parts[0]];
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
    }
  } else {
    if (dbdata.user != null){
      dbdata.user.groups.forEach(function(name){
        let group = db.groups.findOne({name : name});
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
    if (dbdata.character != null){
      dbdata.character.groups.push(dbdata.character.job);
      dbdata.character.groups.forEach(function(name){
        let group = db.groups.findOne({name : name});
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
  }
  if (removed && !readd){
    result = false;
  }
  return result;
};

exports.groups.hasPermissions = function(player,permissions){
  for (let i = 0; i < permissions.length; i++){
    if (!exports.groups.hasPermission(player,permissions[i])) {
      return false;
    }
  }
  return true;
};
