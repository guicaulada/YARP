'use strict';
/**
 * Colshape events
 */

/**
 * Player enter coolshape.
 * @event playerEnterColshape
 * @memberof ragemp.client
 * @param {Object} shape The colshape that was entered.
 */
mp.events.add('playerEnterColshape', (shape) => {
});

/**
 * Player exit coolshape.
 * @event playerExitColshape
 * @memberof ragemp.client
 * @param {Object} shape The colshape that was left.
 */
mp.events.add('playerExitColshape', (shape) => {
});
