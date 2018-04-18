'use strict';
/**
* @file Menu events
* @namespace client.menu
*/

/**
 * Attach a weapon model to the character.
 * @event purchaseSaleItem
 * @memberof client.menu
 * @param {string} storeid - The store id.
 * @param {string} itemid - The item id.
 * @param {string} amount - The bought amount.
 * @fires purchaseSaleItem
 */
mp.events.add('purchaseSaleItem', (storeid, itemid, amount) => {
  mp.events.callRemote('purchaseSaleItem', storeid, itemid, amount);
});

/**
 * Attach a weapon model to the character.
 * @event purchaseAmmuWeapon
 * @memberof client.menu
 * @param {string} id - The weapon id.
 * @param {string} amount - The bought amount.
 * @fires purchaseAmmuWeapon
 */
mp.events.add('purchaseAmmuWeapon', (id, amount) => {
  mp.events.callRemote('purchaseAmmuWeapon', id, amount);
});

/**
 * Verifies the user password.
 * @event verifyLogin
 * @memberof client.menu
 * @param {string} password - The typed password.
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
 * @param {string} itemid - The item id.
 * @param {string} option - The option id.
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
	mp.events.call('browserExecute', 'bank', ['updateAccountMoney', money]);
});

/**
 * Updates bank account money on UI.
 * @event executeBankOperation
 * @memberof client.menu
 * @param {number} operation - 1 = Withdraw, 2 = Deposit, 3 = Transfer.
 * @param {number} amount - Amount of money.
 * @param {string} target - Character name.
 * @fires executeBankOperation
 */
mp.events.add('executeBankOperation', (operation, amount, target) => {
	mp.events.callRemote('executeBankOperation', operation, amount, target);
});

/**
 * Loads the bank balance from the transactions pool.
 * @event loadPlayerBankBalance
 * @memberof client.menu
 * @fires loadPlayerBankBalance
 */
mp.events.add('loadPlayerBankBalance', () => {
	mp.events.callRemote('loadPlayerBankBalance');
});
