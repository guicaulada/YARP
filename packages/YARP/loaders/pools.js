'use strict';
/**
 * Loads the pools on server-side asynchronously.
 */

module.exports = async () => {
  // Loading pools
  console.log(chalk.yellowBright('[YARP] ')+'Loading Pools');
  try {
    yarp.blips = new yarp.Pool(yarp.Blip);
    yarp.characters = new yarp.Pool(yarp.Character);
    yarp.checkpoints = new yarp.Pool(yarp.Checkpoint);
    yarp.colshapes = new yarp.Pool(yarp.Colshape);
    yarp.commands = new yarp.Pool(yarp.Command);
    yarp.doors = new yarp.Pool(yarp.Door);
    yarp.events = new yarp.Pool(yarp.Event);
    yarp.groups = new yarp.Pool(yarp.Group);
    yarp.hotkeys = new yarp.Pool(yarp.Hotkey);
    yarp.items = new yarp.Pool(yarp.Item);
    yarp.labels = new yarp.Pool(yarp.Label);
    yarp.locations = new yarp.Pool(yarp.Location);
    yarp.markers = new yarp.Pool(yarp.Marker);
    yarp.npcs = new yarp.Pool(yarp.Npc);
    yarp.props = new yarp.Pool(yarp.Prop);
    yarp.transactions = new yarp.Pool(yarp.Transaction);
    yarp.users = new yarp.Pool(yarp.User);
    yarp.vehicles = new yarp.Pool(yarp.Vehicle);
    yarp.weapons = new yarp.Pool(yarp.Weapon);
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'PoolError: '+err.message+'\n'+err.stack);
  }
};
