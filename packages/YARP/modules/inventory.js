var cfg = require('../exports/config.js');
var db = require('../exports/database.js');

mp.events.add('loadInventoryMenu', (player) => {
  let inventoryJson = JSON.stringify(db.characters.getInventoryItems(player));
  player.call('showPlayerInventory', [inventoryJson, 0])
});

mp.events.add('useInventoryItem', (player, item_id) => {
  let item = cfg.items[item_id];
  let args = item.action.slice(1, item.action.length);
  mp.events.call(item.action[0], player, args);
});

mp.events.add('requestInventoryItem', (player, item_id) => {

});

mp.events.add('takeInventoryItem', (player, item_id) => {

});

mp.events.add('storeInventoryItem', (player, item_id) => {

});

mp.events.add('dropInventoryItem', (player, item_id) => {

});
