'use strict';
/**
 * @file Group config
 */
module.exports = {
  "Super Admin": {
    permissions: [
      "cmd.code",
      "cmd.givegroup",
      "cmd.givegroup"
    ],
    enter: (player) => {player.notify("You are superadmin.");},
    //leave: (player) => {console.log("A superadmin left.");}
  },
  "Admin": {
    permissions: [
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
    ]
  },
  "User": {
    permissions: [
      "cmd.inventory",
      "cmd.money",
      "cmd.hint"
    ]
  }
}
