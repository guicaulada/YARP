'use strict';
/**
* @file Menu events
*/

mp.events.add('bindItemStore', (player, category) => {
  let items = yarp.items.categories[category];
  let hotkey = yarp.hotkeys["Store"];
  player.call("displayHelpText",["Press ~INPUT_PICKUP~ to shop."]);
  if (!hotkey) hotkey = new yarp.Hotkey("Store", "KEY_E", (player,args) => {
    player.call('createBrowser', ["menu", ['package://YARP/ui/html/sideMenu.html', 'populateStoreItems', args[0], JSON.stringify(args[1])]]);
  });
  hotkey.args = [category,items];
  hotkey.bind(player);
});

mp.events.add('unbindItemStore', (player) => {
  player.call("clearHelpText");
  yarp.hotkeys["Store"].unbind(player);
});

mp.events.add('bindFullWeaponStore', (player) => {
  let hotkey = yarp.hotkeys["Ammu-Nation"];
  player.call("displayHelpText",["Press ~INPUT_PICKUP~ to shop."]);
  if (!hotkey) hotkey = new yarp.Hotkey("Ammu-Nation", "KEY_E", (player,args) => {
    player.call('createBrowser', ["menu", ['package://YARP/ui/html/sideMenu.html', 'populateAmmuCategories', JSON.stringify(yarp.weapons.categories)]]);
  });
  hotkey.bind(player);
});

mp.events.add('unbindFullWeaponStore', (player) => {
  player.call("clearHelpText");
  yarp.hotkeys["Ammu-Nation"].unbind(player);
});

mp.events.add('bindFIBElevatorUp', (player) => {
  let hotkey = yarp.hotkeys["FIB Elevator Up"];
  player.call("displayHelpText",["Press ~INPUT_PICKUP~ to take the elevator."]);
  if (!hotkey) hotkey = new yarp.Hotkey("FIB Elevator Up", "KEY_E", (player,args) => {
    player.position = yarp.labels["FIB Elevator Down 1"].position;
  });
  hotkey.bind(player);
});

mp.events.add('unbindFIBElevatorUp', (player) => {
  player.call("clearHelpText");
  yarp.hotkeys["FIB Elevator Up"].unbind(player);
});

mp.events.add('bindFIBElevatorDown', (player) => {
  let hotkey = yarp.hotkeys["FIB Elevator Down"];
  player.call("displayHelpText",["Press ~INPUT_PICKUP~ to take the elevator."]);
  if (!hotkey) hotkey = new yarp.Hotkey("FIB Elevator Down", "KEY_E", (player,args) => {
    player.position = yarp.labels["FIB Elevator Up 1"].position;
  });
  hotkey.bind(player);
});

mp.events.add('unbindFIBElevatorDown', (player) => {
  player.call("clearHelpText");
  yarp.hotkeys["FIB Elevator Down"].unbind(player);
});

mp.events.add('purchaseStoreItem', (player, id, amount) => {
  let character = yarp.characters[player.name];
  let item = yarp.items[id];
  let total = item.price*amount;
  if (character.tryFullPayment(total)){
    character.giveItem(item,amount);
    player.notify("Paid ~r~$"+total);
    player.notify("Received ~g~"+amount+" "+item.name);
    character.save();
  }
});

mp.events.add('purchaseAmmuWeapon', (player, id, amount) => {
  let character = yarp.characters[player.name];
  let weapon = yarp.weapons[id];
  let total = weapon.ammo*amount;
  if (!character.hasWeapon(id)){
    total = total + weapon.price;
  }
  if (character.tryFullPayment(total)){
    character.giveWeapon(weapon,amount);
    player.notify("Paid ~r~$"+total);
    player.notify("Received ~g~"+weapon.name+" +"+amount);
    character.save();
  }
});

mp.events.add('verifyLogin', (player,password) => {
  let user = yarp.users[player.socialClub]
  if(user == null){
    user = new yarp.User(player.socialClub,password);
  }
  if (user.verifyPassword(password)) {
    user.updateLastLogin(player.ip);
    user.save();
    if(Object.keys(user.characters).length == 0){
      player.call('showCharacterCreationMenu');
    } else {
      player.call('showPlayerCharacters', [JSON.stringify(user.characters)]);
    }
  } else {
    player.call('createBrowser', ["menu", ['package://YARP/ui/html/accountLogin.html']]);
  }
});
