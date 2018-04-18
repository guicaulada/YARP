'use strict';
/**
 * @file Player events
 * @namespace server.player
 */

/**
 * Chat event.
 * @event playerChat
 * @memberof server.player
 * @param {object} player - The player that called the event.
 * @param {string} message - Message sent.
 */
mp.events.add('playerChat', (player, message) => {
  console.log(`${player.name}: ${message}`);
	mp.players.broadcast(`${player.name}: ${message}`);
});

/**
 * Command event.
 * @event playerCommand
 * @memberof server.player
 * @param {object} player - The player that called the event.
 * @param {string} command - Message sent.
 */
mp.events.add('playerCommand', (player, command) => {
	const args = command.split(/[ ]+/);
	const commandName = args.splice(0, 1)[0];
  console.log(`${player.name}: /${command}`);
  command = yarp.commands[commandName];

	if (command) {
    let user = yarp.users[player.socialClub];
    let character = user.character;
    if (user.hasPermissions(command.permissions) || character.hasPermissions(command.permissions)){
      if (character.hasItems(command.items)) {
        if(command.position && command.range) {
          if (yarp.utils.Vector3Distance(player.position,command.position) < command.range){
            command.call(player,args);
          } else {
            player.outputChatBox('!{yellow}HINT!{white}: You are at the wrong position.');
          }
        } else {
          command.call(player,args);
        }
      } else {
        player.outputChatBox('!{yellow}HINT!{white}: You don\'t have the required items.');
      }
	  } else {
      player.outputChatBox('!{yellow}HINT!{white}: You don\'t have permission.');
    }
  }
});

mp.events.add('playerDamage', (player, healthLoss, armorLoss) => {
});

/**
 * Death event.
 * @event playerDeath
 * @memberof server.player
 * @param {object} player - The player that called the event.
 * @fires unequipAllWeapons
 */
mp.events.add('playerDeath', (player) => {
    let character = yarp.characters[player.name];
    character.weapons = {};
    character.health = 100;
    character.armour = 0;
    character.save();
    player.call('unequipAllWeapons');
    player.removeAllWeapons();
    player.spawn(yarp.variables['Spawns'].value[Math.floor(Math.random() * yarp.variables['Spawns'].value.length)]);
    player.health = 100;
});

/**
 * Join event.
 * @event playerJoin
 * @memberof server.player
 * @param {object} player - The player that called the event.
 * @fires createBrowser
 */
mp.events.add('playerJoin', (player) => {
  player.name = player.socialClub;
  console.log(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
  player.call('setWorldTime', [JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
  let user = yarp.users[player.socialClub]
  if(user != null){
    if (user.banned) {
      player.outputChatBox('!{red}You have been banned.');
      console.log(`${player.socialClub} is banned.`);
      setTimeout(function(){
        player.kick('You have been banned.');
      },1000);
    } else if (yarp.variables['Whitelisted'].value && !user.whitelisted) {
      player.outputChatBox('!{yellow}You are not whitelisted.');
      console.log(`${player.socialClub} is not whitelisted.`);
      setTimeout(function(){
        player.kick('You are not whitelisted.');
      },1000);
    }
    else {
      player.call('createBrowser', ['menu', ['package://YARP/ui/html/accountLogin.html']]);
    }
  } else {
    player.call('createBrowser', ['menu', ['package://YARP/ui/html/accountRegister.html','setAccountName', player.socialClub]]);
  }
});

/**
 * Quit event.
 * @event playerQuit
 * @memberof server.player
 * @param {object} player - The player that called the event.
 * @param {string} exitType - Exit type.
 * @param {string} reason - Exit reason.
 */
mp.events.add('playerQuit', (player, exitType, reason) => {
  if (yarp.users[player.socialClub]) yarp.users[player.socialClub].leave();
  if (yarp.characters[player.name]) yarp.characters[player.name].leave();
  let msg = `${player.name}(${player.socialClub}/${player.ip}) quit. (${exitType})`;
  if (exitType == 'kicked') {
    msg = `${player.name}(${player.socialClub}/${player.ip}) kicked. Reason: ${reason} (${exitType})`;
  }
  console.log(msg);
});

/**
 * Player ready.
 * @event playerReady
 * @memberof server.player
 * @param {object} player - The player that called the event.
 */
mp.events.add('playerReady', player => {
});

/**
 * Player spawned.
 * @event playerSpawn
 * @memberof server.player
 * @param {object} player - The player that called the event.
 */
mp.events.add('playerSpawn', player => {
});

/**
 * Weapon change event.
 * @event playerWeaponChange
 * @memberof server.player
 * @param {object} player - The player that called the event.
 * @param {number} oldWeapon - Old weapon hash.
 * @param {number} newWeapon - New weapon hash.
 * @fires unequipWeapon
 * @fires equipWeapon
 */
let currentWeapons = {};
mp.events.add('playerWeaponChange', (player, oldWeapon, newWeapon) => {
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

/**
 * Weapon shot event.
 * @event playerWeaponShot
 * @memberof server.player
 * @param {object} player - The player that called the event.
 * @param {string} targetPositionJson - Target position JSON.
 * @param {string} targetEntityJson - Target entity JSON.
 * @param {number} weaponHash - Weapon hash.
 */
mp.events.add('playerWeaponShot', (player, targetPositionJson, targetEntityJson, weaponHash) => {
  let character = yarp.characters[player.name];
  if (character) {
    character.takeAmmo(currentWeapons[player.id],1);
  }
});
