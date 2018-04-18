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
  let hunger = character.hunger-value[0];
  if (hunger > 0) {
    character.hunger = hunger;
  } else {
    character.hunger = 0;
    player.health += hunger;
  }
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
  let thirst = character.thirst-value[0];
  if (thirst > 0) {
    character.thirst = thirst;
  } else {
    character.thirst = 0;
    player.health += thirst;
  }
});
