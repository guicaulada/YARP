'use strict';
/**
 * @file Colshape events
 * @namespace server.colshape
 */

/**
 * Player enter coolshape.
 * @event playerEnterColshape
 * @memberof server.colshape
 * @param {Object} player The player that called the event.
 * @param {Object} shape The colshape that was entered.
 */
mp.events.add('playerEnterColshape', (player, shape) => {
});

/**
 * Player exit coolshape.
 * @event playerExitColshape
 * @memberof server.colshape
 * @param {Object} player The player that called the event.
 * @param {Object} shape The colshape that was left.
 */
mp.events.add('playerExitColshape', (player, shape) => {
});
