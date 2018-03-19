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
    yarp.Colshape = require('./class/Colshape');
    yarp.Command = require('./class/Command');
    yarp.Event = require('./class/Event');
    yarp.Group = require('./class/Group');
    yarp.Item = require('./class/Item');
    yarp.Label = require('./class/Label');
    yarp.Marker = require('./class/Marker');
    yarp.Npc = require('./class/Npc');
    yarp.Pool = require('./class/Pool');
    yarp.Prop = require('./class/Prop');
    yarp.Transaction = require('./class/Transaction');
    yarp.User = require('./class/User');
    yarp.Variable = require('./class/Variable');
    yarp.Vehicle = require('./class/Vehicle');
    yarp.Weapon = require('./class/Weapon');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"ClassError: "+err.message);
  }

  //Loading Pools
  try {
    console.log(chalk.yellowBright("[YARP] ")+"Loading Pools");
    yarp.blips = new yarp.Pool(yarp.Blip);
    yarp.characters = new yarp.Pool(yarp.Character);
    yarp.checkpoints = new yarp.Pool(yarp.Checkpoint);
    yarp.colshapes = new yarp.Pool(yarp.Colshape);
    yarp.commands = new yarp.Pool(yarp.Command);
    yarp.events = new yarp.Pool(yarp.Event);
    yarp.groups = new yarp.Pool(yarp.Group);
    yarp.items = new yarp.Pool(yarp.Item);
    yarp.labels = new yarp.Pool(yarp.Label);
    yarp.markers = new yarp.Pool(yarp.Marker);
    yarp.npcs = new yarp.Pool(yarp.Npc);
    yarp.props = new yarp.Pool(yarp.Prop);
    yarp.transactions = new yarp.Pool(yarp.Transaction);
    yarp.users = new yarp.Pool(yarp.User);
    yarp.variables = new yarp.Pool(yarp.Variable);
    yarp.vehicles = new yarp.Pool(yarp.Vehicle);
    yarp.weapons = new yarp.Pool(yarp.Weapon);
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"PoolError: "+err.message);
  }

  //Loading Data
  console.log(chalk.yellowBright("[YARP] ")+"Loading Data");
  try {
    await yarp.blips.load();
    await yarp.characters.load();
    await yarp.checkpoints.load();
    await yarp.colshapes.load();
    await yarp.commands.load();
    await yarp.events.load();
    await yarp.groups.load();
    await yarp.items.load();
    await yarp.labels.load();
    await yarp.markers.load();
    await yarp.npcs.load();
    await yarp.props.load();
    await yarp.transactions.load();
    await yarp.users.load();
    await yarp.variables.load();
    await yarp.vehicles.load();
    await yarp.weapons.load();
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"DataError: "+err.message);
  }

  //Loading Config
  try {
    console.log(chalk.yellowBright("[YARP] ")+"Loading Configs");
    yarp.Blip.config('../config/Blip');
    //yarp.Character.config('../config/Character');
    yarp.Checkpoint.config('../config/Checkpoint');
    yarp.Colshape.config('../config/Colshape');
    yarp.Command.config('../config/Command');
    yarp.Event.config('../config/Event');
    yarp.Group.config('../config/Group');
    yarp.Item.config('../config/Item');
    yarp.Label.config('../config/Label');
    yarp.Marker.config('../config/Marker');
    //yarp.Npc.config('../config/Npc');
    yarp.Prop.config('../config/Prop');
    //yarp.Transaction.config('../config/Transaction');
    //yarp.User.config('../config/User');
    yarp.Variable.config('../config/Variable');
    yarp.Vehicle.config('../config/Vehicle');
    yarp.Weapon.config('../config/Weapon');
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
    require('../event/yarp/tick.js');
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
