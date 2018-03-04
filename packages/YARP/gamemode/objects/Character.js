'use strict';
/**
 * @file Character class
 */
let Transaction = require('./Transaction');
let TransactionManager = require('../managers/TransactionManager');
let ItemManager = require('../managers/ItemManager');
let GroupManager = require('../managers/GroupManager');
module.exports = class Character{
  constructor(socialClub, id, age, sex, face){
    this._id = id;
    this.socialClub = socialClub;
    this.lastLogin = "";
    this.age = age;
    this.model = sex;
    this.wallet = yarp.cfg.gamemode.swallet;
    this.bank = yarp.cfg.gamemode.sbank;
    this.face = face;
    this.health = 100;
    this.armour = 0;
    this.position = { "x" : yarp.cfg.gamemode.first_spawn.x, "y" : yarp.cfg.gamemode.first_spawn.y, "z" : yarp.cfg.gamemode.first_spawn.z, "h" : yarp.cfg.gamemode.first_spawn.h };
    this.groups = [];
    this.weapons = {};
    this.skills = {};
    this.weight = 0;
    this.inventory = {};
    this.customization = {};
    this.decoration = {};
    this.clothes = {}
  }

  get player(){
    mp.players.forEach((player, i) => {
      if (player.name == this.name){
        return player;
      }
    });
    return null;
  }

  get balance(){
    return TransactionManager.getBalance(this.name);
  }

  updateLastLogin(ip){
    this.lastLogin = `${ip} | ${utils.getTimestamp(new Date())}`;
  }

  addGroup(group){
    if (this.groups.indexOf(permission) == -1) {
      this.groups.push(permission);
      return true;
    }
    return false;
  }
  removeGroup(group){
    if (this.groups.indexOf(group) > -1) {
      this.groups.splice(this.groups.indexOf(permission), 1);
      return true;
    }
    return false;
  }

  chargeWallet(value){
    if (this.wallet-value >= 0){
      player.setVariable('PLAYER_WALLET', this.wallet-value);
      this.wallet = this.wallet-value;
      return true;
    }
    return false;
  }

  chargeBank(value){
    if (this.bank-value >= 0){
      player.setVariable('PLAYER_BANK', this.bank-value);
      let transaction = new Transaction("Payment",value,this.name);
      transaction.save();
      this.bank = this.bank-value;
      return true;
    }
    return false;
  }

  deposit(value){
    if (this.wallet-value >= 0){
      player.setVariable('PLAYER_WALLET', this.wallet-value);
      player.setVariable('PLAYER_BANK', this.bank+value);
      let transaction = new Transaction("Deposit",value,this.name);
      transaction.save();
      this.wallet = this.wallet-value;
      this.bank = this.bank+value;
      return true;
    }
    return false;
  }

  withdraw(value){
    if (this.bank-value >= 0){
      player.setVariable('PLAYER_WALLET', this.wallet+value);
      player.setVariable('PLAYER_BANK', this.bank-value);
      let transaction = new Transaction("Withdraw",value,this.name);
      transaction.save();
      this.wallet = this.wallet+value;
      this.bank = this.bank-value;
      return true;
    }
    return false;
  }

  transfer(target, value){
    if (this.bank-value >= 0){
      player.setVariable('PLAYER_BANK', this.bank-value);
      target.player.setVariable('PLAYER_BANK', this.character.bank+value);
      let transaction = new Transaction("Transfer",value,this.name);
      transaction.save();
      this.bank = this.bank-value;
      target.bank = target.bank+value;
      return true;
    }
    return false;
  }

  giveItem(item, amount){
    if (this.weight + item.weight < yarp.cfg.gamemode.max_weight){
      if (this.inventory[item.id] != null){
        this.inventory[item.id] = this.inventory[item.id] + amount;
      } else {
        this.inventory[item.id] = amount;
      }
      this.weight = utils.round(this.weight + (amount*item.weight),1);
      return true;
    }
    return false;
  }

  takeItem(item, amount){
    if (this.inventory[item.id] != null){
      if (this.inventory[item.id] - amount >= 0){
        this.inventory[item.id] = this.inventory[item.id] - amount;
        this.weight = yarp.utils.round(this.weight - (amount*item.weight),1);
        return true;
      }
    }
    return false;
  }

  giveWeapon(hash, amount){
    if (this.weapons[hash] != null){
      this.weapons[hash] = this.weapons[hash]+amount;
    } else {
      this.weapons[hash] = amount;
    }
  }

  getGroupByType(type){
    for (name of this.groups){
      var group = GroupManager.getByName(name);
      if (group.type == type){
        return group.name;
      }
    }
    return null;
  }

  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    if (permission[0] == '#') {
      if (character != null){
        let parts = permission.split('.');
        let item = this.inventory[parts[0]];
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
        let skill = this.skills[parts[0]];
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
        var groups = GroupManager.indexById();
        this.groups.forEach(function(name){
          let group = groups[name];
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
  }

  hasPermissions(permissions){
    for (let i = 0; i < permissions.length; i++){
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }
}
