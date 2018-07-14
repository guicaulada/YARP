'use strict';
/**
 * @file Menu events
 * @namespace server.menu
 */

/**
 * Call inventory option.
 * @event callInventoryOption
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} itemId - Item id.
 * @param {string} option - Option id.
 * @fires browserExecute
 */
mp.events.add('callInventoryOption', (player, itemId, option) => {
  let item = yarp.items[itemId];
  item.options[option](player);
  let character = yarp.characters[player.name];
  character.takeItem(item, 1);
  player.call('browserExecute', ['inventory', ['updateInventory', character.inventory[itemId]]]);
});

/**
 * Loads bank balance.
 * @event loadBankBalance
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} itemId - Item id.
 * @param {string} option - Option id.
 * @fires browserExecute
 */
mp.events.add('loadBankBalance', (player) => {
  player.call('browserExecute', ['menu', ['showBankOperations', JSON.stringify(yarp.characters[player.name].balance), player.name]]);
});

/**
 * Unbind toggle chat hotkey.
 * @event unbindToggleChat
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 */
mp.events.add('unbindToggleChat', (player) => {
  yarp.hotkeys['ToggleChat'].unbind(player);
});

/**
 * Purchase item for sale.
 * @event purchaseSaleItem
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} locationid - Location id.
 * @param {string} itemId - Item id.
 * @param {string} amount - Amount to purchase.
 * @fires browserExecute
 */
mp.events.add('purchaseSaleItem', (player, locationid, itemId, amount) => {
  let character = yarp.characters[player.name];
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
});

/**
 * Execute bank operation.
 * @event executeBankOperation
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {number} operation - Operation id.
 * @param {string} amount - Amount of money.
 * @param {string} [target] - Target of transfer.
 * @fires browserExecute
 */
mp.events.add('executeBankOperation', (player, operation, amount, target) => {
  let character = yarp.characters[player.name];
  if (character) {
    switch (operation) {
      case 1:
      if (character.tryWithdraw(Number(amount))) {
        player.call('browserExecute', ['menu', ['bankBack']]);
        player.notify(`Received ~g~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your bank account.');
        player.call('browserExecute', ['menu', ['showOperationError', 'Not enough money.']]);
      }
      break;
      case 2:
      if (character.tryDeposit(Number(amount))) {
        player.call('browserExecute', ['menu', ['bankBack']]);
        player.notify(`Deposited ~b~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your wallet.');
        player.call('browserExecute', ['menu', ['showOperationError', 'Not enough money.']]);
      }
      break;
      case 3:
      if (yarp.characters[target]) {
        if (character.tryTransfer(yarp.characters[target], Number(amount))) {
          player.call('browserExecute', ['menu', ['bankBack']]);
          player.notify(`Transferred ~r~$${amount}`);
        } else {
          player.notify('~r~Not enough money in your bank account.');
          player.call('browserExecute', ['menu', ['showOperationError', 'Not enough money.']]);
        }
      } else {
        player.notify('~r~No bank account linked to that name.');
        player.call('browserExecute', ['menu', ['showOperationError', 'Account not found.']]);
      }
      break;
    }
  }
});

/**
 *Verify user login.
 * @event verifyLogin
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} password - User password.
 * @fires showCharacterCreationMenu
 * @fires showPlayerCharacters
 * @fires createBrowser
 */
mp.events.add('verifyLogin', (player, password) => {
  let user = yarp.users[player.socialClub];
  if (user == null) {
    user = new yarp.User(player.socialClub, password);
    user.giveGroup(yarp.variables['Default Group'].value);
  }
  if (user.verifyPassword(password)) {
    user.updateLastLogin(player.ip);
    user.save();
    if (Object.keys(user.characters).length == 0) {
      player.call('showCharacterCreationMenu');
    } else {
      player.call('showPlayerCharacters', [JSON.stringify(user.characters)]);
    }
  } else {
    player.call('createBrowser', ['menu', ['package://YARP/ui/html/accountLogin.html'], true, true]);
  }
});
