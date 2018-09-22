'use strict';
/**
 * Checkpoint events
 * @memberof ragemp.client
 */

/**
 * Player exit checkpoint.
 * @event playerEnterCheckpoint
 * @memberof ragemp.client
 * @param {Object} checkpoint The checkpoint that was left.
 */
mp.events.add('playerEnterCheckpoint', (checkpoint) => {
});

/**
 * Player exit checkpoint.
 * @event playerExitCheckpoint
 * @memberof ragemp.client
 * @param {Object} checkpoint The checkpoint that was left.
 */
mp.events.add('playerExitCheckpoint', (checkpoint) => {
});
