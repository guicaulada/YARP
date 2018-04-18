'use strict';
/**
 * @file Waypoint events
 * @namespace server.waypoint
 */

/**
 * Waypoint created.
 * @event playerCreateWaypoint
 * @memberof server.waypoint
 * @param {object} player - The player that called the event.
 * @param {Vector3} position - Waypoiny position.
 */
mp.events.add('playerCreateWaypoint', (player, position) => {
});

/**
 * Waypoint reached.
 * @event playerReachWaypoint
 * @memberof server.waypoint
 * @param {object} player - The player that called the event.
 */
mp.events.add('playerReachWaypoint', (player) => {
});
