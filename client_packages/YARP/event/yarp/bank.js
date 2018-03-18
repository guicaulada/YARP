//Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/bank/bank.js
mp.events.add('showATM', () => {
	// Desactivamos el chat
	mp.gui.chat.activate(false);
	mp.gui.chat.show(false);

	// Creamos la ventana del banco
	mp.events.call('createBrowser', "bank", ['package://YARP/statics/html/bankMenu.html']);
});

mp.events.add('updateBankAccountMoney', () => {
	// Obtenemos el dinero en el banco del jugador
	let money = mp.players.local.getVariable('PLAYER_BANK');

	// Actualizamos el valor del dinero
	mp.events.call('browserExecute', "bank", ['updateAccountMoney', money]);
});

mp.events.add('executeBankOperation', (operation, amount, target) => {
	// Ejecutamos una operación bancaria
	mp.events.callRemote('executeBankOperation', operation, amount, target);
});

mp.events.add('bankOperationResponse', (response) => {
	// Miramos la acción del cajero
	if (response == '') {
		mp.events.call('browserExecute', "bank", ['bankBack']);
	} else {
		mp.events.call('browserExecute', "bank", ['showOperationError', response]);
	}
});

mp.events.add('loadPlayerBankBalance', () => {
	// Cargamos el balance bancario del jugador
	mp.events.callRemote('loadPlayerBankBalance');
});

mp.events.add('showPlayerBankBalance', (operationJson, playerName) => {
	// Mostramos las operaciones del jugador
	mp.events.call('browserExecute', "bank", ['showBankOperations', operationJson, playerName]);
});

mp.events.add('closeATM', () => {
	// Borramos el menú del cajero
	mp.events.call('destroyBrowser', "bank");

	// Reactivamos el chat
	mp.gui.chat.activate(true);
	mp.gui.chat.show(true);
});
