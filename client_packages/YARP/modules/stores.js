
mp.events.add('showStoreMenu', (storeJson, multiplier) => {
	mp.events.call('createBrowser', ['package://YARP/statics/html/sideMenu.html', 'populateStoreItems', storeJson, multiplier]);
});

mp.events.add('purchaseStoreItem', (id, amount) => {
  mp.events.callRemote('purchaseStoreItem', id, amount);
});
