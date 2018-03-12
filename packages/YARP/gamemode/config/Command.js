'use strict';
/**
 * @file Command config
 */
yarp.Command.load().then(() => {
  console.log(chalk.yellowBright("[YARP] ")+"Loading Commands");
  new yarp.Command("code","superadmin","Write code to be executed from inside the game. A very powerful command.", (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.code") || yarp.users[player.socialClub].isDev()){
      player.call('createBrowser', [['package://YARP/ui/html/editor.html', 'setupCodeEditor']]);
    }
  }).save();

  new yarp.Command("new","superadmin","Create any gamemode object from inside the game. A very powerful command.", (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.new") || yarp.users[player.socialClub].isDev()){
      let Class = args[0];
      if (Class) {
        player.call('createBrowser', [['package://YARP/ui/html/editor.html', 'setupCodeEditor',`new yarp.${Class}(${yarp.utils.getParamNames(yarp[Class]).join(", ")}).save();`]]);
      }
    }
  }).save();

  new yarp.Command("rem","superadmin","Remove any gamemode object from inside the game. A very powerful command.", (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.rem") || yarp.users[player.socialClub].isDev()){
      let Class = args[0];
      let _id = args[1];
      if (args[2]){
        _id = _id+" "+args[2];
      }
      if (yarp[Class]) {
        let obj = yarp[Class.toLowerCase()+"s"][_id];
        if (obj) {
          obj.remove();
        }
      }
    }
  }).save();

  new yarp.Command("edit","superadmin","Edit any gamemode object from inside the game. A very powerful command.", (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.new") || yarp.users[player.socialClub].isDev()){
      let Class = args[0];
      let _id = args[1];
      if (args[2]){
        _id = _id+" "+args[2];
      }
      if (yarp[Class]) {
        let obj = yarp[Class.toLowerCase()+"s"][_id];
        if (obj) {
          let parsed = yarp.utils.parseParams(obj);
          for (k in obj){
            parsed = parsed.replace(`"${k}": `,'');
          }
          player.call('createBrowser', [['package://YARP/ui/html/editor.html', 'setupCodeEditor',`new yarp.${Class}(${parsed.slice(1,-1)}).save();`]]);
        }
      }
    }
  }).save();

  new yarp.Command("givegroup", "superadmin", 'Give a group to an user or character.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.givegroup") || yarp.users[player.socialClub].isDev()){
      if (yarp.users[args[0]]){
        yarp.users[args[0]].giveGroup(args[1]);
        yarp.users[args[0]].save();
      } else if (yarp.characters[args[0]]){
        yarp.characters[args[0]].giveGroup(args[1]);
        yarp.characters[args[0]].save();
      }
    }
  }).save();

  new yarp.Command("takegroup", "superadmin", 'Take a group from an user or character.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.takegroup") || yarp.users[player.socialClub].isDev()){
      if (yarp.users[args[0]]){
        yarp.users[args[0]].takeGroup(args[1]);
        yarp.users[args[0]].save();
      } else if (yarp.characters[args[0]]){
        yarp.characters[args[0]].takeGroup(args[1]);
        yarp.characters[args[0]].save();
      }
    }
  }).save();

  new yarp.Command('kill', 'admin', 'Kill yourself.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.kill")){
      player.health = 0;
    }
  }).save();

  new yarp.Command('hp', 'admin', 'Regenerates player health.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.hp")){
      player.health = 100;
    }
  }).save();

  new yarp.Command('armour', 'admin', 'Regenerates player armour.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.armour")){
      player.armour = 100;
    }
  }).save();

  new yarp.Command("weapon", "admin", 'Gives specified weapon and ammo.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.weapon")){
      let ammo = Number(args[1]) || 10000;
      yarp.characters[player.name].giveWeapon(args[0], ammo);
      yarp.characters[player.name].save();
      player.giveWeapon(mp.joaat(args[0]), ammo);
    }
  }).save();

  new yarp.Command('veh', "admin", 'Spawns specified vehicle model.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.veh")){
      let veh = mp.vehicles.new(mp.joaat(args[0]), player.position);
      player.putIntoVehicle(veh, -1);
    }
  }).save();

  new yarp.Command('noclip', 'admin', 'Toggle No-clip.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.noclip")){
      player.call('toggleNoclip')
    }
  }).save();

  new yarp.Command('charpos', 'admin', 'Toggle character position display.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.charpos")){
      player.call('toggleCharpos')
    }
  }).save();

  new yarp.Command('camdir', 'admin', 'Toggle camera direction display.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.camdir")){
      player.call('toggleCamdir')
    }
  }).save();

  new yarp.Command("tp", 'admin', 'Teleport to specified x y z.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.tp")){
      player.position = new mp.Vector3(args[0], args[1], args[2]);
    }
  }).save();

  new yarp.Command("jtp", 'admin', 'Teleport to specified JSON location.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.jtp")){
      player.position = JSON.parse(args.join(" "));
    }
  }).save();

  new yarp.Command("jpos", "admin", 'Write your location + commentary on jpos.log.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.jpos")){
      var fs = require('fs');
      let comment = "";
      if (args.length > 0){
        comment = " : " + args.join(" ");
      }
      fs.appendFile("jpos.log", JSON.stringify(player.position) + comment +"\n");
    }
  }).save();

  new yarp.Command('inventory', "user", 'Open your inventory.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.inventory")){
      let inventoryJson = JSON.stringify(yarp.characters[player.name].inventory);
      player.call('showPlayerInventory', [inventoryJson, 0])
    }
  }).save();

  new yarp.Command("money", "user", 'Write your location + commentary on jpos.log.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.money")){
      player.outputChatBox(`Wallet: !{51, 204, 51}${yarp.characters[player.name].wallet}`);
      player.outputChatBox(`Bank: !{0, 153, 255}${yarp.characters[player.name].bank}`);
    }
  }).save();

  new yarp.Command("?", "user", 'Lists existing commands for each category.', (player,args) => {
    if (yarp.users[player.socialClub].hasPermission("cmd.hint")){
      if (!args[0]){
        player.outputChatBox(`!{yellow}HINT!{white}: ${Object.keys(yarp.Command.categories).join(", ")}`);
      } else {
        let category = yarp.Command.categories[args[0]];
        if (category){
          player.outputChatBox(`!{yellow}HINT!{white}: ${category.join(", ")}`);
        } else {
          let command = yarp.commands[args[0]];
          if (command) {
            player.outputChatBox(`!{yellow}HINT!{white}: ${command.hint}`);
          }
        }
      }
    }
  }).save();
})
