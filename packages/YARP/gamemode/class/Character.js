'use strict';
/**
 * @file Character class
 */
module.exports = class Character{
  constructor(_id, socialClub, lastLogin, age, model, wallet, bank, face, health, armour, position, heading, groups, weapons, skills, weight, inventory, customization, decoration, clothes){
    if ((typeof _id) === 'object' || (_id && socialClub && age && sex && face) != null){
      this._id = _id._id || _id;
      this.socialClub = _id.socialClub || socialClub;
      this.lastLogin = _id.lastLogin || "";
      this.age = _id.age || age;
      this.model = _id.model || model;
      this.wallet = _id.wallet || yarp.variables.swallet.value;
      this.bank = _id.bank || yarp.variables.sbank.value;
      this.face = _id.face || face;
      this.health = _id.health || 100;
      this.armour = _id.armour || 0;
      this.position = _id.position || yarp.variables.first_spawn.value;
      this.heading = _id.heading || yarp.variables.first_heading.value;
      this.groups = _id.groups || [];
      this.weapons = _id.weapons || {};
      this.skills = _id.skills || {};
      this.weight = _id.weight || 0;
      this.inventory = _id.inventory || {};
      this.customization = _id.costomization || {};
      this.decoration = _id.decoration || {};
      this.clothes = _id.clothes || {};
    }
  }

  static load(){
    return yarp.mng.load(Character);
  }
  save(){
    yarp.mng.save(this);
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
    return yarp.users[this.socialClub];
  }

  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  giveGroup(group){
    if (this.groups.indexOf(group) == -1) {
      let type = yarp.groups[group].type;
      if (type){
        let same_type = this.getGroupByType(type);
        if (same_type){
          this.takeGroup(same_type);
        }
      }
      this.groups.push(group);
      return true;
    }
    return false;
  }
  takeGroup(group){
    if (this.groups.indexOf(group) > -1) {
      this.groups.splice(this.groups.indexOf(group), 1);
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
    if (this.weight + item.weight < yarp.variables.max_weight.value){
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

  giveWeapon(id, amount){
    if (!this.weapons[id]) {
      this.weapons[id] = 0;
    }
    this.weapons[id] =+ amount;
  }

  takeWeapon(id, amount){
    if (!this.weapons[id]) {
      return;
    }
    this.weapons[id] =- amount;
    if (this.weapons[id] <= 0) {
      this.weapons[id] = 0;
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

  isDev(){
    return yarp.variables.devs.value.indexOf(this.socialClub) > -1
  }
}
