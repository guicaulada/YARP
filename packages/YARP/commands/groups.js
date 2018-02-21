var db = require('../exports/database.js');
var cfg = require('../exports/config.js');

mp.events.addCommand("newgroup", (player, msg, group, type) => {
  if (group != null){
    if (db.characters.hasPermission(player,"cmd.newgroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryAddGroup(group, type)){
        player.outputChatBox(`Group !{green}${group}!{white} has been created!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Group already exist!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/newgroup <group> [optional: <type>]");
  }
});

mp.events.addCommand("delgroup", (player, msg, group) => {
  if (group != null){
    if (db.characters.hasPermission(player,"cmd.delgroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryRemoveGroup(group)){
        player.outputChatBox(`Group !{green}${group}!{white} has been removed!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Group doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/delgroup <group>");
  }
});

mp.events.addCommand("addperm", (player, msg, group, perm) => {
  if (group != null && perm != null){
    if (db.characters.hasPermission(player,"cmd.addperm") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryAddPermission(group,perm)){
        player.outputChatBox(`Permission !{green}${perm}!{white} has been added to !{green}${group}!{white}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Permission already exist!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/addperm <group> <permission>");
  }
});

mp.events.addCommand("rmperm", (player, msg, group, perm) => {
  if (group != null && perm != null){
    if (db.characters.hasPermission(player,"cmd.rmperm") || cfg.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryRemovePermission(group,perm)){
        player.outputChatBox(`Permission !{green}${perm}!{white} has been removed from !{green}${group}!{white}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Permission doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/rmperm <group> <permission>");
  }
});

mp.events.addCommand("addgroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.characters.hasPermission(player,"cmd.addgroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      var group = args[0];
      var target = args[1];
      if (args.length > 2) {
        target = `${args[1]} ${args[2]}`;
      }
      if (db.characters.tryGiveGroup(target, group)){
        if (target.socialClub != null) {
          target = target.socialClub;
        }
        player.outputChatBox(`Group !{green}${group}!{white} has been added to !{green}${target}!{white}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Player already have that group!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/addgroup <group> <socialClub or character name>");
  }
});

mp.events.addCommand("rmgroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.characters.hasPermission(player,"cmd.rmgroup") || cfg.base.admins.indexOf(player.socialClub) > -1){
      var group = args[0];
      var target = args[1];
      if (args.length > 2) {
        target = `${args[1]} ${args[2]}`;
      }
      if (db.characters.tryTakeGroup(target, group)){
        if (target.socialClub != null) {
          target = target.socialClub;
        }
        player.outputChatBox(`Group !{green}${group}!{white} has been removed from !{green}${target}!{white}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Player doesn't have that group!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: /rmgroup <group> <socialClub or character name>");
  }
});
