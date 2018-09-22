'use strict';
/**
 * Waypoint events
 * @memberof ragemp.server
 */

/**
 * Waypoint created.
 * @event playerCreateWaypoint
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {Vector3} position Waypoiny position.
 */
mp.events.add('playerCreateWaypoint', (player, position) => {
});

/**
 * Waypoint reached.
 * @event playerReachWaypoint
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 */
mp.events.add('playerReachWaypoint', (player) => {
});
