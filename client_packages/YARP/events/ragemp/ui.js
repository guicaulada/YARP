'use strict';
/**
* @file Ui events
* @namespace client.ui
*/

let old_wallet = 0;
let wallet_add = 0;
let old_bank = 0;
let bank_add = 0;
let old_xp = 0;
let xp_add = 0;
let xpChange = false;
let xpChangeDisplay = false;
let walletChange = false;
let walletChangeDisplay = false;
let bankChange = false;
let bankChangeDisplay = false;

/**
 * Displays help text on top left.
 * @event displayHelpText
 * @memberof client.ui
 * @param {string} text - Text to be displayed.
 */
mp.events.add('displayHelpText', (text) => {
  mp.game.ui.setTextComponentFormat('STRING');
  mp.game.ui.addTextComponentSubstringPlayerName(text);
  mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);
});

/**
 * Clears help text on top left.
 * @event clearHelpText
 * @memberof client.ui
 */
mp.events.add('clearHelpText', () => {
  mp.game.ui.clearHelp(true);
});

/**
 * Diplays speedometer when inside a vehicle.
 * @function displaySpeedometer
 * @memberof client.ui
 * @param {boolean} mph - Miles or kilometers (true or false).
 */
function displaySpeedometer(mph) {
	if(mp.players.local.isInAnyVehicle(false)) {
		let velocity = mp.players.local.vehicle.getVelocity();
		let speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

		speed = (mph) ? speed * 2.236936 : speed * 3.6;

  	mp.game.graphics.drawText(`Speed: ${speed.toFixed(0)}`, [0.5, 0.850], {
      font: 7,
      color: [255, 255, 255, 185],
      scale: [0.5, 0.5],
      outline: false
    });
	}
}

/**
 * Diplays wallet and money changes.
 * @function displayWallet
 * @memberof client.ui
 */
function displayWallet() {
  let new_wallet = mp.players.local.getVariable('PLAYER_WALLET');
  if (new_wallet != null) {
    wallet_add += new_wallet - old_wallet;
    old_wallet = new_wallet;
    if (new_wallet < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(new_wallet)}`, [0.95, 0.1], { scale: [0.65, 0.65], color: [224, 50, 50, 255], font: 7 });
    } else {
      mp.game.graphics.drawText(`$${yarp.utils.numberWithCommas(new_wallet)}`, [0.95, 0.1], { scale: [0.65, 0.65], color: [114, 204, 114, 255], font: 7 });
    }
  }
  if (wallet_add != 0) {
    walletChange = true;
  }
  if (walletChange) {
    if (!walletChangeDisplay) {
      walletChangeDisplay = true;
      setTimeout(() => {
        wallet_add = 0;
        walletChange = false;
        walletChangeDisplay = false;
      }, 5000);
    }
    if (wallet_add < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(Math.abs(wallet_add))}`, [0.95, 0.145], { scale: [0.65, 0.65], color: [224, 50, 50, 255], font: 7 });
    } else if (wallet_add > 0) {
      mp.game.graphics.drawText(`+$${yarp.utils.numberWithCommas(wallet_add)}`, [0.95, 0.145], { scale: [0.65, 0.65], color: [114, 204, 114, 255], font: 7 });
    }
  }
}

/**
 * Diplays bank and money changes.
 * @function displayBank
 * @memberof client.ui
 */
function displayBank() {
  let new_bank = mp.players.local.getVariable('PLAYER_BANK');
  if (new_bank != null) {
    bank_add += new_bank - old_bank;
    old_bank = new_bank;
    if (new_bank < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(new_bank)}`, [0.95, 0.190], { scale: [0.65, 0.65], color: [224, 50, 50, 255], font: 7 });
    } else {
      mp.game.graphics.drawText(`$${yarp.utils.numberWithCommas(new_bank)}`, [0.95, 0.190], { scale: [0.65, 0.65], color: [114, 114, 204, 255], font: 7 });
    }
  }
  if (bank_add != 0) {
    bankChange = true;
  }
  if (bankChange) {
    if (!bankChangeDisplay) {
      bankChangeDisplay = true;
      setTimeout(() => {
        bank_add = 0;
        bankChange = false;
        bankChangeDisplay = false;
      }, 5000);
    }
    if (bank_add < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(Math.abs(bank_add))}`, [0.95, 0.235], { scale: [0.65, 0.65], color: [224, 50, 50, 255], font: 7 });
    } else if (bank_add > 0) {
      mp.game.graphics.drawText(`+$${yarp.utils.numberWithCommas(bank_add)}`, [0.95, 0.235], { scale: [0.65, 0.65], color: [114, 114, 204, 255], font: 7 });
    }
  }
}

/**
 * Diplays xp and xp changes.
 * @function displayXp
 * @memberof client.ui
 */
function displayXp() {
  let new_xp = mp.players.local.getVariable('PLAYER_XP');
  if (new_xp != null) {
    xp_add += new_xp - old_xp;
    old_xp = new_xp;
    if (new_xp < 0) {
      mp.game.graphics.drawText(`-${yarp.utils.numberWithCommas(new_xp)} XP`, [0.95, 0.280], { scale: [0.65, 0.65], color: [224, 50, 50, 255], font: 7 });
    } else {
      mp.game.graphics.drawText(`${yarp.utils.numberWithCommas(new_xp)} XP`, [0.95, 0.280], { scale: [0.65, 0.65], color: [80, 80, 224, 255], font: 7 });
    }
  }
  if (xp_add != 0) {
    xpChange = true;
  }
  if (xpChange) {
    if (!xpChangeDisplay) {
      xpChangeDisplay = true;
      setTimeout(() => {
        xp_add = 0;
        xpChange = false;
        xpChangeDisplay = false;
      }, 5000);
    }
    if (xp_add < 0) {
      mp.game.graphics.drawText(`-${yarp.utils.numberWithCommas(Math.abs(xp_add))} XP`, [0.95, 0.325], { scale: [0.65, 0.65], color: [224, 50, 50, 255], font: 7 });
    } else if (xp_add > 0) {
      mp.game.graphics.drawText(`+${yarp.utils.numberWithCommas(xp_add)} XP`, [0.95, 0.325], { scale: [0.65, 0.65], color: [80, 80, 224, 255], font: 7 });
    }
  }
}

/**
 * Renders the UI.
 * @event render
 * @memberof client.ui
 */
mp.events.add('render', () => {
  displaySpeedometer();
  displayWallet();
  displayBank();
  displayXp();
});
