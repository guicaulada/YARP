'use strict';
/**
 * Loads the classes on server-side.
 */

module.exports = async () => {
  // Loading classes
  console.log(chalk.yellowBright('[YARP] ')+'Loading Objects');
  try {
    yarp.Blip = require('../classes/Blip.js');
    yarp.Character = require('../classes/Character.js');
    yarp.Checkpoint = require('../classes/Checkpoint.js');
    yarp.Colshape = require('../classes/Colshape.js');
    yarp.Command = require('../classes/Command.js');
    yarp.Door = require('../classes/Door.js');
    yarp.Event = require('../classes/Event.js');
    yarp.Group = require('../classes/Group.js');
    yarp.Hotkey = require('../classes/Hotkey.js');
    yarp.Item = require('../classes/Item.js');
    yarp.Label = require('../classes/Label.js');
    yarp.Location = require('../classes/Location.js');
    yarp.Marker = require('../classes/Marker.js');
    yarp.Menu = require('../classes/Menu.js');
    yarp.Npc = require('../classes/Npc.js');
    yarp.Prop = require('../classes/Prop.js');
    yarp.Transaction = require('../classes/Transaction.js');
    yarp.User = require('../classes/User.js');
    yarp.Vehicle = require('../classes/Vehicle.js');
    yarp.Weapon = require('../classes/Weapon.js');
  } catch (err) {
    console.log(chalk.redBright('[YARP] ')+'ClassError: '+err.message+'\n'+err.stack);
  }
};
