'use strict';
/**
 * @file Character class
 */
module.exports = class Character extends yarp.gmo{
  constructor(id, socialClub, age, model, face, lastLogin, wallet, bank, health, armour, position, heading, groups, weapons, skills, weight, inventory, customization, decoration, clothes, enter, leave){
    super();
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
      this._enter = id._enter || ((enter) ? enter.toString() : "() => {}");
      this._leave = id._leave || ((leave) ? leave.toString() : "() => {}");
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
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

  get balance(){
    let balance = [];
    for (transaction of yarp.transactions.toArray()) {
      if ((transaction.source || transaction.target) == this.id) {
        balance.push(transaction);
      }
    }
    return balance;
  }

  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player)
      }
      for (let group of this.groups){
        this.joinedGroup(group);
      }
    }
  }

  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player)
      }
      for (let group of this.groups){
        this.leftGroup(group);
      }
    }
  }

  set enter(value) {
    this._enter = value;
  }

  set leave(value) {
    this._leave = value;
  }

  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  joinedGroup(group){
    if (yarp.groups[group]) {
      let player = this.player;
      if (player){
        if (yarp.groups[group].enter){
          let cb = eval(yarp.groups[group].enter);
          cb(player);
          mp.events.call('userJoinedGroup',player,this,group);
        }
      }
    }
  }

  leftGroup(group){
    if (yarp.groups[group]) {
      let player = this.player;
      if (player){
        if (yarp.groups[group].leave){
          let cb = eval(yarp.groups[group].leave);
          cb(player);
          mp.events.call('userLeftGroup',player,this,group);
        }
      }
    }
  }

  giveGroup(group){
    if (yarp.groups[group]) {
      if (this.groups.indexOf(group) == -1) {
        let type = yarp.groups[group].type;
        if (type){
          let same_type = this.getGroupByType(type);
          if (same_type){
            this.takeGroup(same_type);
          }
        }
        this.groups.push(group);
        this.joinedGroup(group);
        return true;
      }
    }
    return false;
  }

  takeGroup(group){
    if (yarp.groups[group]) {
      if (this.groups.indexOf(group) > -1) {
        this.groups.splice(this.groups.indexOf(group), 1);
        this.leftGroup(group);
        return true;
      }
    }
    return false;
  }

  giveMoney(value){
    this.player.setVariable('PLAYER_WALLET', this.wallet+value);
    this.wallet = this.wallet+value;
  }

  tryWalletPayment(value){
    if (this.wallet-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet-value);
      this.wallet = this.wallet-value;
      return true;
    }
    return false;
  }

  tryBankPayment(value){
    if (this.bank-value >= 0){
      this.player.setVariable('PLAYER_BANK', this.bank-value);
      let transaction = new Transaction("Payment",value,this.name);
      yarp.TransactionManager.add(transaction);
      this.bank = this.bank-value;
      return true;
    }
    return false;
  }

  tryFullPayment(value){
    if (this.wallet-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet-value);
      this.wallet = this.wallet-value;
      return true;
    } else {
      if (this.withdraw(value-this.wallet)) {
        if (this.wallet-value >= 0){
          this.player.setVariable('PLAYER_WALLET', this.wallet-value);
          this.wallet = this.wallet-value;
          return true;
        }
      }
    }
    return false;
  }

  tryDeposit(value){
    if (this.wallet-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet-value);
      this.player.setVariable('PLAYER_BANK', this.bank+value);
      let transaction = new Transaction("Deposit",value,this.name);
      yarp.TransactionManager.add(transaction);
      this.wallet = this.wallet-value;
      this.bank = this.bank+value;
      return true;
    }
    return false;
  }

  tryWithdraw(value){
    if (this.bank-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet+value);
      this.player.setVariable('PLAYER_BANK', this.bank-value);
      let transaction = new Transaction("Withdraw",value,this.name);
      yarp.TransactionManager.add(transaction);
      this.wallet = this.wallet+value;
      this.bank = this.bank-value;
      return true;
    }
    return false;
  }

  tryTransfer(target, value){
    if (this.bank-value >= 0){
      this.player.setVariable('PLAYER_BANK', this.bank-value);
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
      this.weight = yarp.utils.round(this.weight + (amount*item.weight),1);
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

  hasItem(id){
    return (this.items[id] != null)
  }

  hasItems(items){
    for (let i = 0; i < items.length; i++){
      if (!this.hasItems(items[i])) {
        return false;
      }
    }
    return true;
  }

  giveWeapon(weapon, amount){
    if (weapon) {
      if (!this.weapons[weapon.id]) {
        this.weapons[weapon.id] = 0;
      }
      this.weapons[weapon.id] += amount;
      this.player.giveWeapon(mp.joaat(weapon.id), amount);
      this.player.call('equipWeapon', [JSON.stringify(weapon)]);
    }
  }

  takeAmmo(id, amount){
    if (!this.weapons[id]) {
      return;
    }
    this.weapons[id] -= amount;
    if (this.weapons[id] <= 0) {
      this.weapons[id] = 0;
    }
  }

  hasWeapon(id){
    return (this.weapons[id] != null)
  }

  hasWeapons(weapons){
    for (let i = 0; i < weapons.length; i++){
      if (!this.hasWeapon(weapons[i])) {
        return false;
      }
    }
    return true;
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

  getGroupsByTypes(types){
    let groups = [];
    this.groups.forEach(function(id){
      let group = yarp.groups[id];
      if (group != null) {
        if (types.indexOf(group.type) >= 0){
          groups.push(group);
        }
      }
    });
    return groups;
  }

  hasGroup(id){
   return (this.groups.indexOf(id) > -1);
  }

  hasGroups(groups){
    for (let i = 0; i < groups.length; i++){
      if (!this.hasGroup(groups[i])) {
        return false;
      }
    }
    return true;
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

  static config(file){
    let characters = require(file);
    for (let id in characters){
      let character = characters[id];
      if (yarp.characters[id]) {
        for (let group of character.groups){
          yarp.characters[id].giveGroup(group);
        }
        if (character.enter) {
          yarp.characters[id].enter = character.enter.toString();
        }
        if (character.leave) {
          yarp.characters[id].leave = character.leave.toString();
        }
      }
    }
  }
}
