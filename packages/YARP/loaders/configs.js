'use strict';
/**
 * @file Loads the configs on server-side.
 * @namespace loaders
 */

/**
 * Loads the configs asynchronously.
 * @async
 * @function
 */
module.exports = async () => {
  // Loading configs
  try {
    console.log(chalk.yellowBright('[YARP] ')+'Loading Configs');
    yarp.blips.config('../configs/blips.js');
    yarp.characters.config('../configs/characters.js');
    yarp.checkpoints.config('../configs/checkpoints.js');
    yarp.colshapes.config('../configs/colshapes.js');
    yarp.commands.config('../configs/commands.js');
    yarp.doors.config('../configs/doors.js');
    yarp.events.config('../configs/events.js');
    yarp.groups.config('../configs/groups.js');
    yarp.hotkeys.config('../configs/hotkeys.js');
    yarp.items.config('../configs/items.js');
    yarp.labels.config('../configs/labels.js');
    yarp.locations.config('../configs/locations.js');
    yarp.markers.config('../configs/markers.js');
    yarp.npcs.config('../configs/npcs.js');
    yarp.props.config('../configs/props.js');
    yarp.transactions.config('../configs/transactions.js');
    yarp.users.config('../configs/users.js');
    yarp.variables.config('../configs/variables.js');
    yarp.vehicles.config('../configs/vehicles.js');
    yarp.weapons.config('../configs/weapons.js');
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'ConfigError: '+err.message+'\n'+err.stack);
  }
};
