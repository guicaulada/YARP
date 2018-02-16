var cfg = require('../exports/config.js');
var db = require('../exports/database.js');

mp.events.add('loadStoreMenu', (player, file, id) => {
  var store = cfg[file][id];
  var i = 0;
  var items = [];
  //Treating config items for menu
  for(item_id in store.items) {
    var item = cfg.items[item_id];
    items[i] = item;
    items[i].price = store.items[item_id];
    items[i].id = item_id;
    i++;
  }
  player.call('showStoreMenu', [file, id, store.name, JSON.stringify(items), 1.0]);
});

mp.events.add('purchaseStoreItem', (player, file, id, item, amount) => {
  var price = cfg[file][id].items[item];
  if(db.characters.tryWalletPayment(player, price*amount)){
    db.characters.tryGiveInventoryItem(player, item, amount);
  }
});
