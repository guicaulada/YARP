'use strict';
/**
* @file Player events
*/

mp.events.add('playerChat', (message) => {
});

mp.events.add('playerCommand', (command) => {
});

mp.events.add('playerDeath', () => {
});

mp.events.add('playerJoin', () => {
});

mp.events.add('playerQuit', (exitType, reason) => {
});

mp.events.add("playerReady", (player) => {
	for (let i = 0; i<225; i++){
		let door = yarp.utils.doorInfo(i);
		mp.game.object.doorControl(door.model, door.position.x, door.position.y, door.position.z, 0, 0.0, door.heading, 0.0);
	}
});

mp.events.add('playerResurrect', () => {
});

mp.events.add("playerRuleTriggered", (rule, counter) => {
});

mp.events.add("playerSpawn", () => {
});

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
	mp.events.callRemote('playerWeaponShot', JSON.stringify(targetPosition), JSON.stringify(targetEntity));
});
