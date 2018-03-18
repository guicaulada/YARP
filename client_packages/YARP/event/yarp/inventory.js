//Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/character/inventory.js
let targetType = null;

mp.events.add('showPlayerInventory', (inventoryJson, target) => {
	// Guardamos los datos del inventario
	targetType = target;
  let title = "";
  switch(targetType) {
		case 0:
			// Inventario
			title = "Inventory";
			break;
		case 1:
			// Cacheo a un jugador
			title = "Inventory";
			break;
		case 2:
			// Maletero de un vehículo
			title = "Trunk";
			break;
		case 3:
			// Inventario al maletero
			title = "Trunk";
			break;
	}
	// Mostramos la ventana con los objetos del inventario
	mp.events.call('createBrowser', "inventory", ['package://YARP/statics/html/inventory.html', 'populateInventory', inventoryJson, title]);
});

mp.events.add('getInventoryOptions', (itemType, itemHash) => {
	// Inicializamos el array de opciones
	let optionsArray = [];
	let dropable = false;

	// Miramos el tipo de objeto y la entidad destino
	switch(targetType) {
		case 0:
			// Inventario
			optionsArray.push("Use");
			dropable = true;
			break;
		case 1:
			// Cacheo a un jugador
			optionsArray.push("Request");
			break;
		case 2:
			// Maletero de un vehículo
			optionsArray.push("Take");
			break;
		case 3:
			// Inventario al maletero
			optionsArray.push("Store");
			break;
	}
  if(dropable){
    optionsArray.push("Drop");
  }
	// Mostramos las opciones en el navegador
	mp.events.call('browserExecute', "inventory", ['showInventoryOptions', optionsArray]);
});

mp.events.add('executeInventoryAction', (item_id, action) => {
	switch(action) {
		case 'Use':
			mp.events.callRemote('useInventoryItem', item_id);
			break;
		case 'Request':
			mp.events.callRemote('requestInventoryItem', item_id);
			break;
		case 'Take':
			mp.events.callRemote('takeInventoryItem', item_id);
			break;
		case 'Store':
			mp.events.callRemote('storeInventoryItem', item_id);
			break;
		case 'Drop':
			mp.events.callRemote('dropInventoryItem', item_id);
			break;
	}
});
