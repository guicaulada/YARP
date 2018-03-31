'use strict';
/**
* @file Bank events
*/

//Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/bank/bank.js
mp.events.add('updateBankAccountMoney', () => {
	let money = mp.players.local.getVariable('PLAYER_BANK');
	mp.events.call('browserExecute', 'bank', ['updateAccountMoney', money]);
});

mp.events.add('executeBankOperation', (operation, amount, target) => {
	mp.events.callRemote('executeBankOperation', operation, amount, target);
});

mp.events.add('loadPlayerBankBalance', () => {
	mp.events.callRemote('loadPlayerBankBalance');
});
