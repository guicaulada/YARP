var db = require('../exports/database.js');
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

exports.tryCreateCharacter = function(player, name, age, sex, jface){
  var character = db.diskdb.characters.findOne({name : name});
  if(character == null){
    var lastLogin = {
      ip : player.ip,
      date : utils.getFormattedDate()
    }
    character = {
      socialClub : player.socialClub,
      lastLogin : lastLogin,
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
    db.diskdb.characters.save(character);
    return character;
  } else {
    return null;
  }
};

exports.updateCharacterWorldData = function(character){
  db.diskdb.characters.update({name : character.name}, {
    position : { "x" : character.position.x, "y" : character.position.y, "z" : character.position.z, "h" : character.position.h },
    health : character.health,
    armour : character.armour,
  }, {multi: false, upsert: false});
};

exports.getCharactersByPlayer = function(player){
  return db.diskdb.characters.find({socialClub : player.socialClub});
};


exports.getCharacterByPlayer = function(player){
  return db.diskdb.characters.findOne({name: player.name});
};

exports.getCharacterByName = function(name){
  return db.diskdb.characters.findOne({name: name});
};

exports.updateCharacterData = function(name, data){
  return db.diskdb.characters.update({name: name}, data, {multi: false, upsert: false});
};

exports.tryWalletPayment = function(player, value){
  var character = exports.getCharacterByPlayer(player);
  if (character.wallet-value >= 0){
    player.setVariable('PLAYER_WALLET', character.wallet-value);
    exports.updateCharacterData(character.name, {wallet : character.wallet-value});
    return true;
  } else {
    return false;
  }
};

exports.tryBankPayment = function(player, value){
  var character = exports.getCharacterByPlayer(player);
  if (character.bank-value >= 0){
    player.setVariable('PLAYER_BANK', character.bank-value);
    operation = {
      type : "Payment",
      date: utils.getFormattedDate(),
      amount : value,
      source : character.name,
      target : ""
    }
    db.diskdb.atms.save(operation);
    exports.updateCharacterData(character.name, {bank : character.bank-value});
    return true;
  } else {
    return false;
  }
};

exports.tryDeposit = function(player, value){
  var character = exports.getCharacterByPlayer(player);
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
    db.diskdb.atms.save(operation);
    exports.updateCharacterData(character.name, {wallet : character.wallet-value, bank : character.bank+value});
    return true;
  } else {
    return false;
  }
};

exports.tryWithdraw = function(player, value){
  var character = exports.getCharacterByPlayer(player);
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
    db.diskdb.atms.save(operation);
    exports.updateCharacterData(character.name, {wallet : character.wallet+value, bank : character.bank-value});
    return true;
  } else {
    return false;
  }
};

exports.tryTransfer = function(player, player2, value){
  var character = exports.getCharacterByPlayer(player);
  var target = utils.getPlayerUserCharacter(player2);
  if (target != null){
    if (character.bank-value >= 0){
      player.setVariable('PLAYER_BANK', character.bank-value);
      target.player.setVariable('PLAYER_BANK', target.character.bank+value);
      operation = {
        type : "Transfer",
        date: utils.getFormattedDate(),
        amount : value,
        source : character.name,
        target : target.character.name
      }
      db.diskdb.atms.save(operation);
      exports.updateCharacterData(character.name, {bank : character.bank-value});
      exports.updateCharacterData(target.character.name, {bank : target.character.bank+value});
      return true;
    }
  }
  return false;
};

exports.getCharacterBalance = function(player){
  var character = exports.getCharacterByPlayer(player);
  let meSource = db.diskdb.atms.find({source: character.name});
  let meReceiver = db.diskdb.atms.find({target: character.name});
  let balance = meSource.concat(meReceiver);
  return balance;
};

exports.tryGiveInventoryItem = function(player, item, amount){
  if (item != null){
    if (item.weight != null){
      var character = exports.getCharacterByPlayer(player);
      if (character.inventory.weight + item.weight < cfg.base.max_weight){
        if (character.inventory[item.id] != null){
          character.inventory[item.id] = character.inventory[item.id] + amount;
        } else {
          character.inventory[item.id] = amount;
        }
        character.inventory.weight = utils.round(character.inventory.weight + (amount*item.weight),1);
        exports.updateCharacterData(character.name, {inventory : character.inventory});
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
      var character = exports.getCharacterByPlayer(player);
      if (character.inventory[item.id] != null){
        if (character.inventory[item.id] - amount >= 0){
          character.inventory[item.id] = character.inventory[item.id] - amount;
          character.inventory.weight = utils.round(character.inventory.weight - (amount*item.weight),1);
          exports.updateCharacterData(character.name, {inventory : character.inventory});
          return true;
        }
      }
    }
  }
  return false;
};

exports.getInventoryItems = function(player){
    var character = exports.getCharacterByPlayer(player);
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
  var character = exports.getCharacterByPlayer(player);
  if (character.weapons[hash] != null){
    character.weapons[hash] = character.weapons[hash]+amount;
  } else {
    character.weapons[hash] = amount;
  }
  exports.updateCharacterData(character.name, {weapons : character.weapons});
};

exports.getWeapons = function(player){
  return exports.getCharacterByPlayer(player);
};

exports.removeAllWeapons = function(player){
  player.removeAllWeapons();
  var character = exports.getCharacterByPlayer(player);
  exports.updateCharacterData(character.name, {});
};

exports.updateWeaponAmmo = function(player, hash, amount){
  var character = exports.getCharacterByPlayer(player);
  if (character.weapons[hash] != null) {
    if (character.weapons[hash] + amount >= 0){
      character.weapons[hash] = character.weapons[hash] + amount;
      exports.updateCharacterData(character.name, {weapons : character.weapons});
      return true;
    }
  }
  return false;
};

exports.getGroupByType = function(ch_name,type){
  var character = exports.getCharacterByName(ch_name);
  if (character != null){
    for (name of character.groups){
      var group = db.groups.getGroupByName(name);
      if (group.type == type){
        return group.name;
      }
    }
  }
  return null;
};

exports.tryTakeGroupByPlayer = function(player,name){
  var character = exports.getCharacterByPlayer(player);
  if (character != null && character.groups.indexOf(name) > -1){
    exports.updateCharacterData(character.name, {groups : character.groups.filter(e => e !== name)});
    return true;
  }
  return false;
};

exports.tryGiveGroupByPlayer = function(player,name){
  var character = exports.getCharacterByPlayer(player);
  var group = db.groups.getGroupByName(name);
  if (group != null) {
    if (character != null && character.groups.indexOf(name) < 0){
      if (group.type != null){
        for (let i = 0; i < character.groups.length; i++){
          var ch_group = db.groups.getGroupByName(character.groups[i]);
          if (ch_group.type == group.type){
            character.groups.splice(i, 1);
          }
        }
      }
      character.groups.push(group.name);
      exports.updateCharacterData(character.name, {groups : character.groups});
      return true;
    }
  }
  return false;
};

exports.tryTakeGroupByName = function(ch_name,name){
  var character = exports.getCharacterByName(ch_name);
  if (character != null && character.groups.indexOf(name) > -1){
    exports.updateCharacterData(character.name, {groups : character.groups.filter(e => e !== name)});
    return true;
  }
  return false;
};

exports.tryGiveGroupByName = function(ch_name,name){
  var character = exports.getCharacterByName(ch_name);
  var group = db.groups.getGroupByName(name);
  if (group != null) {
    if (character != null && character.groups.indexOf(name) < 0){
      if (group.type != null){
        for (let i = 0; i < character.groups.length; i++){
          var ch_group = db.groups.getGroupByName(character.groups[i]);
          if (ch_group.type == group.type){
            character.groups.splice(i, 1);
          }
        }
      }
      character.groups.push(group.name);
      exports.updateCharacterData(character.name, {groups : character.groups});
      return true;
    }
  }
  return false;
};

exports.hasPermission = function(player,permission){
  var character = exports.getCharacterByPlayer(player);
  let result = false;
  let removed = false;
  let readd = false;
  if (permission[0] == '#') {
    if (character != null){
      let parts = permission.split('.');
      let item = character.inventory[parts[0]];
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
    if (character != null){
      let parts = permission.split('.');
      let skill = character.skills[parts[0]];
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
    if (character != null){
      character.groups.forEach(function(name){
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
