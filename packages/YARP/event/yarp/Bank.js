'use strict';
/**
* @file Bank events
*/

mp.events.add('loadATM', (player) => {
  player.call('createBrowser', ["bank", ['package://YARP/statics/html/bankMenu.html']]);
});

mp.events.add('loadPlayerBankBalance', (player) => {
  player.call('browserExecute', ["bank", ['showBankOperations', JSON.stringify(yarp.characters[player.name].balance), player.name]]);
});

mp.events.add('executeBankOperation', (player, operation, amount, target) => {
  let character = yarp.characters[player.name];
  if (chartacter) {
    switch (operation) {
      case 1:
      if (character.tryWithdraw(Number(amount))){
        player.call('browserExecute', ["bank", ['bankBack']]);
        player.notify(`Received ~g~$${amount}`);
      } else {
        player.notify("~r~Not enough money in your bank account.");
        player.call('browserExecute', ["bank", ['showOperationError', 'Not enough money.']]);
      }
      break;
      case 2:
      if (character.tryDeposit(Number(amount))){
        player.call('browserExecute', ["bank", ['bankBack']]);
        player.notify(`Deposited ~b~$${amount}`);
      } else {
        player.notify("~r~Not enough money in your wallet.");
        player.call('browserExecute', ["bank", ['showOperationError', 'Not enough money.']]);
      }
      break;
      case 3:
      if (character.tryTransfer(target,Number(amount))){
        player.call('browserExecute', ["bank", ['bankBack']]);
        player.notify(`Transferred ~r~$${amount}`);
      } else {
        player.notify("~r~Not enough money in your bank account.");
        player.call('browserExecute', ["bank", ['showOperationError', 'Not enough money.']]);
      }
      break;
    }
  }
});
