'use strict';
/**
* @file Player events
* @namespace client.player
*/

/**
 * Player sent chat message.
 * @event playerChat
 * @memberof client.player
 * @param {String} message Message sent.
 */
mp.events.add('playerChat', (message) => {
});

/**
 * Player sent chat command.
 * @event playerCommand
 * @memberof client.player
 * @param {String} command Command sent.
 */
mp.events.add('playerCommand', (command) => {
});

/**
 * Player died.
 * @event playerDeath
 * @memberof client.player
 */
mp.events.add('playerDeath', () => {
});

/**
 * Player just joined.
 * @event playerJoin
 * @memberof client.player
 */
mp.events.add('playerJoin', () => {
});

/**
 * Player quit.
 * @event playerQuit
 * @memberof client.player
 * @param {String} exitType disconnect, timeout, kicked.
 * @param {String} reason Kick reason.
 */
mp.events.add('playerQuit', (exitType, reason) => {
});

/**
 * Player finished downloading.
 * @event playerReady
 * @memberof client.player
 */
mp.events.add('playerReady', () => {
});

/**
 * Player was ressurected by player.resurrect.
 * @event playerResurrect
 * @memberof client.player
 */
mp.events.add('playerResurrect', () => {
});

/**
 * Player rule was triggered.
 * @event playerRuleTriggered
 * @memberof client.player
 * @param {String} rule Rule name.
 * @param {Number} counter Amount of failed attempts.
 */
mp.events.add('playerRuleTriggered', (rule, counter) => {
});

/**
 * Player spawned.
 * @event playerSpawn
 * @memberof client.player
 */
mp.events.add('playerSpawn', () => {
});

/**
 * Player shot weapon.
 * @event playerSpawn
 * @memberof client.player
 * @param {Vector3} targetPosition Target position.
 * @param {Vector3} targetEntity Target entity.
 */
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
  mp.events.callRemote('playerWeaponShot', JSON.stringify(targetPosition), JSON.stringify(targetEntity));
});
