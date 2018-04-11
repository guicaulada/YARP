'use strict';
/**
* @file Menu events
*/

mp.events.add('purchaseSaleItem', (storeid, itemid, amount) => {
  mp.events.callRemote('purchaseSaleItem', storeid, itemid, amount);
});

mp.events.add('purchaseAmmuWeapon', (id, amount) => {
  mp.events.callRemote('purchaseAmmuWeapon', id, amount);
});

mp.events.add('verifyLogin', (password) => {
  mp.events.callRemote('verifyLogin', password);
});

mp.events.add('unbindToggleChat', (code) => {
  mp.events.callRemote('unbindToggleChat');
});

mp.events.add('callInventoryOption', (item_id, option) => {
	mp.events.callRemote('callInventoryOption', item_id, option);
});
