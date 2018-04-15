'use strict';
/**
 * @file Waypoint events
 * @namespace waypoint
 */

/**
 * Waypoint created.
 * @event playerCreateWaypoint
 * @memberof waypoint
 * @param {object} player - The player that called the event.
 * @param {Vector3} position - Waypoiny position.
 */
mp.events.add('playerCreateWaypoint', (player, position) => {
});

/**
 * Waypoint reached.
 * @event playerReachWaypoint
 * @memberof waypoint
 * @param {object} player - The player that called the event.
 */
mp.events.add('playerReachWaypoint', (player) => {
});
