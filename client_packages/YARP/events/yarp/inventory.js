'use strict';
/**
* @file Inventory events
*/
//Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/character/inventory.js
let targetType = null;

mp.events.add('showPlayerInventory', (inventoryJson, target) => {
	targetType = target;
  let title = "";
  switch(targetType) {
		case 0:
			title = "Inventory";
			break;
		case 1:
			title = "Inventory";
			break;
		case 2:
			title = "Trunk";
			break;
		case 3:
			title = "Trunk";
			break;
	}
	mp.events.call('createBrowser', "inventory", ['package://YARP/statics/html/inventory.html', 'populateInventory', inventoryJson, title]);
});

mp.events.add('getInventoryOptions', (itemType, itemHash) => {
	let optionsArray = [];
	let dropable = false;

	switch(targetType) {
		case 0:
			optionsArray.push("Use");
			dropable = true;
			break;
		case 1:
			optionsArray.push("Request");
			break;
		case 2:
			optionsArray.push("Take");
			break;
		case 3:
			optionsArray.push("Store");
			break;
	}
  if(dropable){
    optionsArray.push("Drop");
  }
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
