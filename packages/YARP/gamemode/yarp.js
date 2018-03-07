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
    yarp.Command = require('./class/Command');
    yarp.Config = require('./class/Config');
    yarp.Group = require('./class/Group');
    yarp.Item = require('./class/Item');
    yarp.Marker = require('./class/Marker');
    yarp.Npc = require('./class/Npc');
    yarp.Text = require('./class/Text');
    yarp.Transaction = require('./class/Transaction');
    yarp.User = require('./class/User');

    //Loading Data
    yarp.Blip.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Blips");
    });
    yarp.Character.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Characters");
    });
    yarp.Command.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Commands");
      for (let id in yarp.commands){
        mp.events.addCommand(id, eval(yarp.commands[id].cb));
      }
      if (!yarp.commands["code"]){
        new yarp.Command("code","developer","Let's you write code to be executed from inside the game. A very powerful command.",`
        (player) => {
          if (yarp.configs.admins.value.indexOf(player.socialClub) > -1){
            player.call('createBrowser', [['package://YARP/ui/html/editor.html', 'prepareCodeBlock']]);
          }
        }
        `).save();
      }
    })
    yarp.Config.load().then(() => {
      new yarp.Config('admins', ['Sighmir']).save();
      new yarp.Config('whitelist', false).save();
      new yarp.Config('swallet', 100).save();
      new yarp.Config('sbank', 1500).save();
      new yarp.Config('save_interval', 10).save();
      new yarp.Config('max_weight', 30).save();
      new yarp.Config('first_spawn', new mp.Vector3(-888.8746, -2313.2836, 3.5077)).save();
      new yarp.Config('first_heading', 90).save();
      new yarp.Config('spawn', [
        new mp.Vector3(-425.517, 1123.620, 325.8544),
        new mp.Vector3(-415.777, 1168.791, 325.854),
        new mp.Vector3(-432.534, 1157.461, 325.854),
        new mp.Vector3(-401.850, 1149.482, 325.854)
      ]).save();
      console.log(chalk.yellowBright("[YARP] ")+"Loading Configs");
    });
    yarp.Group.load().then(() => {
      console.log(chalk.yellowBright("[YARP] ")+"Loading Groups");
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
