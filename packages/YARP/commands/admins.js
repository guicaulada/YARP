var db = require('../exports/database.js');

mp.events.addCommand('kill', (player) => {
  if (db.users.hasPermission(player,"cmd.kill")){
    player.health = 0;
  }
});

mp.events.addCommand('hp', (player) => {
  if (db.users.hasPermission(player,"cmd.hp")){
    player.health = 100;
  }
});

mp.events.addCommand('armor', (player) => {
  if (db.users.hasPermission(player,"cmd.armor")){
    player.armour = 100;
  }
});

mp.events.addCommand("weapon", (player, msg, weapon, ammo) => {
  if (db.users.hasPermission(player,"cmd.weapon")){
    var weaponHash = mp.joaat(weapon);
    db.characters.giveWeapon(player, weaponHash, Number(ammo) || 10000);
    player.giveWeapon(weaponHash, Number(ammo) || 10000);
  }
});

mp.events.addCommand('veh', (player, model) => {
  if (db.users.hasPermission(player,"cmd.veh")){
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
  if (db.users.hasPermission(player,"cmd.noclip")){
    player.call('toggleNoclip')
  }
});

mp.events.addCommand('charpos', (player) => {
  if (db.users.hasPermission(player,"cmd.charpos")){
    player.call('toggleCharpos')
  }
});

mp.events.addCommand('camdir', (player) => {
  if (db.users.hasPermission(player,"cmd.camdir")){
    player.call('toggleCamdir')
  }
});

var wp_pos = {};
mp.events.addCommand("tp", (player, msg) => {
  if (db.users.hasPermission(player,"cmd.tp")){
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
  if (db.users.hasPermission(player,"cmd.jtp")){
    if (jsonPos != null){
      player.position = JSON.parse(jsonPos);
    } else {
      player.outputChatBox("!{red}Usage: /jtp <jsonPos>");
    }
  }
});

mp.events.addCommand("jpos", (player, comment) => {
  if (db.users.hasPermission(player,"cmd.jpos")){
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
