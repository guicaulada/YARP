var db = require(`./base.js`).db;
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

exports.tryCreateCharacter = function(player, name, age, sex, jface){
  var character = db.characters.findOne({name : name});
  if(character == null){
    var last_login = {
      ip : player.ip,
      date : utils.getFormattedDate()
    }
    character = {
      social_club : player.socialClub,
      last_login : last_login,
      name : name,
      age : age,
      model : sex,
      wallet : cfg.base.swallet,
      bank : cfg.base.sbank,
      face : JSON.parse(jface),
      health : 100,
      armour : 0,
      position : { "x" : cfg.base.first_spawn.x, "y" : cfg.base.first_spawn.y, "z" : cfg.base.first_spawn.z, "h" : cfg.base.first_spawn.h },
      groups : [],
      weapons : {},
      skills : {},
      inventory : {weight: 0},
      customization : {},
      decoration : {},
      clothes : {}
    };
    db.characters.save(character);
    return character;
  } else {
    return null;
  }
};

exports.updateCharacterWorldData = function(character){
  db.characters.update({name : character.name}, {
    position : { "x" : character.position.x, "y" : character.position.y, "z" : character.position.z, "h" : character.position.h },
    health : character.health,
    armour : character.armour,
  }, {multi: false, upsert: false});
};

exports.getUserByRegistration = function(reg){
  var character = db.characters.findOne({registration: reg});
  if(character != null){
    var user = db.users.findOne({social_club : character.social_club});
    return user;
  } else {
    return null;
  }
};

exports.getPlayerCharacters = function(player){
  var characters = db.characters.find({social_club : player.socialClub});
  for (character of characters) {
    for (name of character.groups) {
      var group = db.groups.findOne({name: name});
      if (group != null && group.type != null) {
        character.groups[group.type] = group.name;
      }
    }
  }
  return characters;
};


exports.getCharacterByPlayer = function(player){
  var character = db.characters.findOne({name: player.name});
  return character;
};

exports.getCharacterByName = function(name){
  var character = db.characters.findOne({name: name});
  return character;
};

exports.tryWalletPayment = function(player, value){
  var character = db.characters.findOne({name: player.name});
  if (character.wallet-value >= 0){
    player.setVariable('PLAYER_WALLET', character.wallet-value);
    db.characters.update({name : character.name}, {wallet : character.wallet-value}, {multi: false, upsert: false});
    return true;
  } else {
    return false;
  }
};

exports.tryBankPayment = function(player, value){
  var character = db.characters.findOne({name: player.name});
  if (character.bank-value >= 0){
    player.setVariable('PLAYER_BANK', character.bank-value);
    operation = {
      type : "Payment",
      date: utils.getFormattedDate(),
      amount : value,
      source : character.name,
      target : ""
    }
    db.atms.save(operation);
    db.characters.update({name : character.name}, {bank : character.bank-value}, {multi: false, upsert: false});
    return true;
  } else {
    return false;
  }
};

exports.tryDeposit = function(player, value){
  var character = db.characters.findOne({name: player.name});
  if (character.wallet-value >= 0){
    player.setVariable('PLAYER_WALLET', character.wallet-value);
    player.setVariable('PLAYER_BANK', character.bank+value);
    operation = {
      type : "Deposit",
      date: utils.getFormattedDate(),
      amount : value,
      source : character.name,
      target : ""
    }
    db.atms.save(operation);
    db.characters.update({name : character.name}, {wallet : character.wallet-value, bank : character.bank+value}, {multi: false, upsert: false});
    return true;
  } else {
    return false;
  }
};

exports.tryWithdraw = function(player, value){
  var character = db.characters.findOne({name: player.name});
  if (character.bank-value >= 0){
    player.setVariable('PLAYER_WALLET', character.wallet+value);
    player.setVariable('PLAYER_BANK', character.bank-value);
    operation = {
      type : "Withdraw",
      date: utils.getFormattedDate(),
      amount : value,
      source : character.name,
      target : ""
    }
    db.atms.save(operation);
    db.characters.update({name : character.name}, {wallet : character.wallet+value, bank : character.bank-value}, {multi: false, upsert: false});
    return true;
  } else {
    return false;
  }
};

exports.tryTransfer = function(player, player2, value){
  var character = db.characters.findOne({name: player.name});
  var target = utils.getPlayerUserCharacter(player2);
  if (target.character != null){
    if (character.bank-value >= 0){
      player.setVariable('PLAYER_BANK', character.bank-value);
      target.player.setVariable('PLAYER_BANK', character.bank+value);
      operation = {
        type : "Transfer",
        date: utils.getFormattedDate(),
        amount : value,
        source : character.name,
        target : target.character.name
      }
      db.atms.save(operation);
      db.characters.update({name : character.name}, {bank : character.bank-value}, {multi: false, upsert: false});
      db.characters.update({name : target.character.name}, {bank : target.character.bank+value}, {multi: false, upsert: false});
      return true;
    }
  }
  return false;
};

exports.getCharacterBalance = function(player){
  let data = utils.getPlayerUserCharacter(player);
  let meSource = db.atms.find({source: data.character.name});
  let meReceiver = db.atms.find({target: data.character.name});
  let balance = meSource.concat(meReceiver);
  return balance;
};

exports.tryGiveInventoryItem = function(player, item, amount){
  if (item != null){
    if (item.weight != null){
      var character = db.characters.findOne({name: player.name});
      if (character.inventory.weight + item.weight < cfg.basics.max_weight){
        if (character.inventory[item.id] != null){
          character.inventory[item.id] = character.inventory[item.id] + amount;
        } else {
          character.inventory[item.id] = amount;
        }
        character.inventory.weight = utils.round(character.inventory.weight + (amount*item.weight),1);
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

exports.tryTakeInventoryItem = function(player, item, amount){
  if (item != null){
    if (item.weight != null){
      var character = db.characters.findOne({name: player.name});
      if (character.inventory[item.id] != null){
        if (character.inventory[item.id] - amount >= 0){
          character.inventory[item.id] = character.inventory[item.id] - amount;
          character.inventory.weight = utils.round(character.inventory.weight - (amount*item.weight),1);
          db.characters.update({name : character.name}, {inventory : character.inventory}, {multi: false, upsert: false});
          return true;
        }
      }
    }
  }
  return false;
};

exports.getInventoryItems = function(player){
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

exports.giveWeapon = function(player, hash, amount){
  var character = db.characters.findOne({name: player.name});
  if (character.weapons[hash] != null){
    character.weapons[hash] = character.weapons[hash]+amount;
  } else {
    character.weapons[hash] = amount;
  }
  db.characters.update({name : character.name}, {weapons : character.weapons}, {multi: false, upsert: false});
};

exports.getWeapons = function(player){
    var character = db.characters.findOne({name: player.name});
    return character.weapons;
};

exports.removeAllWeapons = function(player){
  player.removeAllWeapons();
  var character = db.characters.findOne({name: player.name});
  db.characters.update({name : character.name}, {weapons : {}}, {multi: false, upsert: false});
};

exports.updateWeaponAmmo = function(player, hash, amount){
  var character = db.characters.findOne({name: player.name});
  if (character.weapons[hash] != null) {
    if (character.weapons[hash] + amount >= 0){
      character.weapons[hash] = character.weapons[hash] + amount;
      db.characters.update({name : character.name}, {weapons : character.weapons}, {multi: false, upsert: false});
      return true;
    }
  }
  return false;
};

exports.tryTakeGroup = function(player,name){
  let data = utils.getPlayerUserCharacter(player);
  let result = false;
  if (data.character != null && data.character.groups.indexOf(name) > -1){
    db.characters.update(data.character, {groups : data.character.groups.filter(e => e !== name)}, {multi: false, upsert: false});
    result = true;
  }
  if (data.user != null && data.user.groups.indexOf(name) > -1) {
    db.users.update(data.user, {groups : data.user.groups.filter(e => e !== name)}, {multi: false, upsert: false});
    result = true;
  }
  return result;
};

exports.tryGiveGroup = function(player,name){
  let data = utils.getPlayerUserCharacter(player);
  let group = db.groups.findOne({name: name});
  let result = false;
  if (group != null) {
    if (data.character != null && data.character.groups.indexOf(group) < 0){
      if (group.type != null){
        for (let i = 0; i < data.character.groups; i++){
          let ch_group = db.groups.findOne({name: name});
          if (ch_group.type == group.type){
            data.character.groups = data.character.groups.splice(i, 1)
          }
        }
      }
      data.character.groups.push(group.name);
      db.characters.update(data.character, {groups : data.character.groups}, {multi: false, upsert: false});
      result = true;
    }
    if (data.user != null && data.user.groups.indexOf(group) < 0) {
      if (group.type != null){
        for (let i = 0; i < data.user.groups; i++){
          let ch_group = db.groups.findOne({name: name});
          if (ch_group.type == group.type){
            data.user.groups = data.user.groups.splice(i, 1)
          }
        }
      }
      data.user.groups.push(group.name);
      db.users.update(data.user, {groups : data.user.groups}, {multi: false, upsert: false});
      result = true;
    }
  }
  return result;
};

exports.hasPermission = function(player,permission){
  let data = utils.getPlayerUserCharacter(player);
  let result = false;
  let removed = false;
  let readd = false;
  if (permission[0] == '#') {
    if (data.character != null){
      let parts = permission.split('.');
      let item = data.character.inventory[parts[0]];
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
    if (data.character != null){
      let parts = permission.split('.');
      let skill = data.character.skills[parts[0]];
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
    if (data.user != null){
      data.user.groups.forEach(function(name){
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
    if (data.character != null){
      data.character.groups.forEach(function(name){
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

exports.hasPermissions = function(player,permissions){
  for (let i = 0; i < permissions.length; i++){
    if (!exports.hasPermission(player,permissions[i])) {
      return false;
    }
  }
  return true;
};
