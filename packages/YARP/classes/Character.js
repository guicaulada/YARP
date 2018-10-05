'use strict';
/**
 * Implements a Character.
 */
class Character extends yarp.Object {
  /**
   * Creates an instance of Character.
   * @extends {yarp.Object}
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.socialClub
   * @param {Number} [params.age=18]
   * @param {String} [params.model='mp_m_freemode_01']
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
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @memberof Character
   */
  constructor(params) {
    super();
    if ((params.id && params.socialClub) != null) {
      this._id = params.id;
      this._socialClub = params.socialClub;
      this._age = this.default(params.age, 18);
      this._model = this.default(params.model, 'mp_m_freemode_01');
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
      this._customization = this.default(params.customization, Character.defaultCustomization);
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
   * Get character balance.
   * @instance
   * @function balance
   * @return {Array<Object>} Balance.
   * @memberof Character
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
   * @return {Function} Enter functions.
   * @memberof Character
   */
  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].enter(player);
        yarp.server.characterJoinedGroup(player, this, group);
      }
    };
  }

  /**
   * Set the enter function as a string
   * @instance
   * @function enter
   * @param {Function} value Enter function.
   * @memberof Character
   */
  set enter(value) {
    this._enter = value.toString();
  }

  /**
   * Call leave fuction for character and it's groups.
   * @instance
   * @function leave
   * @return {Function} Leave functions.
   * @memberof Character
   */
  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player);
      }
      for (let group of this.groups) {
        yarp.groups[group].leave(player);
        yarp.server.characterLeftGroup = (player, this, group);
      }
    };
  }

  /**
   * Set the leave function as a string
   * @instance
   * @function leave
   * @param {Function} value Leave function.
   * @memberof Character
   */
  set leave(value) {
    this._leave = value.toString();
  }

  /**
   * Get the health value
   * @instance
   * @function health
   * @memberof Character
   */
  get health() {
    return this._health;
  }

  /**
   * Set the health value for the player
   * @instance
   * @function health
   * @param {Number} value Health value
   * @memberof Character
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
   * @memberof Character
   */
  get wallet() {
    return this._wallet;
  }

  /**
   * Set the wallet value for the player
   * @instance
   * @function wallet
   * @param {Number} value Wallet value
   * @memberof Character
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
   * @memberof Character
   */
  get bank() {
    return this._bank;
  }

  /**
   * Set the bank value for the player
   * @instance
   * @function bank
   * @param {Number} value Bank value
   * @memberof Character
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
   * @memberof Character
   */
  get hunger() {
    return this._hunger;
  }

  /**
   * Set the hunger value for the player
   * @instance
   * @function hunger
   * @param {Number} value Hunger value
   * @memberof Character
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
   * @memberof Character
   */
  get thirst() {
    return this._thirst;
  }

  /**
   * Set the thirst value for the player
   * @instance
   * @function thirst
   * @param {Number} value Thirst value
   * @memberof Character
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
   * @memberof Character
   */
  get xp() {
    return this._xp;
  }

  /**
   * Set the xp value for the player
   * @instance
   * @function xp
   * @param {Number} value XP value
   * @memberof Character
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
   * @memberof Character
   */
  get heading() {
    return this._heading;
  }

  /**
   * Set the heading value for the player
   * @instance
   * @function heading
   * @param {Number} value Heading value
   * @memberof Character
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
   * @memberof Character
   */
  get position() {
    return this._position;
  }

  /**
   * Set the position value for the player
   * @instance
   * @function position
   * @param {Number} value Position value
   * @memberof Character
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
   * @param {String} ip Character ip.
   * @memberof Character
   */
  updateLastLogin(ip) {
    this.lastLogin = `${ip} ${yarp.utils.server.getTimestamp(new Date())}`;
  }

  /**
   * Try wallet payment.
   * @instance
   * @function tryWalletPayment
   * @param {Number} value Amount to pay.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
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
   * @param {Number} value Amount to pay.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
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
   * @param {Number} value Amount to pay.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
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
   * @param {Number} value Amount to deposit.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
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
   * @param {Number} value Amount to withdraw.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
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
   * @param {String} target Target character name.
   * @param {Number} value Amount to transfer.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
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
   * @param {Object} item Item to give.
   * @param {Number} amount Amount to give.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
   */
  giveItem(item, amount) {
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.weight + item.weight < yarp.variables['Max Weight'].value) {
      if (this.inventory[item.id] != null) {
        this.inventory[item.id] = this.inventory[item.id] + amount;
      } else {
        this.inventory[item.id] = amount;
      }
      this.weight = yarp.utils.server.round(this.weight + (amount * item.weight), 1);
      return true;
    }
    return false;
  }

  /**
   * Take an item.
   * @instance
   * @function takeItem
   * @param {Object} item Item to take.
   * @param {Number} amount Amount to take.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
   */
  takeItem(item, amount) {
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.inventory[item.id] != null) {
      if (this.inventory[item.id]-amount >= 0) {
        this.inventory[item.id] = this.inventory[item.id]-amount;
        this.weight = yarp.utils.server.round(this.weight-(amount * item.weight), 1);
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
   * @param {String} id Item id.
   * @return {Boolean} If has or not the item.
   * @memberof Character
   */
  hasItem(id) {
    return (this.inventory[id] != null && this.inventory[id] > 0);
  }

  /**
   * Check if has all items.
   * @instance
   * @function hasItems
   * @param {Array<String>} items Items id.
   * @return {Boolean} If has or not all items.
   * @memberof Character
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
   * @param {Object} weapon Weapon object or id.
   * @param {Number} amount Amount of bullets.
   * @memberof Character
   */
  giveWeapon(weapon, amount) {
    if ((typeof weapon) === 'string') weapon = yarp.weapons[weapon];
    if (!this.hasWeapon(weapon.id)) {
      this.weapons[weapon.id] = 0;
    }
    if (!amount) amount = 0;
    this.weapons[weapon.id] += amount;
    this.player.giveWeapon(mp.joaat(weapon.id), amount);
    yarp.client.equipWeapon(this.player, weapon);
  }

  /**
   * Take a weapon.
   * @instance
   * @function takeWeapon
   * @param {Object} weapon Weapon object or id.
   * @memberof Character
   */
  takeWeapon(weapon) {
    if ((typeof weapon) === 'string') weapon = yarp.weapons[weapon];
    if (this.hasWeapon(weapon.id)) {
      this.weapons.splice(this.weapons.indexOf(weapon.id), 1);
    }
    let player = this.player;
    yarp.client.takeWeapon(player, weapon.id);
    yarp.client.unequipWeapon(player, weapon);
  }

  /**
   * Take weapon ammo.
   * @instance
   * @function takeWeaponAmmo
   * @param {String} id Weapon id.
   * @param {Number} amount Amount of bullets.
   * @memberof Character
   */
  takeWeaponAmmo(id, amount) {
    if (this.hasWeapon(id)) {
      this.weapons[id] -= amount;
      if (this.weapons[id] <= 0) {
        this.weapons[id] = 0;
      }
      yarp.client.setWeaponAmmo(this.player, id, this.weapons[id]);
    }
  }

  /**
   * Give weapon ammo.
   * @instance
   * @function giveWeaponAmmo
   * @param {String} id Weapon id.
   * @param {Number} amount Amount of bullets.
   * @memberof Character
   */
  giveWeaponAmmo(id, amount) {
    if (this.hasWeapon(id)) {
      this.weapons[id] += amount;
      yarp.client.setWeaponAmmo(this.player, id, this.weapons[id]);
    }
  }

  /**
   * Take ammo.
   * @instance
   * @function takeAmmo
   * @param {String} id Ammo id.
   * @param {Number} amount Amount of bullets.
   * @memberof Character
   */
  takeAmmo(id, amount) {
    let weaponId = id.replace('AMMO_', 'WEAPON_');
    if (this.hasWeapon(weaponId)) {
      this.weapons[weaponId] -= amount;
      if (this.weapons[weaponId] <= 0) {
        this.weapons[weaponId] = 0;
      }
      yarp.client.setWeaponAmmo(this.player, weaponId, this.weapons[weaponId]);
    }
  }

  /**
   * Give ammo.
   * @instance
   * @function giveAmmo
   * @param {String} id Ammo id.
   * @param {Number} amount Amount of bullets.
   * @memberof Character
   */
  giveAmmo(id, amount) {
    let weaponId = id.replace('AMMO_', 'WEAPON_');
    if (this.hasWeapon(weaponId)) {
      this.weapons[weaponId] += amount;
      yarp.client.setWeaponAmmo(this.player, weaponId, this.weapons[weaponId]);
    }
  }

  /**
   * Check if has a weapon.
   * @instance
   * @function hasWeapon
   * @param {String} id Weapon id.
   * @return {Boolean} If has or not the weapon.
   * @memberof Character
   */
  hasWeapon(id) {
    return (this.weapons[id] != null);
  }

  /**
   * Check if has all weapons.
   * @instance
   * @function hasWeapons
   * @param {Array<String>} weapons Weapons id.
   * @return {Boolean} If has or not all the weapons.
   * @memberof Character
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
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
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
          yarp.server.characterJoinedGroup(player, this, group);
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
   * @param {String} group Group id.
   * @return {Boolean} Operation success/fail.
   * @memberof Character
   */
  takeGroup(group) {
    if (this.groups.indexOf(group) > -1) {
      if (yarp.groups[group]) {
        let player = this.player;
        if (player) {
          yarp.groups[group].leave(player);
          yarp.server.characterLeftGroup(player, this, group);
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
   * @param {String} type Group type.
   * @return {String} Group id.
   * @memberof Character
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
   * @param {Array<String>} types Group types.
   * @return {Array<String>} Group ids.
   * @memberof Character
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
   * @param {String} id Group id.
   * @return {Boolean} If has or not the group.
   * @memberof Character
   */
  hasGroup(id) {
   return (this.groups.indexOf(id) > -1);
  }

  /**
   * Check if has all groups.
   * @instance
   * @function hasGroup
   * @param {Array<String>} groups Group ids.
   * @return {Boolean} If has or not all the groups.
   * @memberof Character
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
   * @param {String} permission Permission.
   * @return {Boolean} If has or not the permission.
   * @memberof Character
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
   * @param {Array<String>} permissions Permissions.
   * @return {Boolean} If has or not all permissions.
   * @memberof Character
   */
  hasPermissions(permissions) {
    for (let i = 0; i < permissions.length; i++) {
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Apply saved character customization to ped.
   * @instance
   * @function loadCustomization
   * @memberof Character
   */
  applyCustomization() {
    let player = this.player;
    if (player) {
      player.setCustomization(
        this.customization.gender == 0,
        this.customization.parents.mother,
        this.customization.parents.father,
        0,
        this.customization.parents.mother,
        this.customization.parents.father,
        0,
        this.customization.parents.similarity,
        this.customization.parents.skinSimilarity,
        0,
        this.customization.eyeColor,
        this.customization.hair.color,
        this.customization.hair.highlightColor,
        this.customization.features
      );
      player.setClothes(2, this.customization.hair.hair, 0, 2);
      for (let i = 0; i < 10; i++) player.setHeadOverlay(i, [this.customization.appearance[i].value, this.customization.appearance[i].opacity, this.colorForOverlayIdx(i), 0]);
    }
  }

  /**
   * Returns the default customization.
   * @static
   * @function defaultCustomization
   * @memberof Character
   */
  static get defaultCustomization() {
    let customization = {
      gender: 0,

      parents: {
        father: 0,
        mother: 0,
        similarity: 0.5,
        skinSimilarity: 0.5,
      },

      features: [],
      appearance: [],

      hair: {
        hair: 0,
        color: 0,
        highlightColor: 0,
      },

      eyebrowColor: 0,
      beardColor: 0,
      eyeColor: 0,
      blushColor: 0,
      lipstickColor: 0,
      chestHairColor: 0,
    };
    for (let i = 0; i <= 19; i++) customization.features.push(0.0);
    for (let i = 0; i <= 10; i++) customization.appearance.push({value: 255, opacity: 1.0});
    return customization;
  }

  /**
   * Sets character to default customization.
   * @instance
   * @function defaultCustomization
   * @param {Number} index Overlay index
   * @return {Number} Color
   * @memberof Character
   */
  colorForOverlayIdx(index) {
    let color;

    switch (index) {
      case 1:
        color = this.customization.beardColor;
        break;

      case 2:
        color = this.customization.eyebrowColor;
        break;

      case 5:
        color = this.customization.blushColor;
        break;

      case 8:
        color = this.customization.lipstickColor;
        break;

      case 10:
        color = this.customization.chestHairColor;
        break;

      default:
        color = 0;
    }

    return color;
  };

  /**
   * Open character inventory menu.
   * @instance
   * @function openInventory
   * @memberof Character
   */
  openInventory() {
    let player = this.player;
    let menu = new yarp.Menu({
      id: 'inventory'+this.id,
      title: ['Inventory'],
      offset: [0.1, 0.15],
    });

    let i = 0;
    for (let itemId in this.inventory) {
      if (this.inventory.hasOwnProperty(itemId)) {
        let item = yarp.items[itemId];
        let submenu = {
          type: 'submenu',
          id: 'inventory'+item.name,
          displayText: this.inventory[itemId]+' - '+item.name,
          caption: this.default(item.caption, ''),
          items: [],
        };

        let o = 0;
        for (let option in item.options) {
          if (item.options.hasOwnProperty(option)) {
            submenu.items.push({
              type: 'text',
              displayText: option,
              caption: option+` item`,
              data: {itemId: item.id, option: option, index: o, itemIndex: i},
            });
            o++;
          }
        }
        menu.add(submenu);
        i++;
      }
    }

    menu.add({
      type: 'close',
      displayText: 'Close',
    });

    menu.create(player);
    menu.open(player);
  }

  /**
   * Close character inventory menu.
   * @instance
   * @function closeInventory
   * @memberof Character
   */
  closeInventory() {
    yarp.menus['inventory'+this.id].close(this.player);
  }

  /**
   * Toggle character inventory menu.
   * @instance
   * @function toggleInventory
   * @memberof Character
   */
  toggleInventory() {
    if (!yarp.menus['inventory' + this.id] || !yarp.menus['inventory' +this.id].isVisible(this.player)) {
      this.openInventory();
    } else {
      this.closeInventory();
    }
  }
}

module.exports = Character;
