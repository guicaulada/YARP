'use strict';
/**
 * @file Player events
 * @namespace client.player
 */

/**
 * Player sent chat message.
 * @event playerChat
 * @memberof ragemp.client
 * @param {String} message Message sent.
 */
mp.events.add('playerChat', (message) => {
});

/**
 * Player sent chat command.
 * @event playerCommand
 * @memberof ragemp.client
 * @param {String} command Command sent.
 */
mp.events.add('playerCommand', (command) => {
});

/**
 * Player died.
 * @event playerDeath
 * @memberof ragemp.client
 */
mp.events.add('playerDeath', () => {
});

/**
 * Player just joined.
 * @event playerJoin
 * @memberof ragemp.client
 */
mp.events.add('playerJoin', () => {
});

/**
 * Player quit.
 * @event playerQuit
 * @memberof ragemp.client
 * @param {String} exitType disconnect, timeout, kicked.
 * @param {String} reason Kick reason.
 */
mp.events.add('playerQuit', (exitType, reason) => {
});

/**
 * Player finished downloading.
 * @event playerReady
 * @memberof ragemp.client
 */
mp.events.add('playerReady', () => {
});

/**
 * Player was ressurected by player.resurrect.
 * @event playerResurrect
 * @memberof ragemp.client
 */
mp.events.add('playerResurrect', () => {
});

/**
 * Player rule was triggered.
 * @event playerRuleTriggered
 * @memberof ragemp.client
 * @param {String} rule Rule name.
 * @param {Number} counter Amount of failed attempts.
 */
mp.events.add('playerRuleTriggered', (rule, counter) => {
});

/**
 * Player spawned.
 * @event playerSpawn
 * @memberof ragemp.client
 */
mp.events.add('playerSpawn', () => {
});

/**
 * Player shot weapon.
 * @event playerSpawn
 * @memberof ragemp.client
 * @param {Vector3} targetPosition Target position.
 * @param {Vector3} targetEntity Target entity.
 */
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
  mp.events.callRemote('playerWeaponShot', JSON.stringify(targetPosition), JSON.stringify(targetEntity));
});
