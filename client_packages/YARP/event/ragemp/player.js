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

mp.events.add("playerReady", player => {
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
