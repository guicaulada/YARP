var db = require('./database.js');

mp.events.addCommand('kill', (player) => {
  if (db.GROUPS.hasPermission(player,"cmd.kill")){
    player.health = 0;
  }
});

mp.events.addCommand('hp', (player) => {
  if (db.GROUPS.hasPermission(player,"cmd.hp")){
    player.health = 100;
  }
});

mp.events.addCommand('armor', (player) => {
  if (db.GROUPS.hasPermission(player,"cmd.armor")){
    player.armour = 100;
  }
});

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
  if (db.GROUPS.hasPermission(player,"cmd.weapon")){
    var weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
  }
});

mp.events.addCommand('veh', (player, text) => {
  if (db.GROUPS.hasPermission(player,"cmd.veh")){
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
  if (db.GROUPS.hasPermission(player,"cmd.noclip")){
    player.call('toggleNoclip')
  }
});

mp.events.addCommand('charpos', (player) => {
  if (db.GROUPS.hasPermission(player,"cmd.charpos")){
    player.call('toggleCharpos')
  }
});

mp.events.addCommand('camdir', (player) => {
  if (db.GROUPS.hasPermission(player,"cmd.camdir")){
    player.call('toggleCamdir')
  }
});

mp.events.addCommand("addgroup", (player, fullText, arg1) => {
  if (arg1 != null){
    if (db.GROUPS.hasPermission(player,"cmd.addgroup")){
      if (db.GROUPS.addGroup(arg1)){
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
    if (db.GROUPS.hasPermission(player,"cmd.addperm")){
      if (db.GROUPS.addPermission(arg1,arg2)){
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
    if (db.GROUPS.hasPermission(player,"cmd.rmgroup")){
      if (db.GROUPS.removeGroup(arg1)){
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
    if (db.GROUPS.hasPermission(player,"cmd.rmperm")){
      if (db.GROUPS.removePermission(arg1,arg2)){
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
    if (db.GROUPS.hasPermission(player,"cmd.givegroup")){
      if (db.GROUPS.giveGroup(arg1, arg2)){
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
    if (db.GROUPS.hasPermission(player,"cmd.takegroup")){
      if (db.GROUPS.takeGroup(arg1, arg2)){
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
  var character = db.CHARACTERS.getCharacterByPlayer(player);
  player.outputChatBox(`Wallet: !{51, 204, 51}${character.wallet}`);
  player.outputChatBox(`Bank: !{0, 153, 255}${character.bank}`);
});
