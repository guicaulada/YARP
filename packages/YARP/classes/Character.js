'use strict';
/**
 * Creates a Character.
 * @namespace yarp.Character
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Character name.
 * @param {Vector3} socialClub - User social club.
 * @param {number} [age=18] - Character age.
 * @param {object} [face={}] - Character face.
 * @param {string} [lastLogin=''] - Character last login.
 * @param {Float} [wallet=yarp.variables['Starting Wallet'].value] - Character wallet.
 * @param {Float}  [bank=yarp.variables['Starting Bank'].value] - Character bank.
 * @param {Float} [health=100] - Character health.
 * @param {Float} [armour=0] - Character armour.
 * @param {Float} [hunger=0] - Character hunger.
 * @param {Float} [thirst=0] - Character thirst.
 * @param {Vector3} [position=yarp.variables['First Spawn'].value] - Character position.
 * @param {number} [heading=yarp.variables['First Heading'].value] - Character heading.
 * @param {Array<string>} [groups=[]] - Character groups.
 * @param {object} [weapons={}] - Character weapons.
 * @param {object} [skills={}] - Character skills.
 * @param {Float} [weight=0] - Character weight.
 * @param {object} [inventory={}] - Character inventory.
 * @param {object} [customization={}] - Character customization.
 * @param {object} [decoration={}] - Character decoration.
 * @param {object} [clothes={}] - Character clothes.
 * @param {function} [enter=() => {}] - Character enter function.
 * @param {function} [leave=() => {}] - Character leave function.
 */

class Character extends yarp.GMObject{
  constructor(id,socialClub,age,model,face,lastLogin,wallet,bank,health,armour,hunger,thirst,position,heading,groups,weapons,skills,weight,inventory,customization,decoration,clothes,enter,leave){
    super();
    if ((id && socialClub) != null){
      this._id = id;
      this._socialClub = socialClub;
      this._age = age || 18;
      this._model = model || 'mp_m_freemode_01';
      this._face = face || {};
      this._lastLogin = lastLogin || '';
      this._wallet = wallet || yarp.variables['Starting Wallet'].value;
      this._bank = bank || yarp.variables['Starting Bank'].value;
      this._health = health || 100;
      this._armour = armour || 0;
      this._position = position || yarp.variables['First Spawn'].value;
      this._heading = heading || yarp.variables['First Heading'].value;
      this._groups = groups || [];
      this._weapons = weapons || {};
      this._skills = skills || {};
      this._weight = weight || 0;
      this._hunger = hunger || 0;
      this._thirst = thirst || 0;
      this._inventory = inventory || {};
      this._customization = customization || {};
      this._decoration = decoration || {};
      this._clothes = clothes || {};
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      this.players = [];
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Get character player.
   * @instance
   * @function player
   * @memberof yarp.Character
   * @returns {object} - Player.
   */
  get player(){
    for (let player of mp.players.toArray()) {
      if (player.name == this.id){
        return player;
      }
    }
    return null;
  }

  /**
   * Get character user.
   * @instance
   * @function user
   * @memberof yarp.Character
   * @returns {object} - User.
   */
  get user(){
    return yarp.users[this.socialClub];
  }

  /**
   * Get character balance.
   * @instance
   * @function balance
   * @memberof yarp.Character
   * @returns {Array<object>} - Balance.
   */
  get balance(){
    let balance = [];
    for (transaction of yarp.transactions.toArray()) {
      if ((transaction.source || transaction.target) == this.id) {
        balance.push(transaction);
      }
    }
    return balance;
  }

  /**
   * Call enter fuction for character and it's groups.
   * @instance
   * @function enter
   * @memberof yarp.Character
   * @returns {function} - Enter functions.
   * @fires characterJoinedGroup
   */
  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player)
      }
      for (let group of this.groups){
        yarp.groups[group].enter(player);
        mp.events.call('characterJoinedGroup',player,this,group);
      }
    }
  }

  /**
   * Call leave fuction for character and it's groups.
   * @instance
   * @function leave
   * @memberof yarp.Character
   * @returns {function} - Leave functions.
   * @fires characterLeftGroup
   */
  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player)
      }
      for (let group of this.groups){
        yarp.groups[group].leave(player);
        mp.events.call('characterLeftGroup',player,this,group);
      }
    }
  }

  set enter(value) {
    this._enter = value;
  }

  set leave(value) {
    this._leave = value;
  }

  /**
   * Update character last login.
   * @instance
   * @function updateLastLogin
   * @memberof yarp.Character
   * @param {string} ip - Character ip.
   */
  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  /**
   * Give money.
   * @instance
   * @function giveMoney
   * @memberof yarp.Character
   * @param {number} value - Amount to give.
   */
  giveMoney(value){
    this.player.setVariable('PLAYER_WALLET', this.wallet+value);
    this.wallet = this.wallet+value;
  }

  /**
   * Try wallet payment.
   * @instance
   * @function tryWalletPayment
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  tryWalletPayment(value){
    if (this.wallet-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet-value);
      this.wallet = this.wallet-value;
      return true;
    }
    return false;
  }

  /**
   * Try bank payment.
   * @instance
   * @function tryBankPayment
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  tryBankPayment(value){
    if (this.bank-value >= 0){
      this.player.setVariable('PLAYER_BANK', this.bank-value);
      let transaction = new Transaction('Payment',value,this.name);
      yarp.TransactionManager.add(transaction);
      this.bank = this.bank-value;
      return true;
    }
    return false;
  }

  /**
   * Try full payment.
   * @instance
   * @function tryFullPayment
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  tryFullPayment(value){
    if (this.wallet-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet-value);
      this.wallet = this.wallet-value;
      return true;
    } else {
      if (this.tryWithdraw(value-this.wallet)) {
        if (this.wallet-value >= 0){
          this.player.setVariable('PLAYER_WALLET', this.wallet-value);
          this.wallet = this.wallet-value;
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Try deposit.
   * @instance
   * @function tryDeposit
   * @memberof yarp.Character
   * @param {number} value - Amount to deposit.
   * @returns {boolean} - Operation success/fail.
   */
  tryDeposit(value){
    if (this.wallet-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet-value);
      this.player.setVariable('PLAYER_BANK', this.bank+value);
      let transaction = new Transaction('Deposit',value,this.name);
      this.wallet = this.wallet-value;
      this.bank = this.bank+value;
      transaction.save();
      return true;
    }
    return false;
  }

  /**
   * Try withdraw.
   * @instance
   * @function tryWithdraw
   * @memberof yarp.Character
   * @param {number} value - Amount to withdraw.
   * @returns {boolean} - Operation success/fail.
   */
  tryWithdraw(value){
    if (this.bank-value >= 0){
      this.player.setVariable('PLAYER_WALLET', this.wallet+value);
      this.player.setVariable('PLAYER_BANK', this.bank-value);
      let transaction = new Transaction('Withdraw',value,this.name);
      this.wallet = this.wallet+value;
      this.bank = this.bank-value;
      transaction.save();
      return true;
    }
    return false;
  }

  /**
   * Try transfer.
   * @instance
   * @function tryTransfer
   * @memberof yarp.Character
   * @param {string} target - Target character name.
   * @param {number} value - Amount to transfer.
   * @returns {boolean} - Operation success/fail.
   */
  tryTransfer(target, value){
    if (this.bank-value >= 0){
      this.player.setVariable('PLAYER_BANK', this.bank-value);
      target.player.setVariable('PLAYER_BANK', this.character.bank+value);
      let transaction = new Transaction('Transfer',value,this.name);
      this.bank = this.bank-value;
      target.bank = target.bank+value;
      transaction.save();
      return true;
    }
    return false;
  }

  /**
   * Give an item.
   * @instance
   * @function giveItem
   * @memberof yarp.Character
   * @param {object} item - Item to give.
   * @param {number} value - Amount to give.
   * @returns {boolean} - Operation success/fail.
   */
  giveItem(item, amount){
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.weight + item.weight < yarp.variables['Max Weight'].value){
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

  /**
   * Take an item.
   * @instance
   * @function takeItem
   * @memberof yarp.Character
   * @param {object} item - Item to take.
   * @param {number} value - Amount to take.
   * @returns {boolean} - Operation success/fail.
   */
  takeItem(item, amount){
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.inventory[item.id] != null){
      if (this.inventory[item.id] - amount >= 0){
        this.inventory[item.id] = this.inventory[item.id] - amount;
        this.weight = yarp.utils.round(this.weight - (amount*item.weight),1);
        if (this.inventory[item.id] <= 0) {
          delete this.inventory[item.id];
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Check if has an item.
   * @instance
   * @function takeItem
   * @memberof yarp.Character
   * @param {string} id - Item id.
   * @returns {boolean} - If has or not the item.
   */
  hasItem(id){
    return (this.inventory[id] != null && this.inventory[id] > 0)
  }

  /**
   * Check if has all items.
   * @instance
   * @function hasItems
   * @memberof yarp.Character
   * @param {Array<string>} items - Items id.
   * @returns {boolean} - If has or not all items.
   */
  hasItems(items){
    for (let i = 0; i < items.length; i++){
      if (!this.hasItems(items[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Give a weapon.
   * @instance
   * @function giveWeapon
   * @memberof yarp.Character
   * @param {object} weapon - Weapon object or id.
   * @param {number} amount - Amount of bullets.
   * @fires equipWeapon
   */
  giveWeapon(weapon, amount){
    if ((typeof weapon) === 'string') weapon = yarp.weapons[weapon];
    if (!this.hasWeapon(weapon.id)) {
      this.weapons[weapon.id] = 0;
    }
    if (!amount) amount = 0;
    this.weapons[weapon.id] += amount;
    this.player.giveWeapon(mp.joaat(weapon.id), amount);
    this.player.call('equipWeapon', [JSON.stringify(weapon)]);
  }

  /**
   * Take a weapon.
   * @instance
   * @function takeWeapon
   * @memberof yarp.Character
   * @param {object} weapon - Weapon object or id.
   * @fires unequipWeapon
   */
  takeWeapon(weapon){
    if ((typeof weapon) === 'string') weapon = yarp.weapons[weapon];
    if (this.hasWeapon(weapon.id)) {
      this.weapons.splice(this.weapons.indexOf(weapon.id),1);
    } 
    let player = this.player;
    player.call('takeWeapon', [weapon.id]);
    player.call('unequipWeapon', [JSON.stringify(weapon)]);
  }

  /**
   * Take weapon ammo.
   * @instance
   * @function takeWeaponAmmo
   * @memberof yarp.Character
   * @param {string} id - Weapon id.
   * @param {number} amount - Amount of bullets.
   */
  takeWeaponAmmo(id, amount){
    if (this.hasWeapon(id)) {
      this.weapons[id] -= amount;
      if (this.weapons[id] <= 0) {
        this.weapons[id] = 0;
      }
      let player = this.player;
      player.call('setWeaponAmmo', [id, this.weapons[id]]);
    }
  }

  /**
   * Give weapon ammo.
   * @instance
   * @function giveWeaponAmmo
   * @memberof yarp.Character
   * @param {string} id - Weapon id.
   * @param {number} amount - Amount of bullets.
   */
  giveWeaponAmmo(id, amount){
    if (this.hasWeapon(id)) {
      this.weapons[id] += amount;
      let player = this.player;
      player.call('setWeaponAmmo', [id, this.weapons[id]]);
      player.invoke('0xF28A81E331A3F337', player, mp.joaat(id), this.weapons[id]);
    }
  }

  /**
   * Take ammo.
   * @instance
   * @function takeAmmo
   * @memberof yarp.Character
   * @param {string} id - Ammo id.
   * @param {number} amount - Amount of bullets.
   */
  takeAmmo(id, amount){
    let weaponId = id.replace('AMMO_','WEAPON_');
    if (this.hasWeapon(weaponId)) {
      this.weapons[weaponId] -= amount;
      if (this.weapons[weaponId] <= 0) {
        this.weapons[weaponId] = 0;
      }
      let player = this.player;
      player.call('setWeaponAmmo', [weaponId, this.weapons[weaponId]]);
    }
  }

  /**
   * Give ammo.
   * @instance
   * @function giveAmmo
   * @memberof yarp.Character
   * @param {string} id - Ammo id.
   * @param {number} amount - Amount of bullets.
   */
  giveAmmo(id, amount){
    let weaponId = id.replace('AMMO_','WEAPON_');
    if (this.hasWeapon(weaponId)) {
      this.weapons[weaponId] += amount;
      let player = this.player;
      player.call('setWeaponAmmo', [weaponId, this.weapons[weaponId]]);
    }
  }

  /**
   * Check if has a weapon.
   * @instance
   * @function hasWeapon
   * @memberof yarp.Character
   * @param {string} id - Weapon id.
   * @returns {boolean} - If has or not the weapon.
   */
  hasWeapon(id){
    return (this.weapons[id] != null)
  }

  /**
   * Check if has all weapons.
   * @instance
   * @function hasWeapons
   * @memberof yarp.Character
   * @param {Array<string>} weapons - Weapons id.
   * @returns {boolean} - If has or not all the weapons.
   */
  hasWeapons(weapons){
    for (let i = 0; i < weapons.length; i++){
      if (!this.hasWeapon(weapons[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Give a group.
   * @instance
   * @function giveGroup
   * @memberof yarp.Character
   * @param {string} group - Group id.
   * @returns {boolean} - Operation success/fail.
   * @fires characterJoinedGroup
   */
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
        let player = this.player;
        if (player) {
          yarp.groups[group].enter(player);
          mp.events.call('characterJoinedGroup',player,this,group);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Take a group.
   * @instance
   * @function takeGroup
   * @memberof yarp.Character
   * @param {string} group - Group id.
   * @returns {boolean} - Operation success/fail.
   * @fires characterLeftGroup
   */
  takeGroup(group){
    if (yarp.groups[group]) {
      if (this.groups.indexOf(group) > -1) {
        this.groups.splice(this.groups.indexOf(group), 1);
        let player = this.player;
        if (player) {
          yarp.groups[group].leave(player);
          mp.events.call('characterLeftGroup',player,this,group);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Get group by type.
   * @instance
   * @function getGroupByType
   * @memberof yarp.Character
   * @param {string} type - Group type.
   * @returns {string} - Group id.
   */
  getGroupByType(type){
    this.groups.forEach(function(id){
      let group = yarp.groups[id];
      if (group != null) {
        if (group.type == type){
          return name;
        }
      }
    });
  }

  /**
   * Get groups by types.
   * @instance
   * @function getGroupByTypes
   * @memberof yarp.Character
   * @param {Array<string>} type - Group types.
   * @returns {Array<string>} - Group ids.
   */
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

  /**
   * Check if has group.
   * @instance
   * @function hasGroup
   * @memberof yarp.Character
   * @param {string} id - Group id.
   * @returns {boolean} - If has or not the group.
   */
  hasGroup(id){
   return (this.groups.indexOf(id) > -1);
  }

  /**
   * Check if has all groups.
   * @instance
   * @function hasGroup
   * @memberof yarp.Character
   * @param {Array<string>} id - Group ids.
   * @returns {boolean} - If has or not all the groups.
   */
  hasGroups(groups){
    for (let i = 0; i < groups.length; i++){
      if (!this.hasGroup(groups[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if has permission.
   * @instance
   * @function hasPermission
   * @memberof yarp.Character
   * @param {string} permission - Permission.
   * @returns {boolean} - If has or not the permission.
   */
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
          if (group.permissions.indexOf('*') > -1){
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

  /**
   * Check if has all permissions.
   * @instance
   * @function hasPermission
   * @memberof yarp.Character
   * @param {Array<string>} permissions - Permissions.
   * @returns {boolean} - If has or not all permissions.
   */
  hasPermissions(permissions){
    for (let i = 0; i < permissions.length; i++){
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Increase hunger.
   * @instance
   * @function increaseHunger
   * @memberof yarp.Character
   * @param {number} value - Value to increase.
   */
  increaseHunger(value){
    let overflow = this.hunger+value-100;
    if (overflow > 0){
      this.health -= overflow;
    }
    this.hunger += value;
    if (this.hunger > 100) {
      this.hunger = 100;
    }
  }

  /**
   * Increase thirst.
   * @instance
   * @function increaseThirst
   * @memberof yarp.Character
   * @param {number} value - Value to increase.
   */
  increaseThirst(value){
    let overflow = this.thirst+value-100;
    if (overflow > 0){
      this.health -= overflow;
    }
    this.thirst += value;
    if (this.thirst > 100) {
      this.thirst = 100;
    }
  }

  /**
   * Decrease hunger.
   * @instance
   * @function decreaseHunger
   * @memberof yarp.Character
   * @param {number} value - Value to decrease.
   */
  decreaseHunger(value){
    let overflow = this.thirst-value;
    if (overflow < 0){
      this.health += overflow;
    }
    this.hunger -= value;
    if (this.hunger < 0) {
      this.hunger = 0;
    }
  }

  /**
   * Decrease thirst.
   * @instance
   * @function decreaseThirst
   * @memberof yarp.Character
   * @param {number} value - Value to decrease.
   */
  decreaseThirst(value){
    let overflow = this.thirst-value;
    if (overflow < 0){
      this.health += overflow;
    }
    this.thirst -= value;
    if (this.thirst < 0) {
      this.thirst = 0;
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Character
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Character(obj._id,obj._socialClub,obj._age,obj._model,obj._face,obj._lastLogin,obj._wallet,obj._bank,obj._health,obj._armour,obj._hunger,obj._thirst,obj._position,obj._heading,obj._groups,obj._weapons,obj._skills,obj._weight,obj._inventory,obj._customization,obj._decoration,obj._clothes,obj._enter,obj._leave);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Character
   * @param {string} file - Config file path.
   */
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

module.exports = Character;
