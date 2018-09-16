'use strict';
/**
* @file Menu events
* @namespace client.menu
*/

/**
 * Attach a weapon model to the character.
 * @event purchaseSaleItem
 * @memberof client.menu
 * @param {String} storeid The store id.
 * @param {String} itemid The item id.
 * @param {String} amount The bought amount.
 * @fires purchaseSaleItem
 */
mp.events.add('purchaseSaleItem', (storeid, itemid, amount) => {
  mp.events.callRemote('purchaseSaleItem', storeid, itemid, amount);
});

/**
 * Verifies the user password.
 * @event verifyLogin
 * @memberof client.menu
 * @param {String} password The typed password.
 * @fires verifyLogin
 */
mp.events.add('verifyLogin', (password) => {
  mp.events.callRemote('verifyLogin', password);
});

/**
 * Unbinds the toggle chat hotkey.
 * @event unbindToggleChat
 * @memberof client.menu
 * @fires unbindToggleChat
 */
mp.events.add('unbindToggleChat', () => {
  mp.events.callRemote('unbindToggleChat');
});

/**
 * Call an inventory item option.
 * @event callInventoryOption
 * @memberof client.menu
 * @param {String} itemid The item id.
 * @param {String} option The option id.
 * @fires callInventoryOption
 */
mp.events.add('callInventoryOption', (itemid, option) => {
  mp.events.callRemote('callInventoryOption', itemid, option);
});

/**
 * Updates bank account money on UI.
 * @event updateBankAccountMoney
 * @memberof client.menu
 * @fires browserExecute
 */
mp.events.add('updateBankAccountMoney', () => {
  let money = mp.players.local.getVariable('PLAYER_BANK');
  mp.events.call('browserExecute', 'menu', ['updateAccountMoney', money]);
});

/**
 * Updates bank account money on UI.
 * @event executeBankOperation
 * @memberof client.menu
 * @param {Number} operation 1 = Withdraw, 2 = Deposit, 3 = Transfer.
 * @param {Number} amount Amount of money.
 * @param {String} target Character name.
 * @fires executeBankOperation
 */
mp.events.add('executeBankOperation', (operation, amount, target) => {
  mp.events.callRemote('executeBankOperation', operation, amount, target);
});

/**
 * Loads the bank balance from the transactions pool.
 * @event loadBankBalance
 * @memberof client.menu
 * @fires loadBankBalance
 */
mp.events.add('loadBankBalance', () => {
  mp.events.callRemote('loadBankBalance');
});
