
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

mp.events.add('showAuthenticationMenu', (juser, jtime) => {
  let user = JSON.parse(juser);
  let time = JSON.parse(jtime);
	mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
	mp.game.time.setClockTime(time.h, time.m, time.s);
  if (user.password == null){
    mp.events.call('createBrowser', ['package://YARP/statics/html/accountRegister.html','setAccountName',user.socialClub]);
  } else {
    mp.events.call('createBrowser', ['package://YARP/statics/html/accountLogin.html']);
  }
});

mp.events.add('verifyAuthentication', (password) => {
  mp.events.callRemote('verifyAuthentication', password);
});
