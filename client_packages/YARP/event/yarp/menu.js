
mp.events.add('showStoreMenu', (file, id, store, itemsJson) => {
	mp.events.call('createBrowser', ['package://YARP/ui/html/sideMenu.html', 'populateStoreItems', file, id, store, itemsJson]);
});

mp.events.add('purchaseStoreItem', (file, id, item, amount) => {
  mp.events.callRemote('purchaseStoreItem', file, id, item, amount);
});

mp.events.add('showAmmuMenu', (file, id, store, weaponsJson) => {
	mp.events.call('createBrowser', ['package://YARP/ui/html/sideMenu.html', 'populateAmmuWeapons', file, id, store, weaponsJson]);
});

mp.events.add('purchaseAmmuWeapon', (file, id, weapon, amount) => {
  mp.events.callRemote('purchaseAmmuWeapon', file, id, weapon, amount);
});

mp.events.add('showSelectorMenu', (file, id, selector, optionsJson) => {
	mp.events.call('createBrowser', ['package://YARP/ui/html/sideMenu.html', 'populateSelectorOptions', file, id, selector, optionsJson]);
});

mp.events.add('selectSelectorOption', (file, id, option) => {
  mp.events.callRemote('selectSelectorOption', file, id, option);
});

mp.events.add('yarp_showLoginMenu', (socialClub) => {
  mp.events.call('createBrowser', ['package://YARP/ui/html/accountLogin.html']);
});

mp.events.add('yarp_showRegistrationMenu', (socialClub) => {
  mp.events.call('createBrowser', ['package://YARP/ui/html/accountRegister.html','setAccountName',socialClub]);
});

mp.events.add('yarp_verifyLogin', (password) => {
  mp.events.callRemote('yarp_verifyLogin', password);
});
