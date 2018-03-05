'use strict';

global.yarp = {};
module.exports = new Promise((resolve, reject) => {
  //Define Utilities and Database
  yarp.utils = require('./lib/Utility');
  yarp.db = require('./lib/MongoDB');

  yarp.db.getInstance().then(() => {
    //Define Objects
    yarp.Blip = require('./objects/Blip');
    yarp.Character = require('./objects/Character');
    yarp.Config = require('./objects/Config');
    yarp.Group = require('./objects/Group');
    yarp.Item = require('./objects/Item');
    yarp.Marker = require('./objects/Marker');
    yarp.Npc = require('./objects/Npc');
    yarp.Text = require('./objects/Text');
    yarp.Transaction = require('./objects/Transaction');
    yarp.User = require('./objects/User');

    //Define Managers
    yarp.BlipManager = require('./managers/BlipManager');
    yarp.CharacterManager = require('./managers/CharacterManager');
    yarp.ConfigManager = require('./managers/ConfigManager');
    yarp.GroupManager = require('./managers/GroupManager');
    yarp.ItemManager = require('./managers/ItemManager');
    yarp.MarkerManager = require('./managers/MarkerManager');
    yarp.NpcManager = require('./managers/NpcManager');
    yarp.TextManager = require('./managers/TextManager');
    yarp.TransactionManager = require('./managers/TransactionManager');
    yarp.UserManager = require('./managers/UserManager');

    //yarp.cmd = require('./gamemode/managers/CommandManager.js'),

    //Get GameMode Save Data
    yarp.BlipManager.indexById().then(blips => {
      yarp.blips = blips;
    });
    yarp.CharacterManager.indexById().then(characters => {
      yarp.characters = characters;
    });
    yarp.ConfigManager.indexById().then(cfg => {
      yarp.cfg = cfg;
      if (!yarp.cfg.setup){
        yarp.ConfigManager.add(new yarp.Config('admins', ['Sighmir']));
        yarp.ConfigManager.add(new yarp.Config('whitelist', false));
        yarp.ConfigManager.add(new yarp.Config('swallet', 100));
        yarp.ConfigManager.add(new yarp.Config('sbank', 1500));
        yarp.ConfigManager.add(new yarp.Config('save_interval', 10));
        yarp.ConfigManager.add(new yarp.Config('max_weight', 30));
        yarp.ConfigManager.add(new yarp.Config('first_spawn', { "x" : -888.8746, "y" : -2313.2836, "z" : -3.5077, "h" : 90 }));
        yarp.ConfigManager.add(new yarp.Config('spawn', [
          { "x": -425.517, "y": 1123.620, "z": 325.8544 },
          { "x": -415.777, "y": 1168.791, "z": 325.854 },
          { "x": -432.534, "y": 1157.461, "z": 325.854 },
          { "x": -401.850, "y": 1149.482, "z": 325.854 }
        ]));
        yarp.ConfigManager.add(new yarp.Config('setup', true));
      }
    });

    yarp.GroupManager.indexById().then(groups => {
      yarp.groups = groups;
    });
    yarp.ItemManager.indexById().then(items => {
      yarp.items = items;
    });
    yarp.MarkerManager.indexById().then(markers => {
      yarp.markers = markers;
    });
    yarp.NpcManager.indexById().then(npcs => {
      yarp.npcs = npcs;
    });
    yarp.TextManager.indexById().then(texts => {
      yarp.texts = texts;
    });
    yarp.TransactionManager.indexById().then(transactions => {
      yarp.transactions = transactions;
    });
    yarp.UserManager.indexById().then(users => {
      yarp.users = users;
      resolve(true);
    });
  })
});
