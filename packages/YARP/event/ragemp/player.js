'use strict';
/**
* @file Player events
*/

mp.events.add('playerChat', (player, message) => {
  console.log(`${player.name}: ${message}`);
	mp.players.broadcast(`${player.name}: ${message}`);
});

mp.events.add('playerCommand', (player, command) => {
	const args = command.split(/[ ]+/);
	const commandName = args.splice(0, 1)[0];
  console.log(`${player.name}: /${command}`);
  command = yarp.commands[commandName];

	if (command) {
    let call = eval(command.call);
    call(player,args);
	} else {
    player.outputChatBox("!{yellow}HINT!{white}: Command doesn't exist.");
  }
});

mp.events.add("playerDamage", (player, healthLoss, armorLoss) => {
});

mp.events.add('playerDeath', (player) => {
    let character = yarp.characters[player.name];
    character.weapons = {};
    character.save();
    player.call('unequipAllWeapons');
    player.removeAllWeapons();
    player.spawn(yarp.variables["Spawns"].value[Math.floor(Math.random() * yarp.variables["Spawns"].value.length)]);
    player.health = 100;
});

mp.events.add('playerJoin', (player) => {
  player.name = player.socialClub;
  console.log(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
  player.call('setWorldTime', [JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
  let user = yarp.users[player.socialClub]
  if(user != null){
    if (user.banned) {
      player.outputChatBox("!{red}You have been banned.");
      console.log(`${player.socialClub} is banned.`);
      setTimeout(function(){
        player.kick("You have been banned.");
      },1000);
    } else if (yarp.variables["Whitelisted"].value && !user.whitelisted) {
      player.outputChatBox("!{yellow}You are not whitelisted.");
      console.log(`${player.socialClub} is not whitelisted.`);
      setTimeout(function(){
        player.kick("You are not whitelisted.");
      },1000);
    }
    else {
      player.call('createBrowser', ["menu", ['package://YARP/ui/html/accountLogin.html']]);
    }
  } else {
    player.call('createBrowser', ["menu", ['package://YARP/ui/html/accountRegister.html','setAccountName', player.socialClub]]);
  }
});

mp.events.add('playerQuit', (player, exitType, reason) => {
  if (yarp.users[player.socialClub]) yarp.users[player.socialClub].leftGroup();
  if (yarp.characters[player.name]) yarp.characters[player.name].leftGroup();
  if (exitType != "kicked") {
    var str = `${player.name}(${player.socialClub}/${player.ip}) quit. (${exitType})`;
  } else {
    var str = `${player.name}(${player.socialClub}/${player.ip}) kicked. Reason: ${reason} (${exitType})`;
  }
  console.log(str);
});

mp.events.add("playerReady", player => {
});

mp.events.add("playerSpawn", player => {
});

let currentWeapons = {};
mp.events.add("playerWeaponChange", (player, oldWeapon, newWeapon) => {
  let character = yarp.characters[player.name];
  if (character) {
    for (let id in character.weapons){
      if (mp.joaat(id) == newWeapon){
        currentWeapons[player.id] = id;
        player.call('unequipWeapon', [id]);
      } else if ((mp.joaat(id) == oldWeapon) && (newWeapon != 1970349056)){
        player.call('equipWeapon', [JSON.stringify(yarp.weapons[id])]);
      }
    }
  }
});

mp.events.add('playerWeaponShot', (player, targetPositionJson, targetEntityJson, weaponHash) => {
  let character = yarp.characters[player.name];
  if (character) {
    character.takeAmmo(currentWeapons[player.id],1);
  }
});
