var cfg = require('../exports/config.js');
var db = require('../exports/database.js');

mp.events.add('loadStoreMenu', (player, file, id) => {
  let store = cfg[file][id];
  let i = 0;
  let items = [];
  //Treating config items for menu
  for(item_id in store.items) {
    let item = cfg.items[item_id];
    if (item != null){
      items[i] = item;
      items[i].price = store.items[item_id];
      items[i].id = item_id;
      i++;
    }
  }
  player.call('showStoreMenu', [file, id, store.name, JSON.stringify(items)]);
});

mp.events.add('purchaseStoreItem', (player, file, id, item_id, amount) => {
  let item = cfg.items[item_id];
  item.id = item_id;
  if (item != null){
    let price = cfg[file][id].items[item_id]*amount;
    if(db.characters.tryWalletPayment(player, price)){
      db.characters.tryGiveInventoryItem(player, item, amount);
      player.notify(`Paid ~r~$${price}`);
      player.notify(`Received ~g~${amount} ${item.name}`);
    } else {
      player.notify("~r~Not enough money in your wallet.");
    }
  } else {
    player.notify("~r~ERROR:~w~ Invalid item.");
  }
});

mp.events.add('purchaseAmmuWeapon', (player, file, id, weapon_id, amount) => {
  let weapon = cfg.weapons[weapon_id];
  if (weapon != null){
    let body_price = cfg[file][id].weapons[weapon_id].body;
    let ammo_price = cfg[file][id].weapons[weapon_id].ammo;
    let price = ammo_price*amount;
    let player_weapons = db.characters.getWeapons(player);
    let weaponHash = mp.joaat(weapon_id);
    if(player_weapons[weaponHash] == null){
      price = price + body_price;
    }
    if(db.characters.tryWalletPayment(player, price)){
      player.giveWeapon(weaponHash, Number(amount));
      db.characters.giveWeapon(player, weaponHash, amount);
      player.notify(`Paid ~r~$${price}`);
      player.notify(`Equiped ~g~ ${weapon.name} (${amount})`);
    } else {
      player.notify("~r~Not enough money in your wallet.");
    }
  } else {
    player.notify("~r~ERROR:~w~ Invalid weapon.");
  }
});

mp.events.add('loadAmmuMenu', (player, file, id) => {
  let ammu = cfg[file][id];
  let i = 0;
  let weapons = [];
  //Treating config items for menu
  for(weapon_id in ammu.weapons) {
    let weapon = cfg.weapons[weapon_id];
    if (weapon != null){
      weapons[i] = weapon;
      weapons[i].price = ammu.weapons[weapon_id].body;
      weapons[i].ammo = ammu.weapons[weapon_id].ammo;
      weapons[i].id = weapon_id;
      i++;
    }
  }
  player.call('showAmmuMenu', [file, id, ammu.name, JSON.stringify(weapons)]);
});

mp.events.add('loadSelectorMenu', (player, file, id) => {
  let selector = cfg[file][id];
  //Treating config items for menu
  for(option in selector.options) {
    selector.options[option].id = option;
  }
  player.call('showSelectorMenu', [file, id, selector.name, JSON.stringify(selector.options)]);
});

mp.events.add('selectSelectorOption', (player, file, id, option_id) => {
  let selector = cfg[file][id];
  let option = selector.options[option_id];
  let args = option.event.slice(1, option.event.length);
  mp.events.call(option.event[0], player, args);
});

mp.events.add('selectorAddGroup', (player, args) => {
  if (db.characters.tryGiveGroup(player.name, args[0])){
    player.notify(`~g~New Group: ~w~${args[0]}`);
  } else {
    player.notify("You are already in that group!");
  }
});
