var db = require('../exports/database.js');
var cfg = require('../exports/config.js');

mp.events.addCommand("addgroup", (player, msg, group, type) => {
  if (group != null){
    if (db.users.hasPermission(player,"cmd.addgroup") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryAddGroup(group, type)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Group ${group} has been created!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Group already exist!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/addgroup <group> [optional: <type>]");
  }
});

mp.events.addCommand("rmgroup", (player, msg, group) => {
  if (group != null){
    if (db.users.hasPermission(player,"cmd.rmgroup") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryRemoveGroup(group)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Group ${group} has been removed!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Group doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/rmgroup <group>");
  }
});

mp.events.addCommand("addperm", (player, msg, group, perm) => {
  if (group != null && perm != null){
    if (db.users.hasPermission(player,"cmd.addperm") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryAddPermission(group,perm)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Permission ${perm} added to ${group}!`);
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
    if (db.users.hasPermission(player,"cmd.rmperm") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      if (db.groups.tryRemovePermission(group,perm)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Permission ${perm} removed from ${group}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Permission doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/rmperm <group> <permission>");
  }
});

mp.events.addCommand("givecgroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.users.hasPermission(player,"cmd.givecgroup") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      var group = args[0];
      var target = `${args[1]} ${args[2]}`;
      if (db.characters.tryGiveGroupByName(target, group)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Group ${group} added to ${target}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Character doesn't have that group!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/givecgroup <group> <Character Name>");
  }
});

mp.events.addCommand("takecgroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.users.hasPermission(player,"cmd.takecgroup") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      var group = args[0];
      var target = `${args[1]} ${args[2]}`;
      if (db.characters.tryTakeGroupByName(target, group)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Group ${group} removed from ${target}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}Character doesn't have that group!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/takecgroup <group> <Character Name>");
  }
});

mp.events.addCommand("giveugroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.users.hasPermission(player,"cmd.giveugroup") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      var group = args[0];
      var target = args[1];
      if (db.users.tryGiveGroupBySocialClub(target, group)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Group ${group} added to ${target}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}User doesn't have that group!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/giveugroup <group> <SocialClub>");
  }
});

mp.events.addCommand("takeugroup", (player, msg) => {
  if (msg != null){
    var args = msg.split(" ");
    if (db.users.hasPermission(player,"cmd.takeugroup") || yarp.configs.base.admins.indexOf(player.socialClub) > -1){
      var group = args[0];
      var target = args[1];
      if (db.users.tryTakeGroupBySocialClub(target, group)){
        player.outputChatBox(`!{cyan}COMMAND: !{white}Group ${group} removed from ${target}!`);
      } else {
        player.outputChatBox("!{red}ERROR: !{white}User doesn't have that group!");
      }
    }
  } else {
    player.outputChatBox("!{yellow}USAGE: !{white}/takeugroup <group> <SocialClub>");
  }
});
