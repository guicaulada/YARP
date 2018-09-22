'use strict';
/**
 * Waypoint events
 * @memberof ragemp.client
 */

/**
 * Player created a waypoint.
 * @event playerCreateWaypoint
 * @memberof ragemp.client
 * @param {Vector3} position The position of the waypoint.
 */
mp.events.add('playerCreateWaypoint', (position) => {
});

/**
 * Player have reached a waypoint.
 * @event playerReachWaypoint
 * @memberof ragemp.client
 */
mp.events.add('playerReachWaypoint', () => {
});
