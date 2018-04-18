'use strict';
/**
 * @file Colshape events
 * @namespace server.colshape
 */

/**
 * Player enter coolshape.
 * @event playerEnterColshape
 * @memberof server.colshape
 * @param {object} player - The player that called the event.
 * @param {object} shape - The colshape that was entered.
 */
mp.events.add('playerEnterColshape', (player,shape) => {
});

/**
 * Player exit coolshape.
 * @event playerExitColshape
 * @memberof server.colshape
 * @param {object} player - The player that called the event.
 * @param {object} shape - The colshape that was left.
 */
mp.events.add('playerExitColshape', (player,shape) => {
});
