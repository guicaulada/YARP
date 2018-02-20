var db = require('../exports/database.js');

mp.events.addCommand('inventory', (player) => {
  if (db.characters.hasPermission(player,"cmd.inventory")){
    let inventoryJson = JSON.stringify(db.characters.getInventoryItems(player));
    player.call('showPlayerInventory', [inventoryJson, 0])
  }
});

mp.events.addCommand("money", (player) => {
  if (db.characters.hasPermission(player,"cmd.money")){
    var character = db.characters.getCharacterByPlayer(player);
    player.outputChatBox(`Wallet: !{51, 204, 51}${character.wallet}`);
    player.outputChatBox(`Bank: !{0, 153, 255}${character.bank}`);
  }
});
