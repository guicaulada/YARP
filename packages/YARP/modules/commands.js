var db = require('../exports/database.js');

mp.events.addCommand('kill', (player) => {
  if (db.groups.hasPermission(player,"cmd.kill")){
    player.health = 0;
  }
});

mp.events.addCommand('hp', (player) => {
  if (db.groups.hasPermission(player,"cmd.hp")){
    player.health = 100;
  }
});

mp.events.addCommand('armor', (player) => {
  if (db.groups.hasPermission(player,"cmd.armor")){
    player.armour = 100;
  }
});

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
  if (db.groups.hasPermission(player,"cmd.weapon")){
    var weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
  }
});

mp.events.addCommand('veh', (player, text) => {
  if (db.groups.hasPermission(player,"cmd.veh")){
    if (text == undefined) {
        let veh = mp.vehicles.new(mp.joaat('T20'), player.position);
        player.putIntoVehicle(veh, -1);
    } else {
        let veh = mp.vehicles.new(mp.joaat(text), player.position);
        player.putIntoVehicle(veh, -1);
    }
  }
});

mp.events.addCommand('noclip', (player) => {
  if (db.groups.hasPermission(player,"cmd.noclip")){
    player.call('toggleNoclip')
  }
});

mp.events.addCommand('charpos', (player) => {
  if (db.groups.hasPermission(player,"cmd.charpos")){
    player.call('toggleCharpos')
  }
});

mp.events.addCommand('camdir', (player) => {
  if (db.groups.hasPermission(player,"cmd.camdir")){
    player.call('toggleCamdir')
  }
});

mp.events.addCommand("addgroup", (player, fullText, arg1) => {
  if (arg1 != null){
    if (db.groups.hasPermission(player,"cmd.addgroup")){
      if (db.groups.addGroup(arg1)){
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
    if (db.groups.hasPermission(player,"cmd.addperm")){
      if (db.groups.addPermission(arg1,arg2)){
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
    if (db.groups.hasPermission(player,"cmd.rmgroup")){
      if (db.groups.removeGroup(arg1)){
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
    if (db.groups.hasPermission(player,"cmd.rmperm")){
      if (db.groups.removePermission(arg1,arg2)){
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
    if (db.groups.hasPermission(player,"cmd.givegroup")){
      if (db.groups.giveGroup(arg1, arg2)){
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
    if (db.groups.hasPermission(player,"cmd.takegroup")){
      if (db.groups.takeGroup(arg1, arg2)){
        player.outputChatBox(`!{green}Group !{yellow}${arg2}!{green} has been removed from !{yellow}${arg1}!{green}!`);
      } else {
        player.outputChatBox("!{red}Player doesn't exist!");
      }
    }
  } else {
    player.outputChatBox("!{red}Usage: /takegroup <userid> <group>");
  }
});

mp.events.addCommand("money", (player) => {
  if (db.groups.hasPermission(player,"cmd.money")){
    var character = db.characters.getCharacterByPlayer(player);
    player.outputChatBox(`Wallet: !{51, 204, 51}${character.wallet}`);
    player.outputChatBox(`Bank: !{0, 153, 255}${character.bank}`);
  }
});

var wp_pos = {};
mp.events.addCommand("tp", (player, fullText, arg1, arg2, arg3) => {
  if (db.groups.hasPermission(player,"cmd.tp")){
    if (arg3 != null){
      player.spawn(new mp.Vector3(arg1, arg2, arg3));
    } else if (arg2 == null && arg1 != null){
      if (mp.players.at(arg1) != null){
        player.spawn(mp.players.at(arg1).position);
      } else {
        player.outputChatBox("!{red}Invalid user id!");
      }
    } else if (arg1 == null && wp_pos[player] != null){
      player.spawn(wp_pos[player]);
    } else {
      player.outputChatBox("!{red}Usage: /tp [<userid> or <x> <y> <z> or have a waypoint]");
    }
  }
});

mp.events.addCommand("jtp", (player, fullText) => {
  if (db.groups.hasPermission(player,"cmd.jtp")){
    if (fullText != null){
      console.log(JSON.parse(fullText));
      player.spawn(JSON.parse(fullText));
    } else {
      player.outputChatBox("!{red}Usage: /jtp <jsonPos>");
    }
  }
});

mp.events.addCommand("jpos", (player, fullText) => {
  if (db.groups.hasPermission(player,"cmd.jpos")){
    var fs = require('fs');
    if (fullText != null && fullText != "" && fullText != " "){
      fullText = " : " + fullText;
    } else {
      fullText = "";
    }
    fs.appendFile("jpos.txt", JSON.stringify(player.position) + fullText +"\n", function(err) {
      if(err) {
        return console.log(err);
      }
      player.outputChatBox("!{green}JSON position saved to file!");
    });
  }
});

mp.events.add("playerCreateWaypoint", (player, position) => {
 wp_pos[player] = position;
});

mp.events.add("playerReachWaypoint", (player) => {
 wp_pos[player] = null;
});
