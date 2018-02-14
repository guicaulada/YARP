var items = require('./items.js');
var db = require('./database.js');

mp.events.add('loadBusinessMenu', (player, business) => {
  if(items[business] != null){
    player.call('showBusinessMenu', [business, JSON.stringify(items[business]), 1.0]);
  }
});

mp.events.add('purchaseBusinessItem', (player, business, id, amount) => {
  var item = items.getInventoryItem(business, id);
  if(db.CHARACTERS.tryWalletPayment(player, item.price*amount)){
    db.CHARACTERS.tryGiveInventoryItem(player, business, item, amount);
  }
});
