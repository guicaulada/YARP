'use strict';
/**
* @file Menu events
*/

mp.events.add('purchaseStoreItem', (id, amount) => {
  mp.events.callRemote('purchaseStoreItem', id, amount);
});

mp.events.add('purchaseAmmuWeapon', (id, amount) => {
  mp.events.callRemote('purchaseAmmuWeapon', id, amount);
});

mp.events.add('verifyLogin', (password) => {
  mp.events.callRemote('verifyLogin', password);
});
