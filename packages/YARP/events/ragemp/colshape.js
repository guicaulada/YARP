'use strict';
/**
 * @file Colshape events
 * @namespace colshape
 */

/**
 * Player enter coolshape.
 * @event playerEnterColshape
 * @memberof colshape
 * @param {object} player - The player that called the event.
 * @param {object} shape - The colshape that was entered.
 */
mp.events.add('playerEnterColshape', (player,shape) => {
});

/**
 * Player exit coolshape.
 * @event playerExitColshape
 * @memberof colshape
 * @param {object} player - The player that called the event.
 * @param {object} shape - The colshape that was left.
 */
mp.events.add('playerExitColshape', (player,shape) => {
});
