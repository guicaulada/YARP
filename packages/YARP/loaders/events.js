'use strict';
/**
 * Loads the events on server-side asynchronously.
 */

module.exports = async () => {
  // Loading events
  try {
    // Load RAGE.MP events
    console.log(chalk.yellowBright('[YARP] ')+'Loading Events');
    require('../events/ragemp/checkpoint.js');
    require('../events/ragemp/colshape.js');
    require('../events/ragemp/entity.js');
    require('../events/ragemp/player.js');
    require('../events/ragemp/stream.js');
    require('../events/ragemp/vehicle.js');
    require('../events/ragemp/waypoint.js');
    require('../events/ragemp/world.js');

    // Load YARP events
    require('../events/yarp/character.js');
    require('../events/yarp/gamemode.js');
    require('../events/yarp/item.js');
    require('../events/yarp/menu.js');
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'EventError: '+err.message+'\n'+err.stack);
  }
};
