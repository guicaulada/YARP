var cfg = require('../exports/config.js');
var db = require('../exports/database.js');

mp.events.add('loadStoreMenu', (player, file, id) => {
  var store = cfg[file][id];
  player.call('showStoreMenu', [JSON.stringify(store), 1.0]);
});

mp.events.add('purchaseStoreItem', (player, id, amount) => {
  var item = cfg.items[id];
  if(db.characters.tryWalletPayment(player, item.price*amount)){
    db.characters.tryGiveInventoryItem(player, id, amount);
  }
});
