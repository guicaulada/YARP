'use strict';

global.yarp = {};
global.chalk = require('chalk');
module.exports = new Promise((resolve, reject) => {
  //Define Utilities and Database
  yarp.utils = require('./static/Utility');
  yarp.db = require('./static/MongoDB');

  yarp.db.getInstance().then(() => {

    //Loading Manager
    console.log(chalk.yellowBright("[YARP] ")+"Loading Manager");
    yarp.Manager = require('./static/Manager');

    //Loading Classes
    console.log(chalk.yellowBright("[YARP] ")+"Loading Classes");
    yarp.Blip = require('./class/Blip');
    yarp.Character = require('./class/Character');
    yarp.Config = require('./class/Config');
    yarp.Group = require('./class/Group');
    yarp.Item = require('./class/Item');
    yarp.Marker = require('./class/Marker');
    yarp.Npc = require('./class/Npc');
    yarp.Text = require('./class/Text');
    yarp.Transaction = require('./class/Transaction');
    yarp.User = require('./class/User');

    //Loading Data
    yarp.Manager.indexById(yarp.Blip).then(blips => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Blips");
      yarp.blips = blips;
    });
    yarp.Manager.indexById(yarp.Character).then(characters => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Characters");
      yarp.characters = characters;
    });
    yarp.Manager.indexById(yarp.Config).then(cfg => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Configs");
      yarp.configs = cfg;
      if (!yarp.configs.setup){
        yarp.Manager.save(new yarp.Config('admins', ['Sighmir']));
        yarp.Manager.save(new yarp.Config('whitelist', false));
        yarp.Manager.save(new yarp.Config('swallet', 100));
        yarp.Manager.save(new yarp.Config('sbank', 1500));
        yarp.Manager.save(new yarp.Config('save_interval', 10));
        yarp.Manager.save(new yarp.Config('max_weight', 30));
        yarp.Manager.save(new yarp.Config('first_spawn', { "x" : -888.8746, "y" : -2313.2836, "z" : -3.5077, "h" : 90 }));
        yarp.Manager.save(new yarp.Config('spawn', [
          { "x": -425.517, "y": 1123.620, "z": 325.8544 },
          { "x": -415.777, "y": 1168.791, "z": 325.854 },
          { "x": -432.534, "y": 1157.461, "z": 325.854 },
          { "x": -401.850, "y": 1149.482, "z": 325.854 }
        ]));
        yarp.Manager.save(new yarp.Config('setup', true));
      }
    });

    yarp.Manager.indexById(yarp.Group).then(groups => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Groups");
      yarp.groups = groups;
    });
    yarp.Manager.indexById(yarp.Item).then(items => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Items");
      yarp.items = items;
    });
    yarp.Manager.indexById(yarp.Marker).then(markers => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Markers");
      yarp.markers = markers;
    });
    yarp.Manager.indexById(yarp.Npc).then(npcs => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Npcs");
      yarp.npcs = npcs;
    });
    yarp.Manager.indexById(yarp.Text).then(texts => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Texts");
      yarp.texts = texts;
    });
    yarp.Manager.indexById(yarp.Transaction).then(transactions => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Transactions");
      yarp.transactions = transactions;
    });
    yarp.Manager.indexById(yarp.User).then(users => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Users");
      yarp.users = users;
      resolve();
    });
  })
});
