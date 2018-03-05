mp.events.add('loadInventoryMenu', (player) => {
  let inventoryJson = JSON.stringify(db.characters.getInventoryItems(player));
  player.call('showPlayerInventory', [inventoryJson, 0])
});

mp.events.add('useInventoryItem', (player, item_id) => {
  let item = yarp.items[item_id];
  item.id = item_id;
  let args = item.event.slice(1, item.event.length);
  if (db.characters.tryTakeInventoryItem(player, item, 1)){
    mp.events.call(item.event[0], player, args);
  }
});

mp.events.add('requestInventoryItem', (player, item_id) => {

});

mp.events.add('takeInventoryItem', (player, item_id) => {

});

mp.events.add('storeInventoryItem', (player, item_id) => {

});

mp.events.add('dropInventoryItem', (player, item_id) => {

});
