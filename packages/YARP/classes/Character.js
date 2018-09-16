'use strict';
/**
 * Implements a Character.
 * @class yarp.Character
 * @extends yarp.GMObject
 */
class Character extends yarp.GMObject {
  /**
   * Creates an instance of Character.
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.socialClub
   * @param {Number} [params.age=18]
   * @param {String} [params.model='mp_m_freemode_01']
   * @param {Object} [params.face={}]
   * @param {String} [params.lastLogin='']
   * @param {String} [params.wallet=yarp.variables['Starting Wallet'].value]
   * @param {String} [params.bank=yarp.variables['Starting Bank'].value]
   * @param {Number} [params.health=100]
   * @param {Number} [params.armour=0]
   * @param {Number} [params.hunger=0]
   * @param {Number} [params.thirst=0]
   * @param {Number} [params.xp=0]
   * @param {String} [params.position=yarp.variables['First Spawn'].value]
   * @param {String} [params.heading=yarp.variables['First Heading'].value]
   * @param {Array<String>} [params.groups=[]]
   * @param {Object} [params.weapons={}]
   * @param {Object} [params.skills={}]
   * @param {Number} [params.weight=0]
   * @param {Object} [params.inventory={}]
   * @param {Object} [params.customization={}]
   * @param {Object} [params.decoration={}]
   * @param {Object} [params.clothes={}]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @memberof yarp.Character
   */
  constructor(params) {
    super();
    if ((params.id && params.socialClub) != null) {
      this._id = params.id;
      this._socialClub = params.socialClub;
      this._age = this.default(params.age, 18);
      this._model = this.default(params.model, 'mp_m_freemode_01');
      this._face = this.default(params.age, {});
      this._lastLogin = this.default(params.lastLogin, '');
      this._wallet = this.default(params.wallet, yarp.variables['Starting Wallet'].value);
      this._bank = this.default(params.bank, yarp.variables['Starting Bank'].value);
      this._health = this.default(params.health, 100);
      this._armour = this.default(params.armour, 0);
      this._position = this.default(params.position, yarp.variables['First Spawn'].value);
      this._heading = this.default(params.heading, yarp.variables['First Heading'].value);
      this._groups = this.default(params.groups, []);
      this._weapons = this.default(params.weapons, {});
      this._skills = this.default(params.skills, {});
      this._weight = this.default(params.weight, 0);
      this._hunger = this.default(params.hunger, 0);
      this._thirst = this.default(params.thirst, 0);
      this._xp = this.default(params.xp, 0);
      this._inventory = this.default(params.inventory, {});
      this._customization = this.default(params.customization, {});
      this._decoration = this.default(params.decostation, {});
      this._clothes = this.default(params.clothers, {});
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      this.players = [];
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Character class requires id and socialClub to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Get character player.
   * @instance
   * @function player
   * @memberof yarp.Character
   * @return {Object} Player.
   */
  get player() {
    for (let player of mp.players.toArray()) {
      if (player.name == this.id) {
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
   * @return {Object} User.
   */
  get user() {
    return yarp.users[this.socialClub];
  }

  /**
   * Get character balance.
   * @instance
   * @function balance
   * @memberof yarp.Character
   * @return {Array<Object>} Balance.
   */
  get balance() {
    let balance = [];
    for (let transaction of yarp.transactions.toArray()) {
      if (transaction.source == this.id || transaction.target == this.id) {
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
   * @return {Function} Enter functions.
   * @fires characterJoinedGroup
   */
  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].enter(player);
        mp.events.call('characterJoinedGroup', player, this, group);
      }
    };
  }

  /**
   * Set the enter function as a string
   * @instance
   * @function enter
   * @memberof yarp.Character
   * @param {Function} value Enter function.
   */
  set enter(value) {
    this._enter = value.toString();
  }

  /**
   * Call leave fuction for character and it's groups.
   * @instance
   * @function leave
   * @memberof yarp.Character
   * @return {Function} Leave functions.
   * @fires characterLeftGroup
   */
  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].leave(player);
        mp.events.call('characterLeftGroup', player, this, group);
      }
    };
  }

  /**
   * Set the leave function as a string
   * @instance
   * @function leave
   * @memberof yarp.Character
   * @param {Function} value Leave function.
   */
  set leave(value) {
    this._leave = value.toString();
  }

  /**
   * Get the health value
   * @instance
   * @function health
   * @memberof yarp.Character
   */
  get health() {
    return this._health;
  }

  /**
   * Set the health value for the player
   * @instance
   * @function health
   * @memberof yarp.Character
   * @param {Number} value Health value
   */
  set health(value) {
    this._health = value;
    let player = this.player;
    if (player) {
      player.health = value;
    }
  }

  /**
   * Get the wallet value
   * @instance
   * @function wallet
   * @memberof yarp.Character
   */
  get wallet() {
    return this._wallet;
  }

  /**
   * Set the wallet value for the player
   * @instance
   * @function wallet
   * @memberof yarp.Character
   * @param {Number} value Wallet value
   */
  set wallet(value) {
    this._wallet = value;
    let player = this.player;
    if (player) {
      player.setVariable('PLAYER_WALLET', this.wallet);
    }
    this.save();
  }

  /**
   * Get the bank value
   * @instance
   * @function bank
   * @memberof yarp.Character
   */
  get bank() {
    return this._bank;
  }

  /**
   * Set the bank value for the player
   * @instance
   * @function bank
   * @memberof yarp.Character
   * @param {Number} value Bank value
   */
  set bank(value) {
    this._bank = value;
    let player = this.player;
    if (player) {
      player.setVariable('PLAYER_BANK', this.bank);
    }
    this.save();
  }

  /**
   * Get the hunger value
   * @instance
   * @function hunger
   * @memberof yarp.Character
   */
  get hunger() {
    return this._hunger;
  }

  /**
   * Set the hunger value for the player
   * @instance
   * @function hunger
   * @memberof yarp.Character
   * @param {Number} value Hunger value
   */
  set hunger(value) {
    if (value > 100) {
      this.health -= (value-100);
      value = 100;
    } else if (value < 0) {
      this.health += value;
      value = 0;
    }
    this._hunger = value;
    let player = this.player;
    if (player) {
      player.setVariable('PLAYER_HUNGER', this.hunger);
    }
  }

  /**
   * Get the thirst value
   * @instance
   * @function thirst
   * @memberof yarp.Character
   */
  get thirst() {
    return this._thirst;
  }

  /**
   * Set the thirst value for the player
   * @instance
   * @function thirst
   * @memberof yarp.Character
   * @param {Number} value Thirst value
   */
  set thirst(value) {
    if (value > 100) {
      this.health -= (value-100);
      value = 100;
    } else if (value < 0) {
      this.health += value;
      value = 0;
    }
    this._thirst = value;
    let player = this.player;
    if (player) {
      player.setVariable('PLAYER_THIRST', this.thirst);
    }
  }

  /**
   * Get the xp value
   * @instance
   * @function xp
   * @memberof yarp.Character
   */
  get xp() {
    return this._xp;
  }

  /**
   * Set the xp value for the player
   * @instance
   * @function xp
   * @memberof yarp.Character
   * @param {Number} value XP value
   */
  set xp(value) {
    if (value > 1000000000) {
      value = 1000000000;
    } else if (value < 0) {
      value = 0;
    }
    this._xp = value;
    let player = this.player;
    if (player) {
      player.setVariable('PLAYER_XP', this.xp);
    }
  }

  /**
   * Get the heading value
   * @instance
   * @function heading
   * @memberof yarp.Character
   */
  get heading() {
    return this._heading;
  }

  /**
   * Set the heading value for the player
   * @instance
   * @function heading
   * @memberof yarp.Character
   * @param {Number} value Heading value
   */
  set heading(value) {
    this._heading = value;
    let player = this.player;
    if (player) {
      player.heading = this.heading;
    }
  }

  /**
   * Get the position value
   * @instance
   * @function position
   * @memberof yarp.Character
   */
  get position() {
    return this._position;
  }

  /**
   * Set the position value for the player
   * @instance
   * @function position
   * @memberof yarp.Character
   * @param {Number} value Position value
   */
  set position(value) {
    this._position = value;
    let player = this.player;
    if (player) {
      player.position = this.position;
    }
  }

  /**
   * Update character last login.
   * @instance
   * @function updateLastLogin
   * @memberof yarp.Character
   * @param {String} ip Character ip.
   */
  updateLastLogin(ip) {
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  /**
   * Try wallet payment.
   * @instance
   * @function tryWalletPayment
   * @memberof yarp.Character
   * @param {Number} value Amount to pay.
   * @return {Boolean} Operation success/fail.
   */
  tryWalletPayment(value) {
    if (this.wallet-value >= 0) {
      this.wallet -= value;
      return true;
    }
    return false;
  }

  /**
   * Try bank payment.
   * @instance
   * @function tryBankPayment
   * @memberof yarp.Character
   * @param {Number} value Amount to pay.
   * @return {Boolean} Operation success/fail.
   */
  tryBankPayment(value) {
    if (this.bank-value >= 0) {
      this.bank -= value;
      new yarp.Transaction({
        type: 'Payment',
        value: value,
        source: this.id,
      }).save();
      return true;
    }
    return false;
  }

  /**
   * Try full payment.
   * @instance
   * @function tryFullPayment
   * @memberof yarp.Character
   * @param {Number} value Amount to pay.
   * @return {Boolean} Operation success/fail.
   */
  tryFullPayment(value) {
    if (this.tryWalletPayment(value)) {
      return true;
    } else {
      return this.tryBankPayment(value);
    }
    return false;
  }

  /**
   * Try deposit.
   * @instance
   * @function tryDeposit
   * @memberof yarp.Character
   * @param {Number} value Amount to deposit.
   * @return {Boolean} Operation success/fail.
   */
  tryDeposit(value) {
    if (this.wallet-value >= 0) {
      this.wallet -= value;
      this.bank += value;
      new yarp.Transaction({
        type: 'Deposit',
        value: value,
        source: this.id,
      }).save();
      return true;
    }
    return false;
  }

  /**
   * Try withdraw.
   * @instance
   * @function tryWithdraw
   * @memberof yarp.Character
   * @param {Number} value Amount to withdraw.
   * @return {Boolean} Operation success/fail.
   */
  tryWithdraw(value) {
    if (this.bank-value >= 0) {
      this.bank -= value;
      this.wallet += value;
      new yarp.Transaction({
        type: 'Withdraw',
        value: value,
        source: this.id,
      }).save();
      return true;
    }
    return false;
  }

  /**
   * Try transfer.
   * @instance
   * @function tryTransfer
   * @memberof yarp.Character
   * @param {String} target Target character name.
   * @param {Number} value Amount to transfer.
   * @return {Boolean} Operation success/fail.
   */
  tryTransfer(target, value) {
    if (this.bank-value >= 0) {
      this.bank -= value;
      target.bank += value;
      new yarp.Transaction({
        type: 'Transfer',
        value: value,
        source: this.id,
        target: target.id,
      }).save();
      return true;
    }
    return false;
  }

  /**
   * Give an item.
   * @instance
   * @function giveItem
   * @memberof yarp.Character
   * @param {Object} item Item to give.
   * @param {Number} amount Amount to give.
   * @return {Boolean} Operation success/fail.
   */
  giveItem(item, amount) {
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.weight + item.weight < yarp.variables['Max Weight'].value) {
      if (this.inventory[item.id] != null) {
        this.inventory[item.id] = this.inventory[item.id] + amount;
      } else {
        this.inventory[item.id] = amount;
      }
      this.weight = yarp.utils.round(this.weight + (amount * item.weight), 1);
      return true;
    }
    return false;
  }

  /**
   * Take an item.
   * @instance
   * @function takeItem
   * @memberof yarp.Character
   * @param {Object} item Item to take.
   * @param {Number} amount Amount to take.
   * @return {Boolean} Operation success/fail.
   */
  takeItem(item, amount) {
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.inventory[item.id] != null) {
      if (this.inventory[item.id]-amount >= 0) {
        this.inventory[item.id] = this.inventory[item.id]-amount;
        this.weight = yarp.utils.round(this.weight-(amount * item.weight), 1);
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
   * @param {String} id Item id.
   * @return {Boolean} If has or not the item.
   */
  hasItem(id) {
    return (this.inventory[id] != null && this.inventory[id] > 0);
  }

  /**
   * Check if has all items.
   * @instance
   * @function hasItems
   * @memberof yarp.Character
   * @param {Array<String>} items Items id.
   * @return {Boolean} If has or not all items.
   */
  hasItems(items) {
    for (let i = 0; i < items.length; i++) {
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
   * @param {Object} weapon Weapon object or id.
   * @param {Number} amount Amount of bullets.
   * @fires equipWeapon
   */
  giveWeapon(weapon, amount) {
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
   * @param {Object} weapon Weapon object or id.
   * @fires unequipWeapon
   */
  takeWeapon(weapon) {
    if ((typeof weapon) === 'string') weapon = yarp.weapons[weapon];
    if (this.hasWeapon(weapon.id)) {
      this.weapons.splice(this.weapons.indexOf(weapon.id), 1);
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
   * @param {String} id Weapon id.
   * @param {Number} amount Amount of bullets.
   */
  takeWeaponAmmo(id, amount) {
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
   * @param {String} id Weapon id.
   * @param {Number} amount Amount of bullets.
   */
  giveWeaponAmmo(id, amount) {
    if (this.hasWeapon(id)) {
      this.weapons[id] += amount;
      let player = this.player;
      player.call('setWeaponAmmo', [id, this.weapons[id]]);
    }
  }

  /**
   * Take ammo.
   * @instance
   * @function takeAmmo
   * @memberof yarp.Character
   * @param {String} id Ammo id.
   * @param {Number} amount Amount of bullets.
   */
  takeAmmo(id, amount) {
    let weaponId = id.replace('AMMO_', 'WEAPON_');
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
   * @param {String} id Ammo id.
   * @param {Number} amount Amount of bullets.
   */
  giveAmmo(id, amount) {
    let weaponId = id.replace('AMMO_', 'WEAPON_');
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
   * @param {String} id Weapon id.
   * @return {Boolean} If has or not the weapon.
   */
  hasWeapon(id) {
    return (this.weapons[id] != null);
  }

  /**
   * Check if has all weapons.
   * @instance
   * @function hasWeapons
   * @memberof yarp.Character
   * @param {Array<String>} weapons Weapons id.
   * @return {Boolean} If has or not all the weapons.
   */
  hasWeapons(weapons) {
    for (let i = 0; i < weapons.length; i++) {
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
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @fires characterJoinedGroup
   */
  giveGroup(group) {
    if (this.groups.indexOf(group) == -1) {
      if (yarp.groups[group]) {
        let type = yarp.groups[group].type;
        if (type) {
          let sameType = this.getGroupByType(type);
          if (sameType) {
            this.takeGroup(sameType);
          }
        }
        let player = this.player;
        if (player) {
          yarp.groups[group].enter(player);
          mp.events.call('characterJoinedGroup', player, this, group);
        }
      }
      this.groups.push(group);
      return true;
    }
    return false;
  }

  /**
   * Take a group.
   * @instance
   * @function takeGroup
   * @memberof yarp.Character
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @fires characterLeftGroup
   */
  takeGroup(group) {
    if (this.groups.indexOf(group) > -1) {
      if (yarp.groups[group]) {
        let player = this.player;
        if (player) {
          yarp.groups[group].leave(player);
          mp.events.call('characterLeftGroup', player, this, group);
        }
      }
      this.groups.splice(this.groups.indexOf(group), 1);
      return true;
    }
    return false;
  }

  /**
   * Get group by type.
   * @instance
   * @function getGroupByType
   * @memberof yarp.Character
   * @param {String} type Group type.
   * @return {String} Group id.
   */
  getGroupByType(type) {
    for (let id of this.groups) {
      let group = yarp.groups[id];
      if (group != null) {
        if (group.type == type) {
          return id;
        }
      }
    }
  }

  /**
   * Get groups by types.
   * @instance
   * @function getGroupByTypes
   * @memberof yarp.Character
   * @param {Array<String>} types Group types.
   * @return {Array<String>} Group ids.
   */
  getGroupsByTypes(types) {
    let groups = [];
    for (let id of this.groups) {
      let group = yarp.groups[id];
      if (group != null) {
        if (types.indexOf(group.type) >= 0) {
          groups.push(group);
        }
      }
    }
    return groups;
  }

  /**
   * Check if has group.
   * @instance
   * @function hasGroup
   * @memberof yarp.Character
   * @param {String} id Group id.
   * @return {Boolean} If has or not the group.
   */
  hasGroup(id) {
   return (this.groups.indexOf(id) > -1);
  }

  /**
   * Check if has all groups.
   * @instance
   * @function hasGroup
   * @memberof yarp.Character
   * @param {Array<String>} groups Group ids.
   * @return {Boolean} If has or not all the groups.
   */
  hasGroups(groups) {
    for (let i = 0; i < groups.length; i++) {
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
   * @param {String} permission Permission.
   * @return {Boolean} If has or not the permission.
   */
  hasPermission(permission) {
    let result = false;
    let removed = false;
    let readd = false;
    if (permission[0] == '#') {
      let parts = permission.split('.');
      let item = this.inventory[parts[0].slice(1, parts[0].length)];
      let operation = parts[1][0];
      let value = Number(parts[1].slice(1, parts[1].length));
      switch (operation) {
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
      let skill = this.skills[parts[0].slice(1, parts[0].length)];
      let operation = parts[1][0];
      let value = Number(parts[1].slice(1, parts[1].length));
      switch (operation) {
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
    } else if (permission[0] == '$') {
      let parts = permission.split('.');
      let param = this[parts[0].slice(1, parts[0].length)];
      let operation = parts[1][0];
      let value = Number(parts[1].slice(1, parts[1].length));
      switch (operation) {
        case '>':
          result = (param > value);
          break;
        case '<':
          result = (param < value);
          break;
        default:
          result = (param == value);
          break;
      }
    } else {
      for (let id of this.groups) {
        let group = yarp.groups[id];
        if (group != null) {
          if (group.permissions.indexOf('*') > -1) {
            result = true;
          }
          if (group.permissions.indexOf(permission) > -1) {
            result = true;
          }
          if (group.permissions.indexOf(`-${permission}`) > -1) {
            removed = true;
          }
          if (group.permissions.indexOf(`+${permission}`) > -1) {
            readd = true;
          }
          if ((!result) || (!readd && removed)) {
            for (let inh of group.inherits) {
              let child = yarp.groups[inh];
              if (child.permissions.indexOf('*') > -1) {
                result = true;
              }
              if (child.permissions.indexOf(permission) > -1) {
                result = true;
              }
              if (child.permissions.indexOf(`-${permission}`) > -1) {
                removed = true;
              }
              if (child.permissions.indexOf(`+${permission}`) > -1) {
                readd = true;
              }
            }
          }
        }
      }
    }
    if (removed && !readd) {
      result = false;
    }
    return result;
  }

  /**
   * Check if has all permissions.
   * @instance
   * @function hasPermission
   * @memberof yarp.Character
   * @param {Array<String>} permissions Permissions.
   * @return {Boolean} If has or not all permissions.
   */
  hasPermissions(permissions) {
    for (let i = 0; i < permissions.length; i++) {
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Character;
