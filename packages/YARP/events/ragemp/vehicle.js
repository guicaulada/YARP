'use strict';
/**
 * Vehicle events
 * @memberof ragemp.server
 */

/**
 * Entering vehicle.
 * @event playerStartEnterVehicle
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {Object} vehicle The vehicle of the event.
 * @param {Number} seat The seat he is sitting on.
 */
mp.events.add('playerStartEnterVehicle', (player, vehicle, seat) => {
});

/**
 * Entered vehicle.
 * @event playerEnterVehicle
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {Object} vehicle The vehicle of the event.
 * @param {Number} seat The seat he is sitting on.
 */
mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
});

/**
 * Exiting vehicle.
 * @event playerStartExitVehicle
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 */
mp.events.add('playerStartExitVehicle', (player) => {
});

/**
 * Exited vehicle.
 * @event playerExitVehicle
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {Object} vehicle The vehicle of the event.
 */
mp.events.add('playerExitVehicle', (player, vehicle) => {
});

/**
 * Attached trailer.
 * @event trailerAttached
 * @memberof ragemp.server
 * @param {Object} vehicle The vehicle that called the event.
 * @param {Object} trailer The trailer of the event.
 */
mp.events.add('trailerAttached', (vehicle, trailer) => {
});

/**
 * Vehicle damaged.
 * @event vehicleDamage
 * @memberof ragemp.server
 * @param {Object} vehicle The vehicle that called the event.
 * @param {Number} bodyHealthLoss Body health loss.
 * @param {Number} engineHealthLoss Engine health loss.
 */
mp.events.add('vehicleDamage', (vehicle, bodyHealthLoss, engineHealthLoss) => {
});

/**
 * Vehicle death.
 * @event vehicleDeath
 * @memberof ragemp.server
 * @param {Object} vehicle The vehicle that called the event.
 */
mp.events.add('vehicleDeath', (vehicle) => {
});

/**
 * Vehicle death.
 * @event vehicleHornToggle
 * @memberof ragemp.server
 * @param {Object} vehicle The vehicle that called the event.
 * @param {Boolean} toggle Horn on or off.
 */
mp.events.add('vehicleHornToggle', (vehicle, toggle) => {
});

/**
 * Vehicle death.
 * @event vehicleSirenToggle
 * @memberof ragemp.server
 * @param {Object} vehicle The vehicle that called the event.
 * @param {Boolean} toggle Siren on or off.
 */
mp.events.add('vehicleSirenToggle', (vehicle, toggle) => {
});
