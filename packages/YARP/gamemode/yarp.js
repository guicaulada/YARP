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
    yarp.Door = require('./class/Door');
    yarp.Event = require('./class/Event');
    yarp.Group = require('./class/Group');
    yarp.Hotkey = require('./class/Hotkey');
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
    yarp.doors = new yarp.Pool(yarp.Door);
    yarp.events = new yarp.Pool(yarp.Event);
    yarp.groups = new yarp.Pool(yarp.Group);
    yarp.hotkeys = new yarp.Pool(yarp.Hotkey);
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
    await yarp.doors.load();
    await yarp.events.load();
    await yarp.groups.load();
    await yarp.hotkeys.load();
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
    yarp.blips.config('../config/Blip');
    yarp.characters.config('../config/Character');
    yarp.checkpoints.config('../config/Checkpoint');
    yarp.colshapes.config('../config/Colshape');
    yarp.commands.config('../config/Command');
    yarp.doors.config('../config/Door');
    yarp.events.config('../config/Event');
    yarp.groups.config('../config/Group');
    yarp.hotkeys.config('../config/Hotkey');
    yarp.items.config('../config/Item');
    yarp.labels.config('../config/Label');
    yarp.markers.config('../config/Marker');
    yarp.npcs.config('../config/Npc');
    yarp.props.config('../config/Prop');
    yarp.transactions.config('../config/Transaction');
    yarp.users.config('../config/User');
    yarp.variables.config('../config/Variable');
    yarp.vehicles.config('../config/Vehicle');
    yarp.weapons.config('../config/Weapon');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"ConfigError: "+err.message);
  }

  try {
    //Load RAGE.MP Events
    console.log(chalk.yellowBright("[YARP] ")+"Loading Events");
    require('../event/ragemp/Checkpoint.js');
    require('../event/ragemp/Colshape.js');
    require('../event/ragemp/Entity.js');
    require('../event/ragemp/Player.js');
    require('../event/ragemp/Stream.js');
    require('../event/ragemp/Vehicle.js');
    require('../event/ragemp/Waypoint.js');

    //Load YARP Events
    require('../event/yarp/Bank.js');
    require('../event/yarp/Character.js');
    require('../event/yarp/Gamemode.js');
    require('../event/yarp/Item.js');
    require('../event/yarp/Menu.js');
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
