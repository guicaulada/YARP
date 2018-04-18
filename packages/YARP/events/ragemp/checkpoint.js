'use strict';
/**
 * @file Checkpoint events
 * @namespace server.checkpoint
 */

/**
 * Player exit checkpoint.
 * @event playerEnterCheckpoint
 * @memberof server.checkpoint
 * @param {object} player - The player that called the event.
 * @param {object} checkpoint - The checkpoint that was left.
 */
mp.events.add('playerEnterCheckpoint', (player, checkpoint) => {
});

/**
 * Player exit checkpoint.
 * @event playerExitCheckpoint
 * @memberof server.checkpoint
 * @param {object} player - The player that called the event.
 * @param {object} checkpoint - The checkpoint that was left.
 */
mp.events.add('playerExitCheckpoint', (player, checkpoint) => {
});
