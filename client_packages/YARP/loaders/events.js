'use strict';
/**
 * Loads the events on client-side.
 */

/**
 * Loads RAGE:MP events.
 * @namespace ragemp.client
 */
require('./YARP/events/ragemp/browser.js');
require('./YARP/events/ragemp/checkpoint.js');
require('./YARP/events/ragemp/colshape.js');
require('./YARP/events/ragemp/player.js');
require('./YARP/events/ragemp/stream.js');
require('./YARP/events/ragemp/render.js');
require('./YARP/events/ragemp/vehicle.js');
require('./YARP/events/ragemp/waypoint.js');

/**
 * Loads YARP events.
 * @namespace yarp.client
 */
require('./YARP/events/yarp/browser.js');
require('./YARP/events/yarp/camera.js');
require('./YARP/events/yarp/character.js');
require('./YARP/events/yarp/command.js');
require('./YARP/events/yarp/gamemode.js');
require('./YARP/events/yarp/menu.js');
require('./YARP/events/yarp/ui.js');
require('./YARP/events/yarp/weapon.js');
