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
    yarp.gmo = require('./abstract/GMObject');
    await yarp.dbm.connect();
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"RequirementError: "+err.message+"\n"+err.stack);
  }

  //Loading Classes
  console.log(chalk.yellowBright("[YARP] ")+"Loading Objects");
  try {
    yarp.Blip = require('./object/Blip');
    yarp.Character = require('./object/Character');
    yarp.Checkpoint = require('./object/Checkpoint');
    yarp.Colshape = require('./object/Colshape');
    yarp.Command = require('./object/Command');
    yarp.Door = require('./object/Door');
    yarp.Event = require('./object/Event');
    yarp.Group = require('./object/Group');
    yarp.Hotkey = require('./object/Hotkey');
    yarp.Item = require('./object/Item');
    yarp.Label = require('./object/Label');
    yarp.Marker = require('./object/Marker');
    yarp.Npc = require('./object/Npc');
    yarp.Pool = require('./object/Pool');
    yarp.Prop = require('./object/Prop');
    yarp.Store = require('./object/Store');
    yarp.Transaction = require('./object/Transaction');
    yarp.User = require('./object/User');
    yarp.Variable = require('./object/Variable');
    yarp.Vehicle = require('./object/Vehicle');
    yarp.Weapon = require('./object/Weapon');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"ClassError: "+err.message+"\n"+err.stack);
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
    yarp.stores = new yarp.Pool(yarp.Store);
    yarp.transactions = new yarp.Pool(yarp.Transaction);
    yarp.users = new yarp.Pool(yarp.User);
    yarp.variables = new yarp.Pool(yarp.Variable);
    yarp.vehicles = new yarp.Pool(yarp.Vehicle);
    yarp.weapons = new yarp.Pool(yarp.Weapon);
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"PoolError: "+err.message+"\n"+err.stack);
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
    await yarp.stores.load();
    await yarp.transactions.load();
    await yarp.users.load();
    await yarp.variables.load();
    await yarp.vehicles.load();
    await yarp.weapons.load();
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"DataError: "+err.message+"\n"+err.stack);
  }

  //Loading Config
  try {
    console.log(chalk.yellowBright("[YARP] ")+"Loading Configs");
    yarp.blips.config('../config/blips');
    yarp.characters.config('../config/characters');
    yarp.checkpoints.config('../config/checkpoints');
    yarp.colshapes.config('../config/colshapes');
    yarp.commands.config('../config/commands');
    yarp.doors.config('../config/doors');
    yarp.events.config('../config/events');
    yarp.groups.config('../config/groups');
    yarp.hotkeys.config('../config/hotkeys');
    yarp.items.config('../config/items');
    yarp.labels.config('../config/labels');
    yarp.markers.config('../config/markers');
    yarp.npcs.config('../config/npcs');
    yarp.props.config('../config/props');
    yarp.stores.config('../config/stores');
    yarp.transactions.config('../config/transactions');
    yarp.users.config('../config/users');
    yarp.variables.config('../config/variables');
    yarp.vehicles.config('../config/vehicles');
    yarp.weapons.config('../config/weapons');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"ConfigError: "+err.message+"\n"+err.stack);
  }

  try {
    //Load RAGE.MP Events
    console.log(chalk.yellowBright("[YARP] ")+"Loading Events");
    require('../events/ragemp/checkpoint.js');
    require('../events/ragemp/colshape.js');
    require('../events/ragemp/entity.js');
    require('../events/ragemp/player.js');
    require('../events/ragemp/stream.js');
    require('../events/ragemp/vehicle.js');
    require('../events/ragemp/waypoint.js');
    require('../events/ragemp/world.js');

    //Load YARP Events
    require('../events/yarp/character.js');
    require('../events/yarp/gamemode.js');
    require('../events/yarp/item.js');
    require('../events/yarp/menu.js');
  } catch(err) {
    console.log(chalk.redBright("[YARP] ")+"EventError: "+err.message+"\n"+err.stack);
  }

  //Loading Complete
  console.log(chalk.greenBright("[YARP] ")+"Loading Complete");

  //Rejoin Players
  mp.players.forEach((player, i) => {
    mp.events.call('playerJoin', player)
  });
});
