'use strict';
/**
* @file Waypoint events
* @namespace client.waypoint
*/

/**
 * Player created a waypoint.
 * @event playerCreateWaypoint
 * @memberof client.waypoint
 * @param {Vector3} position - The position of the waypoint.
 */
mp.events.add('playerCreateWaypoint', (position) => {
});

/**
 * Player have reached a waypoint.
 * @event playerReachWaypoint
 * @memberof client.waypoint
 */
mp.events.add('playerReachWaypoint', () => {
});
