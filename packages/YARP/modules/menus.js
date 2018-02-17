var cfg = require('../exports/config.js');
var db = require('../exports/database.js');

mp.events.add('loadStoreMenu', (player, file, id) => {
  var store = cfg[file][id];
  var i = 0;
  var items = [];
  //Treating config items for menu
  for(item_id in store.items) {
    var item = cfg.items[item_id];
    if (item != null){
      items[i] = item;
      items[i].price = store.items[item_id];
      items[i].id = item_id;
      i++;
    }
  }
  player.call('showStoreMenu', [file, id, store.name, JSON.stringify(items), 1.0]);
});

mp.events.add('purchaseAmmuWeapon', (player, file, id, weapon, amount) => {
  var body_price = cfg[file][id].weapons[weapon].body;
  var ammo_price = cfg[file][id].weapons[weapon].ammo;
  var price = ammo_price*amount;
  var player_weapons = db.characters.getWeapons(player);
  var weaponHash = mp.joaat(weapon);
  if(player_weapons[weaponHash] == null){
    price = price + body_price;
  }
  if(db.characters.tryWalletPayment(player, price)){
    player.giveWeapon(weaponHash, Number(amount));
    db.characters.giveWeapon(player, weapon, amount);
  }
});

mp.events.add('loadAmmuMenu', (player, file, id) => {
  var ammu = cfg[file][id];
  var i = 0;
  var weapons = [];
  //Treating config items for menu
  for(weapon_id in ammu.weapons) {
    var weapon = cfg.weapons[weapon_id];
    if (weapon != null){
      weapons[i] = weapon;
      weapons[i].price = ammu.weapons[weapon_id].body;
      weapons[i].ammo = ammu.weapons[weapon_id].ammo;
      weapons[i].id = weapon_id;
      i++;
    }
  }
  player.call('showAmmuMenu', [file, id, ammu.name, JSON.stringify(weapons), 1.0]);
});
