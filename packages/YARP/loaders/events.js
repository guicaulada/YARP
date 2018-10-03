'use strict';
/**
 * Loads the events on server-side.
 */

module.exports = async () => {
  // Loading events
  yarp.log.warning('Loading Events');
  try {
    /**
     * Loads RAGE:MP events.
     * @namespace ragemp.server
     */
    require('../events/ragemp/checkpoint.js');
    require('../events/ragemp/colshape.js');
    require('../events/ragemp/entity.js');
    require('../events/ragemp/player.js');
    require('../events/ragemp/stream.js');
    require('../events/ragemp/vehicle.js');
    require('../events/ragemp/waypoint.js');
    require('../events/ragemp/world.js');

    /**
     * Loads YARP events.
     * @namespace yarp.server
     */
    require('../events/yarp/gamemode.js');
    require('../events/yarp/item.js');
    require('../events/yarp/menu.js');
    require('../events/yarp/ui.js');
  } catch (err) {
    yarp.log.danger('EventError: '+err.message+'\n'+err.stack);
  }
};
