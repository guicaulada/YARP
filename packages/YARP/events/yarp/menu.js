'use strict';
/**
* @file Menu events
*/

mp.events.add('loadBankBalance', (player) => {
  player.call('browserExecute', ['menu', ['showBankOperations', JSON.stringify(yarp.characters[player.name].balance), player.name]]);
});

mp.events.add('unbindToggleChat', (player) => {
  yarp.hotkeys['ToggleChat'].unbind(player);
});

mp.events.add('purchaseStoreItem', (player, storeid, itemid, amount) => {
  let character = yarp.characters[player.name];
  let store = yarp.stores[storeid];
  if (store) {
    let item = store.inventory[itemid];
    let total = item.price*amount;
    if (character.tryFullPayment(total)){
      character.giveItem(yarp.items[itemid],amount);
      item.amount -= amount;
      player.notify('Paid ~r~$'+total);
      player.notify('Received ~g~'+amount+' '+yarp.items[itemid].name);
      character.save();
    }
  } else {
    console.log(store);
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
    player.notify('Paid ~r~$'+total);
    player.notify('Received ~g~'+weapon.name+' +'+amount);
    character.save();
  }
});

mp.events.add('executeBankOperation', (player, operation, amount, target) => {
  let character = yarp.characters[player.name];
  if (chartacter) {
    switch (operation) {
      case 1:
      if (character.tryWithdraw(Number(amount))){
        player.call('browserExecute', ['menu', ['bankBack']]);
        player.notify(`Received ~g~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your bank account.');
        player.call('browserExecute', ['menu', ['showOperationError', 'Not enough money.']]);
      }
      break;
      case 2:
      if (character.tryDeposit(Number(amount))){
        player.call('browserExecute', ['menu', ['bankBack']]);
        player.notify(`Deposited ~b~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your wallet.');
        player.call('browserExecute', ['menu', ['showOperationError', 'Not enough money.']]);
      }
      break;
      case 3:
      if (character.tryTransfer(target,Number(amount))){
        player.call('browserExecute', ['menu', ['bankBack']]);
        player.notify(`Transferred ~r~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your bank account.');
        player.call('browserExecute', ['menu', ['showOperationError', 'Not enough money.']]);
      }
      break;
    }
  }
});

mp.events.add('verifyLogin', (player,password) => {
  let user = yarp.users[player.socialClub];
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
    player.call('createBrowser', ['menu', ['package://YARP/ui/html/accountLogin.html']]);
  }
});
