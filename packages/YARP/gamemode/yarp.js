'use strict';

global.yarp = {};
global.chalk = require('chalk');
module.exports = (async () => {
  //Loading Requirements
  console.log(chalk.yellowBright("[YARP] ")+"Loading Requirements");
  try {
    yarp.utils = require('./static/Utility');
    yarp.db = require('./static/MongoDB');
    yarp.dbm = require('./static/DBManager');
    await yarp.dbm.connect();
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"RequirementError: "+err.message);
  }

  //Loading Classes
  console.log(chalk.yellowBright("[YARP] ")+"Loading Classes");
  try {
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
    yarp.Prop = require('./class/Prop');
    yarp.Transaction = require('./class/Transaction');
    yarp.User = require('./class/User');
    yarp.Variable = require('./class/Variable');
    yarp.Vehicle = require('./class/Vehicle');
    yarp.Weapon = require('./class/Weapon');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"ClassError: "+err.message);
  }

  //Loading Configs
  console.log(chalk.yellowBright("[YARP] ")+"Loading Data");
  try {
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
    await yarp.Prop.load();
    await yarp.Transaction.load();
    await yarp.User.load();
    await yarp.Variable.load();
    await yarp.Vehicle.load();
    await yarp.Weapon.load();
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"DataError: "+err.message);
  }

  //Loading Config
  try {
    console.log(chalk.yellowBright("[YARP] ")+"Loading Configs");
    yarp.Blip.config('../config/Blip');
    //yarp.Character.config('../config/Character');
    //yarp.Checkpoint.config('../config/Checkpoint');
    yarp.Command.config('../config/Command');
    //yarp.Event.config('../config/Event');
    yarp.Group.config('../config/Group');
    //yarp.Item.config('../config/Item');
    //yarp.Label.config('../config/Label');
    //yarp.Marker.config('../config/Marker');
    //yarp.Npc.config('../config/Npc');
    yarp.Prop.config('../config/Prop');
    //yarp.Transaction.config('../config/Transaction');
    //yarp.User.config('../config/User');
    yarp.Variable.config('../config/Variable');
    yarp.Vehicle.config('../config/Vehicle');
    //yarp.Weapon.config('../config/Weapon');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"ConfigError: "+err.message);
  }


  try {
    //Load RAGE.MP Events
    console.log(chalk.yellowBright("[YARP] ")+"Loading Events");
    //require('./events/ragemp/checkpoint.js');
    //require('./events/ragemp/colshape.js');
    //require('./events/ragemp/entity.js');
    require('../event/ragemp/player.js');
    //require('./events/ragemp/stream.js');
    //require('./events/ragemp/vehicle.js');
    //require('./events/ragemp/waypoint.js');

    //Load YARP Events
    //require('./events/yarp/bank.js');
    require('../event/yarp/base.js');
    require('../event/yarp/character.js');
    //require('./events/yarp/inventory.js');
    //require('./events/yarp/item.js');
    require('../event/yarp/menu.js');
    //require('./events/yarp/prop.js');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"EventError: "+err.message);
  }

  //Loading Complete
  console.log(chalk.greenBright("[YARP] ")+"Loading Complete");

  //Rejoin Players
  mp.players.forEach((player, i) => {
    mp.events.call('playerJoin', player)
  });
});
