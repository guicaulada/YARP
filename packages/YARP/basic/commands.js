var db = require('./database.js');
mp.events.addCommand('kill', (player) => {
  if (db.hasPermission(player,"kill_cmd")){
    player.health = 0;
  }
});

mp.events.addCommand('hp', (player) => {
  if (db.hasPermission(player,"hp_cmd")){
    player.health = 100;
  }
});

mp.events.addCommand('armor', (player) => {
  if (db.hasPermission(player,"armor_cmd")){
    player.armour = 100;
  }
});

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
  if (db.hasPermission(player,"weapon_cmd")){
    var weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
  }
});

mp.events.addCommand("addgroup", (player, fullText, arg1) => {
  if (arg1 != null){
    if (db.hasPermission(player,"addgroup_cmd")){
      if (db.addGroup(arg1)){
        player.outputChatBox(`!{green}Group !{yellow}${arg1}!{green} has been created!`);
      } else {
        player.outputChatBox("!{red}Group already exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /addgroup <group>");
  }
});

mp.events.addCommand("addperm", (player, fullText, arg1, arg2) => {
  if (arg1 != null && arg2 != null){
    if (db.hasPermission(player,"addperm_cmd")){
      if (db.addPermission(arg1,arg2)){
        player.outputChatBox(`!{green}Permission !{yellow}${arg2}!{green} has been added to !{yellow}${arg1}!{green}!`);
      } else {
        player.outputChatBox("!{red}Permission already exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /addperm <group> <permission>");
  }
});

mp.events.addCommand("rmgroup", (player, fullText, arg1) => {
  if (arg1 != null){
    if (db.hasPermission(player,"rmgroup_cmd")){
      if (db.removeGroup(arg1)){
        player.outputChatBox(`!{green}Group !{yellow}${arg1}!{green} has been removed!`);
      } else {
        player.outputChatBox("!{red}Group doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /rmgroup <group>");
  }
});

mp.events.addCommand("rmperm", (player, fullText, arg1, arg2) => {
  if (arg1 != null && arg2 != null){
    if (db.hasPermission(player,"rmperm_cmd")){
      if (db.removePermission(arg1,arg2)){
        player.outputChatBox(`!{green}Permission !{yellow}${arg2}!{green} has been removed from !{yellow}${arg1}!{green}!`);
      } else {
        player.outputChatBox("!{red}Permission doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /rmperm <group> <permission>");
  }
});

mp.events.addCommand("givegroup", (player, fullText, arg1, arg2) => {
  if (arg1 != null){
    if (db.hasPermission(player,"givegroup_cmd")){
      if (db.giveGroup(arg1, arg2)){
        player.outputChatBox(`!{green}Group !{yellow}${arg2}!{green} has been added to !{yellow}${arg1}!{green}!`);
      } else {
        player.outputChatBox("!{red}Player doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /givegroup <userid> <group>");
  }
});

mp.events.addCommand("takegroup", (player, fullText, arg1, arg2) => {
  if (arg1 != null){
    if (db.hasPermission(player,"takegroup_cmd")){
      if (db.takeGroup(arg1, arg2)){
        player.outputChatBox(`!{green}Group !{yellow}${arg2}!{green} has been removed from !{yellow}${arg1}!{green}!`);
      } else {
        player.outputChatBox("!{red}Player doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /takegroup <userid> <group>");
  }
});
