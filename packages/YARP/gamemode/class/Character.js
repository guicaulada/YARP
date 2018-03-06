'use strict';
/**
 * @file Character class
 */
module.exports = class Character{
  constructor(id, socialClub, age, sex, face){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.socialClub = id.socialClub;
      this.lastLogin = id.lastLogin;
      this.age = id.age;
      this.model = id.model;
      this.wallet = id.wallet;
      this.bank = id.bank;
      this.face = id.face;
      this.health = id.health;
      this.armour = id.armour;
      this.position = id.position;
      this.heading = id.heading;
      this.groups = id.groups;
      this.weapons = id.weapons;
      this.skills = id.skills;
      this.weight = id.weight;
      this.inventory = id.inventory;
      this.customization = id.costumization;
      this.decoration = id.decoration;
      this.clothes = id.clothes;
    } else if ((id && socialClub && age && sex && face) != null){
      this._id = id;
      this.socialClub = socialClub;
      this.lastLogin = "";
      this.age = age;
      this.model = sex;
      this.wallet = yarp.configs.swallet.value;
      this.bank = yarp.configs.sbank.value;
      this.face = face;
      this.health = 100;
      this.armour = 0;
      this.position = yarp.configs.first_spawn.value;
      this.heading = yarp.configs.first_heading.value;
      this.groups = [];
      this.weapons = {};
      this.skills = {};
      this.weight = 0;
      this.inventory = {};
      this.customization = {};
      this.decoration = {};
      this.clothes = {};
    }
  }

  save(){
    yarp.Manager.save(this);
  }

  get player(){
    mp.players.forEach((player, i) => {
      if (player.name == this._id){
        return player;
      }
    });
    return null;
  }

  get user(){
    mp.players.forEach((player, i) => {
      if (player.socialClub == this.socialClub){
        return yarp.users[player.socialClub];
      }
    });
    return null;
  }

  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
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
      yarp.TransactionManager.add(transaction);
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
      yarp.TransactionManager.add(transaction);
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
      yarp.TransactionManager.add(transaction);
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
      yarp.TransactionManager.add(transaction);
      this.bank = this.bank-value;
      target.bank = target.bank+value;
      return true;
    }
    return false;
  }

  giveItem(item, amount){
    if (this.weight + item.weight < yarp.configs.max_weight){
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

  hasGroup(id){
   return (this.groups.indexOf(id) > -1);
  }

  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    if (permission[0] == '#') {
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
    } else if (permission[0] == '@') {
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
    } else {
      this.groups.forEach(function(id){
        let group = yarp.groups[id];
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
