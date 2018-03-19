'use strict';
/**
 * @file Character class
 */
module.exports = class Character{
  constructor(id, socialClub, age, model, face, lastLogin, wallet, bank, health, armour, position, heading, groups, weapons, skills, weight, inventory, customization, decoration, clothes){
    if ((typeof id) === 'object' || (id && socialClub) != null){
      this._id = id._id || id;
      this._socialClub = id._socialClub || socialClub;
      this._age = id._age || age || 18;
      this._model = id._model || model || "mp_m_freemode_01";
      this._face = id._face || face || {};
      this._lastLogin = id._lastLogin || lastLogin || "";
      this._wallet = id._wallet || wallet || yarp.variables["Starting Wallet"].value;
      this._bank = id._bank || bank || yarp.variables["Starting Bank"].value;
      this._health = id._health || health || 100;
      this._armour = id._armour || armour || 0;
      this._position = id._position || position || yarp.variables["First Spawn"].value;
      this._heading = id._heading || heading || yarp.variables["First Heading"].value;
      this._groups = id._groups || groups || [];
      this._weapons = id._weapons || weapons || {};
      this._skills = id._skills || skills || {};
      this._weight = id._weight || weight || 0;
      this._inventory = id._inventory || inventory || {};
      this._customization = id._customization || customization || {};
      this._decoration = id._decoration || decoration || {};
      this._clothes = id._clothes || clothes || {};
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Character);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    this.mp.destroy();
    yarp.dbm.remove(this);
  }

  get player(){
    for (let player of mp.players.toArray()) {
      if (player.name == this.id){
        return player;
      }
    }
    return null;
  }

  get user(){
    return yarp.users[this.socialClub];
  }

  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  joinedGroup(group){
    let player = this.player;
    if (group) {
      if (yarp.groups[group].enter){
        let cb = eval(yarp.groups[group].enter);
        cb(player);
        mp.events.call('yarp_characterJoinedGroup',player,this,group);
      }
    } else {
      for (let group of this.groups){
        if (yarp.groups[group].enter){
          let cb = eval(yarp.groups[group].enter);
          cb(player);
          mp.events.call('yarp_characterJoinedGroup',player,this,group);
        }
      }
    }
  }

  leftGroup(group){
    let player = this.player;
    if (group) {
      if (yarp.groups[group].leave){
        let cb = eval(yarp.groups[group].leave);
        cb(player);
        mp.events.call('yarp_characterLeftGroup',player,this,group);
      }
    } else {
      for (let group of this.groups){
        if (yarp.groups[group].leave){
          let cb = eval(yarp.groups[group].leave);
          cb(player);
          mp.events.call('yarp_characterLeftGroup',player,this,group);
        }
      }
    }
  }

  giveGroup(group){
    if (this.groups.indexOf(group) == -1) {
      let type = yarp.groups[group].type;
      if (type){
        let same_type = this.getGroupByType(type);
        if (same_type){
          this.takeGroup(same_type);
          this.leftGroup(group);
        }
      }
      this.groups.push(group);
      this.joinedGroup(group);
      return true;
    }
    return false;
  }
  takeGroup(group){
    if (this.groups.indexOf(group) > -1) {
      this.groups.splice(this.groups.indexOf(group), 1);
      this.leftGroup(group);
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
    if (this.weight + item.weight < yarp.variables["Max Weight"].value){
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
    return yarp.variables["Developers"].value.indexOf(this.socialClub) > -1
  }
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
