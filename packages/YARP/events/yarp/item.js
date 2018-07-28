'use strict';
/**
 * @file Item events
 * @namespace server.item
 */

/**
 * Restore hunger event.
 * @event restoreHunger
 * @memberof server.item
 * @param {object} player - The player that called the event.
 * @param {number} value - Amount to restore.
 */
mp.events.add('restoreHunger', (player, value) => {
  let character = yarp.characters[player.name];
  character.decreaseHunger(value);
});

/**
 * Restore thirst event.
 * @event restoreThirst
 * @memberof server.item
 * @param {object} player - The player that called the event.
 * @param {number} value - Amount to restore.
 */
mp.events.add('restoreThirst', (player, value) => {
  let character = yarp.characters[player.name];
  character.decreaseThirst(value);
});
