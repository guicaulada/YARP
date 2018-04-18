'use strict';
/**
* @file Checkpoint events
* @namespace client.checkpoint
*/

/**
* Player exit checkpoint.
* @event playerEnterCheckpoint
* @memberof client.checkpoint
* @param {object} checkpoint - The checkpoint that was left.
*/
mp.events.add('playerEnterCheckpoint', (checkpoint) => {
});

/**
* Player exit checkpoint.
* @event playerExitCheckpoint
* @memberof client.checkpoint
* @param {object} checkpoint - The checkpoint that was left.
*/
mp.events.add('playerExitCheckpoint', (checkpoint) => {
});
