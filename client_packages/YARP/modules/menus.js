
mp.events.add('showStoreMenu', (file, id, store, itemsJson) => {
	mp.events.call('createBrowser', ['package://YARP/statics/html/sideMenu.html', 'populateStoreItems', file, id, store, itemsJson]);
});

mp.events.add('purchaseStoreItem', (file, id, item, amount) => {
  mp.events.callRemote('purchaseStoreItem', file, id, item, amount);
});

mp.events.add('showAmmuMenu', (file, id, store, weaponsJson) => {
	mp.events.call('createBrowser', ['package://YARP/statics/html/sideMenu.html', 'populateAmmuWeapons', file, id, store, weaponsJson]);
});

mp.events.add('purchaseAmmuWeapon', (file, id, weapon, amount) => {
  mp.events.callRemote('purchaseAmmuWeapon', file, id, weapon, amount);
});

mp.events.add('showSelectorMenu', (file, id, selector, optionsJson) => {
	mp.events.call('createBrowser', ['package://YARP/statics/html/sideMenu.html', 'populateSelectorOptions', file, id, selector, optionsJson]);
});

//I know this is redundant, but it's safer.
mp.events.add('selectSelectorOption', (file, id, option) => {
  mp.events.callRemote('selectSelectorOption', file, id, option);
});
