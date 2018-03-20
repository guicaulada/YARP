
mp.events.add('purchaseStoreItem', (id, amount) => {
  mp.events.callRemote('purchaseStoreItem', id, amount);
});

mp.events.add('purchaseAmmuWeapon', (id, amount) => {
  mp.events.callRemote('purchaseAmmuWeapon', id, amount);
});

mp.events.add('selectSelectorOption', (file, id, option) => {
  mp.events.callRemote('selectSelectorOption', file, id, option);
});

mp.events.add('verifyLogin', (password) => {
  mp.events.callRemote('verifyLogin', password);
});
