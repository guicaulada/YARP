'use strict';
/**
* Menu events
*/

/**
 * Attach a weapon model to the character.
 * @function purchaseSaleItem
 * @memberof client.menu
 * @param {String} storeid The store id.
 * @param {String} itemid The item id.
 * @param {String} amount The bought amount.
 */
yarp.client.purchaseSaleItem = (storeid, itemid, amount) => {
  yarp.server.purchaseSaleItem(storeid, itemid, amount);
};

/**
 * Verifies the user password.
 * @function verifyLogin
 * @memberof client.menu
 * @param {String} password The typed password.
 */
yarp.client.verifyLogin = (password) => {
  yarp.server.verifyLogin(password);
};

/**
 * Unbinds the toggle chat hotkey.
 * @function unbindToggleChat
 * @memberof client.menu
 */
yarp.client.unbindToggleChat = () => {
  yarp.server.unbindToggleChat();
};

/**
 * Call an inventory item option.
 * @function callInventoryOption
 * @memberof client.menu
 * @param {String} itemid The item id.
 * @param {String} option The option id.
 */
yarp.client.callInventoryOption = (itemid, option) => {
  yarp.server.callInventoryOption(itemid, option);
};

/**
 * Updates bank account money on UI.
 * @function updateBankAccountMoney
 * @memberof client.menu
 */
yarp.client.updateBankAccountMoney = () => {
  let money = mp.players.local.getVariable('PLAYER_BANK');
  yarp.client.browserExecute('menu', ['updateAccountMoney', money]);
};

/**
 * Updates bank account money on UI.
 * @function executeBankOperation
 * @memberof client.menu
 * @param {Number} operation 1 = Withdraw, 2 = Deposit, 3 = Transfer.
 * @param {Number} amount Amount of money.
 * @param {String} target Character name.
 */
yarp.client.executeBankOperation = (operation, amount, target) => {
  yarp.server.executeBankOperation(operation, amount, target);
};

/**
 * Loads the bank balance from the transactions pool.
 * @function loadBankBalance
 * @memberof client.menu
 */
yarp.client.loadBankBalance = () => {
  yarp.server.loadBankBalance();
};
