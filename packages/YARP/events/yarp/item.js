'use strict';
/**
 * Item events
 */

/**
 * Restore hunger event.
 * @function restoreHunger
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Number} value Amount to restore.
 */
yarp.server.restoreHunger = (player, value) => {
  let character = yarp.characters[player.name];
  character.hunger -= value;
};

/**
 * Restore thirst event.
 * @function restoreThirst
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Number} value Amount to restore.
 */
yarp.server.restoreThirst = (player, value) => {
  let character = yarp.characters[player.name];
  character.thirst -= value;
};
