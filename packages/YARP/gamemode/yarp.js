'use strict';

global.yarp = {};
global.chalk = require('chalk');
module.exports = new Promise((resolve, reject) => {
  //Define Utilities and Database
  yarp.utils = require('./static/Utility');
  yarp.db = require('./static/MongoDB');
  yarp.mng = require('./static/Manager');

  yarp.db.getInstance().then(() => {

    //Loading Manager
    console.log(chalk.yellowBright("[YARP] ")+"Loading Manager");

    //Loading Classes
    console.log(chalk.yellowBright("[YARP] ")+"Loading Classes");
    yarp.Blip = require('./class/Blip');
    yarp.Character = require('./class/Character');
    yarp.Command = require('./class/Command');
    yarp.Group = require('./class/Group');
    yarp.Item = require('./class/Item');
    yarp.Marker = require('./class/Marker');
    yarp.Npc = require('./class/Npc');
    yarp.Text = require('./class/Text');
    yarp.Transaction = require('./class/Transaction');
    yarp.User = require('./class/User');
    yarp.Variable = require('./class/Variable');

    //Loading Configs
    require('./config/Variable.js')
    require('./config/Command.js')
    require('./config/Group.js')

    //Loading Data
    yarp.Blip.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Blips");
    });
    yarp.Character.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Characters");
    });
    yarp.Item.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Items");
    });
    yarp.Marker.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Markers");
    });
    yarp.Npc.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Npcs");
    });
    yarp.Text.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Texts");
    });
    yarp.Transaction.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Transactions");
    });
    yarp.User.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Users");
      resolve()
    });
  })
});
