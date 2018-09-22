'use strict';
/**
 * UI events
 * @memberof yarp.server
 */

/**
 * Call inventory option.
 * @function callInventoryOption
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} itemId Item id.
 * @param {String} option Option id.
 */
yarp.server.callInventoryOption = (player, itemId, option) => {
  let item = yarp.items[itemId];
  item.options[option](player);
  let character = player.character;
  character.takeItem(item, 1);
  yarp.client.browserExecute(player, 'inventory', ['updateInventory', character.inventory[itemId]]);
};

/**
 * Loads bank balance.
 * @function loadBankBalance
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} itemId Item id.
 * @param {String} option Option id.
 */
yarp.server.loadBankBalance = (player) => {
  yarp.client.browserExecute(player, 'menu', ['showBankOperations', JSON.stringify(player.character.balance), player.name]);
};

/**
 * Unbind toggle chat hotkey.
 * @function unbindToggleChat
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 */
yarp.server.unbindToggleChat = (player) => {
  yarp.hotkeys['ToggleChat'].unbind(player);
};

/**
 * Purchase item for sale.
 * @function purchaseSaleItem
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} locationid Location id.
 * @param {String} itemId Item id.
 * @param {String} amount Amount to purchase.
 */
yarp.server.purchaseSaleItem = (player, locationid, itemId, amount) => {
  let character = player.character;
  let location = yarp.locations[locationid];
  if (location) {
    let item = yarp.items[itemId];
    let storeItem = location.inventory[itemId];
    let total = storeItem.price*amount;
    if (character.tryFullPayment(total)) {
      storeItem.amount -= amount;
      if (item.isWeapon()) {
        character.giveWeapon(yarp.weapons[item.id]);
      } else if (item.isAmmo()) {
        character.giveAmmo(item.id, amount);
      } else {
        character.giveItem(item, amount);
      }
      player.notify('Paid ~r~$'+total);
      player.notify('Received ~g~'+amount+' '+item.name);
      character.save();
    }
  }
};

/**
 * Execute bank operation.
 * @function executeBankOperation
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Number} operation Operation id.
 * @param {String} amount Amount of money.
 * @param {String} [target] Target of transfer.
 */
yarp.server.executeBankOperation = (player, operation, amount, target) => {
  let character = player.character;
  if (character) {
    switch (operation) {
      case 1:
      if (character.tryWithdraw(Number(amount))) {
        yarp.client.browserExecute(player, 'menu', ['bankBack']);
        player.notify(`Received ~g~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your bank account.');
        yarp.client.browserExecute(player, 'menu', ['showOperationError', 'Not enough money.']);
      }
      break;
      case 2:
      if (character.tryDeposit(Number(amount))) {
        yarp.client.browserExecute(player, 'menu', ['bankBack']);
        player.notify(`Deposited ~b~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your wallet.');
        yarp.client.browserExecute(player, 'menu', ['showOperationError', 'Not enough money.']);
      }
      break;
      case 3:
      if (yarp.characters[target]) {
        if (character.tryTransfer(yarp.characters[target], Number(amount))) {
          yarp.client.browserExecute(player, 'menu', ['bankBack']);
          player.notify(`Transferred ~r~$${amount}`);
        } else {
          player.notify('~r~Not enough money in your bank account.');
          yarp.client.browserExecute(player, 'menu', ['showOperationError', 'Not enough money.']);
        }
      } else {
        player.notify('~r~No bank account linked to that name.');
        yarp.client.browserExecute(player, 'menu', ['showOperationError', 'Account not found.']);
      }
      break;
    }
  }
};

/**
 *Verify user login.
 * @function verifyLogin
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} password User password.
 */
yarp.server.verifyLogin = (player, password) => {
  let user = yarp.users[player.socialClub];
  if (user == null) {
    user = new yarp.User({id: player.socialClub, password: bcrypt.hashSync(password, 10)});
    user.giveGroup(yarp.variables['Default Group'].value);
  }
  if (user.verifyPassword(password)) {
    player.user = user;
    user.player = player;
    user.updateLastLogin(player.ip);
    user.save();
    if (Object.keys(user.characters).length == 0) {
      yarp.client.showCharacterCreationMenu(player);
    } else {
      yarp.client.showPlayerCharacters(player, user.characters);
    }
  } else {
    yarp.client.createBrowser(player, 'menu', ['package://YARP/ui/html/accountLogin.html'], true, true);
  }
};
