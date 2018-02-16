
mp.events.add('showStoreMenu', (file, id, store, itemsJson, multiplier) => {
	mp.events.call('createBrowser', ['package://YARP/statics/html/sideMenu.html', 'populateStoreItems', file, id, store, itemsJson, multiplier]);
});

mp.events.add('purchaseStoreItem', (file, id, item, amount) => {
  mp.events.callRemote('purchaseStoreItem', file, id, item, amount);
});
