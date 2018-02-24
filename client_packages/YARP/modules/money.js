var lastWallet = 0;
var lastBank = 0;
var moneyUpdate = null;
var moneyUpdated = false;
var moneyColor = [];
mp.events.add('render', () => {
  let playerWallet = mp.players.local.getVariable("PLAYER_WALLET");
  if (playerWallet == null){
    playerWallet = 0;
  }
  let walletDiff = playerWallet-lastWallet;
  if (walletDiff < 0){
    moneyUpdate = `-$${-walletDiff}`;
    moneyColor = [255, 0, 0, 255];
  } else if (walletDiff > 0) {
    moneyUpdate = `+$${walletDiff}`;
    moneyColor = [0, 255, 0, 255];
  }
  let jobHeight = 0.1;
  if (moneyUpdate != null) {
    jobHeight = jobHeight + 0.05;
    mp.game.graphics.drawText(moneyUpdate, [1.0-(0.01*moneyUpdate.length), 0.1], {
      font: 7,
      color: moneyColor,
      scale: [0.75, 0.75],
      outline: true
    });
    if (!moneyUpdated){
      moneyUpdated = true;
      setTimeout(function(){
        moneyUpdate = null;
        moneyUpdated = false;
      },2500);
    }
  }
  lastWallet = playerWallet;
  let walletDisplay = `$${playerWallet}`;
  mp.game.graphics.drawText(walletDisplay, [1.0-(0.01*walletDisplay.length), 0.05], {
    font: 7,
    color: [255, 255, 255, 255],
    scale: [0.75, 0.75],
    outline: true
  });
  let playerJob = mp.players.local.getVariable("PLAYER_JOB");
  if (playerJob == null) {
    playerJob = "Citizen";
  }
  mp.game.graphics.drawText(playerJob, [1.0-(0.01*playerJob.length), jobHeight], {
    font: 7,
    color: [255, 255, 255, 255],
    scale: [0.75, 0.75],
    outline: true
  });
});
