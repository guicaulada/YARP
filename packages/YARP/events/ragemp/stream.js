'use strict';
/**
 * @file Stream events
 * @namespace server.stream
 */

/**
 * Player stream in.
 * @event playerStreamIn
 * @memberof server.stream
 * @param {object} player - The player that called the event.
 * @param {object} forPlayer - For which player he was just streamed in.
 */
mp.events.add('playerStreamIn', (player, forPlayer) => {
});

/**
 * Player stream out.
 * @event playerStreamOut
 * @memberof server.stream
 * @param {object} player - The player that called the event.
 * @param {object} forPlayer - For which player he was just streamed out.
 */
mp.events.add('playerStreamOut', (player, forPlayer) => {
});
