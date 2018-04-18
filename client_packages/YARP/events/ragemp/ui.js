'use strict';
/**
* @file Ui events
* @namespace client.ui
*/

let old_wallet = 0;
let value_add = 0;
let moneyChange = false;
let changeDisplay = false;

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
  if(new_wallet != null){
    value_add += new_wallet-old_wallet;
    old_wallet = new_wallet;
    if(new_wallet < 0){
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(new_wallet)}`, [0.95, 0.1], {scale: [0.65,0.65], color:[224, 50, 50, 255], font: 7});
    }else{
      mp.game.graphics.drawText(`$${yarp.utils.numberWithCommas(new_wallet)}`, [0.95, 0.1], {scale: [0.65,0.65], color:[114, 204, 114, 255], font: 7});
    }
  }
  if(value_add != 0){
    moneyChange = true;
  }
  if (moneyChange) {
    if (!changeDisplay) {
      changeDisplay = true;
      setTimeout(() => {
        value_add = 0;
        moneyChange = false;
        changeDisplay = false;
      }, 5000);
    }
    if(value_add < 0){
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(Math.abs(value_add))}`, [0.95, 0.145], {scale: [0.65,0.65], color:[224, 50, 50, 255], font: 7});
    }else if(value_add > 0){
      mp.game.graphics.drawText(`+$${yarp.utils.numberWithCommas(value_add)}`, [0.95, 0.145], {scale: [0.65,0.65], color:[114, 204, 114, 255], font: 7});
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
});
