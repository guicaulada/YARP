'use strict';
/**
 * @file Group config
 */
yarp.Group.load().then(() => {
  console.log(chalk.yellowBright("[YARP] ")+"Loading Groups");
  new yarp.Group('superadmin',false,[
    "cmd.code",
    "cmd.givegroup",
    "cmd.givegroup"
  ], (player) => {player.notify("You are superadmin.");}, false).save();
  new yarp.Group('admin',false,[
    "cmd.kill",
    "cmd.hp",
    "cmd.armour",
    "cmd.weapon",
    "cmd.veh",
    "cmd.charpos",
    "cmd.camdir",
    "cmd.noclip",
    "cmd.tp",
    "cmd.jtp",
    "cmd.jpos"
  ], false, false).save();
  new yarp.Group('user',false,[
    "cmd.inventory",
    "cmd.money",
    "cmd.hint"
  ], false, false).save();
});
