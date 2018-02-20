var db = require('../exports/database.js');
var cfg = require('../exports/config.js');

mp.events.addCommand("addgroup", (player, msg, group, type) => {
  if (group != null){
    if (db.characters.hasPermission(player,"cmd.addgroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryAddGroup(group, type)){
        player.outputChatBox(`!{green}Group !{yellow}${group}!{green} has been created!`);
      } else {
        player.outputChatBox("!{red}Group already exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /addgroup <group>");
  }
});

mp.events.addCommand("addperm", (player, msg, group, perm) => {
  if (group != null && perm != null){
    if (db.characters.hasPermission(player,"cmd.addperm") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryAddPermission(group,perm)){
        player.outputChatBox(`!{green}Permission !{yellow}${perm}!{green} has been added to !{yellow}${group}!{green}!`);
      } else {
        player.outputChatBox("!{red}Permission already exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /addperm <group> <permission>");
  }
});

mp.events.addCommand("rmgroup", (player, msg, group) => {
  if (group != null){
    if (db.characters.hasPermission(player,"cmd.rmgroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryRemoveGroup(group)){
        player.outputChatBox(`!{green}Group !{yellow}${group}!{green} has been removed!`);
      } else {
        player.outputChatBox("!{red}Group doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /rmgroup <group>");
  }
});

mp.events.addCommand("rmperm", (player, msg, group, perm) => {
  if (group != null && perm != null){
    if (db.characters.hasPermission(player,"cmd.rmperm") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryRemovePermission(group,perm)){
        player.outputChatBox(`!{green}Permission !{yellow}${perm}!{green} has been removed from !{yellow}${group}!{green}!`);
      } else {
        player.outputChatBox("!{red}Permission doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /rmperm <group> <permission>");
  }
});

mp.events.addCommand("givegroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.characters.hasPermission(player,"cmd.givegroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      var group = args[1];
      var target = args[0];
      if (args.length > 2) {
        target = `${args[0]} ${args[1]}`;
        group = args[2];
      }
      if (db.characters.tryGiveGroup(target, group)){
        if (target.socialClub != null) {
          target = target.socialClub;
        }
        player.outputChatBox(`!{green}Group !{yellow}${group}!{green} has been added to !{yellow}${target}!{green}!`);
      } else {
        player.outputChatBox("!{red}Player already have that group!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /givegroup <userid> <group>");
  }
});

mp.events.addCommand("takegroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.characters.hasPermission(player,"cmd.takegroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      var group = args[1];
      var target = args[0];
      if (args.length > 2) {
        target = `${args[0]} ${args[1]}`;
        group = args[2];
      }
      if (db.characters.tryTakeGroup(target, group)){
        if (target.socialClub != null) {
          target = target.socialClub;
        }
        player.outputChatBox(`!{green}Group !{yellow}${group}!{green} has been removed from !{yellow}${target}!{green}!`);
      } else {
        player.outputChatBox("!{red}Player doesn't have that group!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /takegroup <userid> <group>");
  }
});
