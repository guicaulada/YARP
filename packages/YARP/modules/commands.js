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

mp.events.addCommand("weapon", (player, msg, weapon, ammo) => {
  if (db.groups.hasPermission(player,"cmd.weapon")){
    var weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, Number(ammo) || 10000);
  }
});

mp.events.addCommand('inventory', (player) => {
  if (db.groups.hasPermission(player,"cmd.inventory")){
    let inventoryJson = JSON.stringify(db.characters.getInventoryItems(player));
    player.call('showPlayerInventory', [inventoryJson, 0])
  }
});

mp.events.addCommand('veh', (player, model) => {
  if (db.groups.hasPermission(player,"cmd.veh")){
    if (model == null) {
        let veh = mp.vehicles.new(mp.joaat('T20'), player.position);
        player.putIntoVehicle(veh, -1);
    } else {
        let veh = mp.vehicles.new(mp.joaat(model), player.position);
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

mp.events.addCommand("addgroup", (player, msg, group) => {
  if (group != null){
    if (db.groups.hasPermission(player,"cmd.addgroup")){
      if (db.groups.tryAddGroup(group)){
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
    if (db.groups.hasPermission(player,"cmd.addperm")){
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
    if (db.groups.hasPermission(player,"cmd.rmgroup")){
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
    if (db.groups.hasPermission(player,"cmd.rmperm")){
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
    if (db.groups.hasPermission(player,"cmd.takegroup")){
      var target = mp.players.at(Number(args[0]));
      var group = args[1];
      if (target == null) {
        if (args.length > 2) {
          target = `${args[0]} ${args[1]}`;
          group = args[2];
        }
      }
      if (db.groups.tryGiveGroup(target, group)){
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
    if (db.groups.hasPermission(player,"cmd.takegroup")){
      var target = mp.players.at(Number(args[0]));
      var group = args[1];
      if (target == null) {
        if (args.length > 2) {
          target = `${args[0]} ${args[1]}`;
          group = args[2];
        }
      }
      if (db.groups.tryTakeGroup(target, group)){
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

mp.events.addCommand("money", (player) => {
  if (db.groups.hasPermission(player,"cmd.money")){
    var character = db.characters.getCharacterByPlayer(player);
    player.outputChatBox(`Wallet: !{51, 204, 51}${character.wallet}`);
    player.outputChatBox(`Bank: !{0, 153, 255}${character.bank}`);
  }
});

var wp_pos = {};
mp.events.addCommand("tp", (player, msg) => {
  if (db.groups.hasPermission(player,"cmd.tp")){
    if (msg != null){
      var args = msg.split(" ");
      if (args.length >= 3){
        args[0] = Number(args[0]);
        args[1] = Number(args[1]);
        args[2] = Number(args[2]);
        player.position = new mp.Vector3(args[0], args[1], args[2]);
      } else if (args.length == 2){
        args[0] = Number(args[0]);
        args[1] = Number(args[1]);
        if (mp.players.at(args[0]) != null || mp.players.at(args[1]) != null){
          mp.players.at(args[0]).position = mp.players.at(args[1]).position;
        } else {
          player.outputChatBox("!{red}Invalid user id!");
        }
      } else if (args.length == 1){
        args[0] = Number(args[0]);
        if (mp.players.at(args[0]) != null){
          player.position = mp.players.at(args[0]).position;
        } else {
          player.outputChatBox("!{red}Invalid user id!");
        }
      }
    } else if (wp_pos[player] != null){
      player.position = wp_pos[player];
    } else {
      player.outputChatBox("!{red}Usage: /tp [<userid> or <x> <y> <z> or have a waypoint]");
    }
  }
});

mp.events.addCommand("jtp", (player, jsonPos) => {
  if (db.groups.hasPermission(player,"cmd.jtp")){
    if (jsonPos != null){
      player.position = JSON.parse(jsonPos);
    } else {
      player.outputChatBox("!{red}Usage: /jtp <jsonPos>");
    }
  }
});

mp.events.addCommand("jpos", (player, comment) => {
  if (db.groups.hasPermission(player,"cmd.jpos")){
    var fs = require('fs');
    if (comment != null && comment != "" && comment != " "){
      comment = " : " + comment;
    } else {
      comment = "";
    }
    fs.appendFile("jpos.txt", JSON.stringify(player.position) + comment +"\n", function(err) {
      if(err) {
        return console.log('JPOS ERROR:\n'+err);
      }
      player.outputChatBox("!{green}JSON position saved to file!");
    });
  }
});

mp.events.add("playerCreateWaypoint", (player, position) => {
  //I dont think this event is being called... I don't know why.
  wp_pos[player] = position;
});

mp.events.add("playerReachWaypoint", (player) => {
  wp_pos[player] = null;
});
