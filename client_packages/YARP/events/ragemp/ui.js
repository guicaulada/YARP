'use strict';
/**
* @file Ui events
*/
mp.events.add('displayHelpText', (text) => {
  mp.game.ui.setTextComponentFormat('STRING');
  mp.game.ui.addTextComponentSubstringPlayerName(text);
  mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);
});

mp.events.add('clearHelpText', () => {
  mp.game.ui.clearHelp(true);
});

function displaySpeedometer() {
	if(mp.players.local.isInAnyVehicle(false)) {
		let velocity = mp.players.local.vehicle.getVelocity(); /*find vehicleVelocity (x, y, z)*/
		let speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z); /*find vehicle speed*/

		/* if y want use km/h */
		let kmh = speed * 3.6;

		/* if y want use mp/h */
		let mph = speed * 2.236936;

  	mp.game.graphics.drawText(`Speed: ${kmh.toFixed(0)}`, [0.5, 0.850], {
      font: 7,
      color: [255, 255, 255, 185],
      scale: [0.5, 0.5],
      outline: false
    });
	}
}

mp.events.add('render', () => {
  displaySpeedometer();
});
