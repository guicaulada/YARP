'use strict';
/**
* @file Colshape events
* @namespace client.colshape
*/

/**
* Player enter coolshape.
* @event playerEnterColshape
* @memberof client.colshape
* @param {object} shape - The colshape that was entered.
*/
mp.events.add('playerEnterColshape', (shape) => {
});

/**
* Player exit coolshape.
* @event playerExitColshape
* @memberof client.colshape
* @param {object} shape - The colshape that was left.
*/
mp.events.add('playerExitColshape', (shape) => {
});
