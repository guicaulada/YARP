'use strict';

global.yarp = {};
global.chalk = require('chalk');
module.exports = (async () => {
  console.log(chalk.yellowBright("[YARP] ")+"Loading Requirements");
  yarp.utils = require('./static/Utility');
  yarp.db = require('./static/MongoDB');
  yarp.dbm = require('./static/DBManager');

  await yarp.dbm.connect();
  //Loading Classes
  console.log(chalk.yellowBright("[YARP] ")+"Loading Classes");
  yarp.Blip = require('./class/Blip');
  yarp.Character = require('./class/Character');
  yarp.Checkpoint = require('./class/Checkpoint');
  yarp.Command = require('./class/Command');
  yarp.Event = require('./class/Event');
  yarp.Group = require('./class/Group');
  yarp.Item = require('./class/Item');
  yarp.Label = require('./class/Label');
  yarp.Marker = require('./class/Marker');
  yarp.Npc = require('./class/Npc');
  yarp.Object = require('./class/Object');
  yarp.Transaction = require('./class/Transaction');
  yarp.User = require('./class/User');
  yarp.Variable = require('./class/Variable');
  yarp.Vehicle = require('./class/Vehicle');

  //Loading Configs
  console.log(chalk.yellowBright("[YARP] ")+"Loading Data");
  await yarp.Blip.load();
  await yarp.Character.load();
  await yarp.Checkpoint.load();
  await yarp.Command.load();
  await yarp.Event.load();
  await yarp.Group.load();
  await yarp.Item.load();
  await yarp.Label.load();
  await yarp.Marker.load();
  await yarp.Npc.load();
  await yarp.Object.load();
  await yarp.Transaction.load();
  await yarp.User.load();
  await yarp.Variable.load();
  await yarp.Vehicle.load();

  //Loading Config
  console.log(chalk.yellowBright("[YARP] ")+"Loading Configs");
  require('./config/Blip');
  require('./config/Character');
  require('./config/Checkpoint');
  require('./config/Command');
  require('./config/Event');
  require('./config/Group');
  require('./config/Item');
  require('./config/Label');
  require('./config/Marker');
  require('./config/Npc');
  require('./config/Object');
  require('./config/Transaction');
  require('./config/User');
  require('./config/Variable');
  require('./config/Vehicle');


  //Load RAGE.MP Events
  console.log(chalk.yellowBright("[YARP] ")+"Loading RAGE.MP Events");
  //require('./events/ragemp/checkpoint.js');
  //require('./events/ragemp/colshape.js');
  //require('./events/ragemp/entity.js');
  require('../event/ragemp/player.js');
  //require('./events/ragemp/stream.js');
  //require('./events/ragemp/vehicle.js');
  //require('./events/ragemp/waypoint.js');

  //Load YARP Events
  console.log(chalk.yellowBright("[YARP] ")+"Loading YARP Events");
  //require('./events/yarp/bank.js');
  require('../event/yarp/base.js');
  require('../event/yarp/character.js');
  //require('./events/yarp/inventory.js');
  //require('./events/yarp/item.js');
  require('../event/yarp/menu.js');
  //require('./events/yarp/object.js');

  console.log(chalk.greenBright("[YARP] ")+"Loading Complete");

  mp.players.forEach((player, i) => {
    mp.events.call('playerJoin', player)
  });
});
