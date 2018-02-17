
mp.events.add('showStoreMenu', (file, id, store, itemsJson, multiplier) => {
	mp.events.call('createBrowser', ['package://YARP/statics/html/sideMenu.html', 'populateStoreItems', file, id, store, itemsJson, multiplier]);
});

mp.events.add('purchaseStoreItem', (file, id, item, amount) => {
  mp.events.callRemote('purchaseStoreItem', file, id, item, amount);
});

mp.events.add('showAmmuMenu', (file, id, store, weaponsJson, multiplier) => {
	mp.events.call('createBrowser', ['package://YARP/statics/html/sideMenu.html', 'populateAmmuWeapons', file, id, store, weaponsJson, multiplier]);
});

mp.events.add('purchaseAmmuWeapon', (file, id, weapon, amount) => {
  mp.events.callRemote('purchaseAmmuWeapon', file, id, weapon, amount);
});
