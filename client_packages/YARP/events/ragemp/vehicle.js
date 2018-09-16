'use strict';
/**
* @file Vehicle events
* @namespace client.vehicle
*/

/**
 * Entering vehicle.
 * @event playerStartEnterVehicle
 * @memberof client.vehicle
 * @param {Object} vehicle The vehicle of the event.
 * @param {Number} seat The seat he is sitting on.
 */
mp.events.add('playerStartEnterVehicle', (vehicle, seat) => {
});

/**
 * Entered vehicle.
 * @event playerEnterVehicle
 * @memberof client.vehicle
 * @param {Object} vehicle The vehicle of the event.
 * @param {Number} seat The seat he is sitting on.
 */
mp.events.add('playerEnterVehicle', (vehicle, seat) => {
});
