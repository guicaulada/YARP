var db = require('../exports/database.js');
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

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
      let menu = {}
      menu.title = "Vehicles";
      menu.options = {};
      for (vehicle in cfg.vehicles){
        menu.options[vehicle] = {};
        menu.options[vehicle].type = "default";
        menu.options[vehicle].event = ['spawnVehicle'];
      }
      player.call('GUI:Create',[JSON.stringify(menu)]);
    } else {
      mp.events.call('spawnVehicle',player,model);
    }
  }
});

mp.events.add('spawnVehicle', (player,model) => {
  model = mp.vehicles.new(mp.joaat(model), player.position);
  player.putIntoVehicle(model, -1);
})

mp.events.addCommand('obj', (player) => {
  if (db.users.hasPermission(player,"cmd.obj")){
    mp.events.call('showObjectsMenu', player);
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

mp.events.addCommand('testmenu', (player) => {
  if (db.users.hasPermission(player,"cmd.testmenu")){
    let menu = {}
    menu.title = "Test Menu";
    menu.options = {};
    menu.options["test"] = {};
    menu.options["test"].type = "default";
    menu.options["test"].event = ['notifyMenuResult'];
    menu.options["bool"] = {};
    menu.options["bool"].type = "bool";
    menu.options["bool"].event = ['notifyMenuResult'];
    menu.options["int"] = {};
    menu.options["int"].type = "int";
    menu.options["int"].min = 1;
    menu.options["int"].max = 55;
    menu.options["int"].event = ['notifyMenuResult'];
    menu.options["array"] = {};
    menu.options["array"].type = "array";
    menu.options["array"].event = ['notifyMenuResult'];
    menu.options["array"].array = ["TEST1","TEST2","TEST3","TEST4"];
    player.call('GUI:Create',[JSON.stringify(menu)]);
  }
});

mp.events.add('notifyMenuResult', (player,result,args) => {
  player.notify(`${result}`);
})

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
        args[0] = utils.getPlayerUserCharacter(args[0]);
        args[1] = utils.getPlayerUserCharacter(args[1]);
        if (args[0] != null || args[1] != null){
          args[0].player.position = args[1].player.position;
        } else {
          player.outputChatBox("!{red}ERROR: !{white}Invalid user id!");
        }
      } else if (args.length == 1){
        args[0] = utils.getPlayerUserCharacter(args[0]);
        if (mp.players.at(args[0]) != null){
          player.position = args[0].player.position;
        } else {
          player.outputChatBox("!{red}ERROR: !{white}Invalid user id!");
        }
      }
    } else if (wp_pos[player] != null){
      player.position = wp_pos[player];
    } else {
      player.outputChatBox("!{yellow}USAGE: !{white}/tp [<socialClub>][<socialClub> <socialClub>][<x> <y> <z>][waypoint active]");
    }
  }
});

mp.events.addCommand("jtp", (player, jsonPos) => {
  if (db.users.hasPermission(player,"cmd.jtp")){
    if (jsonPos != null){
      player.position = JSON.parse(jsonPos);
    } else {
      player.outputChatBox("!{yellow}USAGE: !{white}/jtp <jsonPos>");
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
    fs.appendFile("jpos.txt", JSON.stringify(player.position) + comment +"\n");
    player.outputChatBox("!{cyan}COMMAND: !{white}JSON position saved to file!");
  }
});

mp.events.add("playerCreateWaypoint", (player, position) => {
  wp_pos[player] = position;
});

mp.events.add("playerReachWaypoint", (player) => {
  wp_pos[player] = null;
});
