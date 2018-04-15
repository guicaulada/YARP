'use strict';
/**
 * Loads the data on server-side asynchronously.
 */

module.exports = async () => {
  // Loading data
  console.log(chalk.yellowBright('[YARP] ')+'Loading Data');
  try {
    await yarp.blips.load();
    await yarp.characters.load();
    await yarp.checkpoints.load();
    await yarp.colshapes.load();
    await yarp.commands.load();
    await yarp.doors.load();
    await yarp.events.load();
    await yarp.groups.load();
    await yarp.hotkeys.load();
    await yarp.items.load();
    await yarp.labels.load();
    await yarp.locations.load();
    await yarp.markers.load();
    await yarp.npcs.load();
    await yarp.props.load();
    await yarp.transactions.load();
    await yarp.users.load();
    await yarp.variables.load();
    await yarp.vehicles.load();
    await yarp.weapons.load();
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'DataError: '+err.message+'\n'+err.stack);
  }
};
