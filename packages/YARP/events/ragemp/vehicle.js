'use strict';
/**
 * @file Vehicle events
 * @namespace server.vehicle
 */

/**
 * Entering vehicle.
 * @event playerStartEnterVehicle
 * @memberof server.vehicle
 * @param {object} player The player that called the event.
 * @param {object} vehicle The vehicle of the event.
 * @param {number} seat The seat he is sitting on.
 */
mp.events.add('playerStartEnterVehicle', (player, vehicle, seat) => {
});

/**
 * Entered vehicle.
 * @event playerEnterVehicle
 * @memberof server.vehicle
 * @param {object} player The player that called the event.
 * @param {object} vehicle The vehicle of the event.
 * @param {number} seat The seat he is sitting on.
 */
mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
});

/**
 * Exiting vehicle.
 * @event playerStartExitVehicle
 * @memberof server.vehicle
 * @param {object} player The player that called the event.
 */
mp.events.add('playerStartExitVehicle', (player) => {
});

/**
 * Exited vehicle.
 * @event playerExitVehicle
 * @memberof server.vehicle
 * @param {object} player The player that called the event.
 * @param {object} vehicle The vehicle of the event.
 */
mp.events.add('playerExitVehicle', (player, vehicle) => {
});

/**
 * Attached trailer.
 * @event trailerAttached
 * @memberof server.vehicle
 * @param {object} vehicle The vehicle that called the event.
 * @param {object} trailer The trailer of the event.
 */
mp.events.add('trailerAttached', (vehicle, trailer) => {
});

/**
 * Vehicle damaged.
 * @event vehicleDamage
 * @memberof server.vehicle
 * @param {object} vehicle The vehicle that called the event.
 * @param {number} bodyHealthLoss Body health loss.
 * @param {number} engineHealthLoss Engine health loss.
 */
mp.events.add('vehicleDamage', (vehicle, bodyHealthLoss, engineHealthLoss) => {
});

/**
 * Vehicle death.
 * @event vehicleDeath
 * @memberof server.vehicle
 * @param {object} vehicle The vehicle that called the event.
 */
mp.events.add('vehicleDeath', (vehicle) => {
});

/**
 * Vehicle death.
 * @event vehicleHornToggle
 * @memberof server.vehicle
 * @param {object} vehicle The vehicle that called the event.
 * @param {boolean} toggle Horn on or off.
 */
mp.events.add('vehicleHornToggle', (vehicle, toggle) => {
});

/**
 * Vehicle death.
 * @event vehicleSirenToggle
 * @memberof server.vehicle
 * @param {object} vehicle The vehicle that called the event.
 * @param {boolean} toggle Siren on or off.
 */
mp.events.add('vehicleSirenToggle', (vehicle, toggle) => {
});
