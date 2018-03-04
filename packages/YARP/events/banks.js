mp.events.add('loadATM', (player) => {
  player.call('showATM');
});

mp.events.add('loadPlayerBankBalance', (player) => {
  let balanceJson = JSON.stringify(db.characters.getCharacterBalance(player));
  player.call('showPlayerBankBalance', [balanceJson, player.name])
});

mp.events.add('executeBankOperation', (player, operation, amount, target) => {
	// Ejecutamos una operación bancaria
  switch (operation) {
    case 1:
      if (db.characters.tryWithdraw(player,Number(amount))){
        player.call('bankOperationResponse', ['']);
        player.notify(`Received ~g~$${amount}`);
      } else {
        player.notify("~r~Not enough money in your bank account.");
        player.call('bankOperationResponse', ['Not enough money.']);
      }
      break;
    case 2:
      if (db.characters.tryDeposit(player,Number(amount))){
        player.call('bankOperationResponse', ['']);
        player.notify(`Deposited ~b~$${amount}`);
      } else {
        player.notify("~r~Not enough money in your wallet.");
        player.call('bankOperationResponse', ['Not enough money.']);
      }
      break;
    case 3:
      if (db.characters.tryTransfer(player,target,Number(amount))){
        player.call('bankOperationResponse', ['']);
        player.notify(`Transferred ~r~$${amount}`);
      } else {
        player.notify("~r~Not enough money in your bank account.");
        player.call('bankOperationResponse', ['Not enough money.']);
      }
      break;
  }
});
