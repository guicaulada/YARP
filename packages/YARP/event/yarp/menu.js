'use strict';
/**
* @file Menu events
*/

mp.events.add('showItemStore', (player, category) => {
  let items = yarp.items.categories[category];
  player.call('createBrowser', ["menu", ['package://YARP/ui/html/sideMenu.html', 'populateStoreItems', category, JSON.stringify(items)]]);
});

mp.events.add('showFullWeaponStore', (player) => {
  player.call('createBrowser', ["menu", ['package://YARP/ui/html/sideMenu.html', 'populateAmmuCategories', JSON.stringify(yarp.weapons.categories)]]);
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
