'use strict';
/**
 * Vehicle events
 * @memberof ragemp.client
 */

/**
 * Entering vehicle.
 * @event playerStartEnterVehicle
 * @memberof ragemp.client
 * @param {Object} vehicle The vehicle of the event.
 * @param {Number} seat The seat he is sitting on.
 */
mp.events.add('playerStartEnterVehicle', (vehicle, seat) => {
});

/**
 * Entered vehicle.
 * @event playerEnterVehicle
 * @memberof ragemp.client
 * @param {Object} vehicle The vehicle of the event.
 * @param {Number} seat The seat he is sitting on.
 */
mp.events.add('playerEnterVehicle', (vehicle, seat) => {
});
