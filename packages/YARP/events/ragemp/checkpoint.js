'use strict';
/**
 * Checkpoint events
 */

/**
 * Player exit checkpoint.
 * @event playerEnterCheckpoint
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {Object} checkpoint The checkpoint that was left.
 */
mp.events.add('playerEnterCheckpoint', (player, checkpoint) => {
});

/**
 * Player exit checkpoint.
 * @event playerExitCheckpoint
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {Object} checkpoint The checkpoint that was left.
 */
mp.events.add('playerExitCheckpoint', (player, checkpoint) => {
});
