'use strict';
/**
 * Player events
 */

/**
 * Chat event.
 * @event playerChat
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {String} message Message sent.
 */
mp.events.add('playerChat', (player, message) => {
  console.log(chalk.cyanBright('[YARP] ') + `${player.name}: ${message}`);
  mp.players.broadcast(`${player.name}: ${message}`);
});

/**
 * Command event.
 * @event playerCommand
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {String} command Message sent.
 */
mp.events.add('playerCommand', (player, command) => {
  const args = command.split(/[ ]+/);
  const commandName = args.splice(0, 1)[0];
  console.log(`${player.name}: /${command}`);
  command = yarp.commands[commandName];

  if (command) {
    let user = yarp.users[player.socialClub];
    let character = user.character;
    if (user.hasPermissions(command.permissions) || character.hasPermissions(command.permissions)) {
      if (character.hasItems(command.items)) {
        if (command.position && command.range) {
          if (yarp.utils.server.vectorDistance(player.position, command.position) < command.range) {
            command.call(player, args);
          } else {
            player.outputChatBox('!{yellow}HINT!{white}: You are at the wrong position.');
          }
        } else {
          command.call(player, args);
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
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 */
mp.events.add('playerDeath', (player) => {
    let character = yarp.characters[player.name];
    character.weapons = {};
    character.health = 100;
    character.armour = 0;
    character.save();
    yarp.client.unequipAllWeapons(player);
    player.removeAllWeapons();
    player.spawn(yarp.variables['Spawns'].value[Math.floor(Math.random() * yarp.variables['Spawns'].value.length)]);
    player.health = 100;
});

/**
 * Join event.
 * @event playerJoin
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 */
mp.events.add('playerJoin', (player) => {
  player.name = player.socialClub;
  console.log(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
  yarp.client.setWorldTime(player, {h: mp.world.time.hour, m: mp.world.time.minute, s: mp.world.time.second});
  let user = yarp.users[player.socialClub];
  if (user != null) {
    if (user.banned) {
      player.outputChatBox('!{red}You have been banned.');
      console.log(`${player.socialClub} is banned.`);
      setTimeout(function() {
        player.kick('You have been banned.');
      }, 1000);
    } else if (yarp.variables['Whitelisted'].value && !user.whitelisted) {
      player.outputChatBox('!{yellow}You are not whitelisted.');
      console.log(`${player.socialClub} is not whitelisted.`);
      setTimeout(function() {
        player.kick('You are not whitelisted.');
      }, 1000);
    } else {
      yarp.client.createBrowser(player, 'menu', ['package://YARP/ui/html/accountLogin.html'], true, true);
    }
  } else {
    yarp.client.createBrowser(palyer, 'menu', ['package://YARP/ui/html/accountRegister.html', 'setAccountName', player.socialClub], true, true);
  }
});

/**
 * Quit event.
 * @event playerQuit
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {String} exitType Exit type.
 * @param {String} reason Exit reason.
 */
mp.events.add('playerQuit', (player, exitType, reason) => {
  if (yarp.users[player.socialClub]) yarp.users[player.socialClub].leave();
  if (yarp.characters[player.name]) yarp.characters[player.name].leave();
  let msg = `${player.name}(${player.socialClub}/${player.ip}) quit. (${exitType})`;
  if (exitType == 'kicked') {
    msg = `${player.name}(${player.socialClub}/${player.ip}) quit. Reason: ${reason} (${exitType})`;
  }
  console.log(msg);
});

/**
 * Player ready.
 * @event playerReady
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 */
mp.events.add('playerReady', (player) => {
});

/**
 * Player spawned.
 * @event playerSpawn
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 */
mp.events.add('playerSpawn', (player) => {
});

/**
 * Weapon change event.
 * @event playerWeaponChange
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {Number} oldWeapon Old weapon hash.
 * @param {Number} newWeapon New weapon hash.
 */
let currentWeapons = {};
mp.events.add('playerWeaponChange', (player, oldWeapon, newWeapon) => {
  let character = yarp.characters[player.name];
  if (character) {
    for (let id in character.weapons) {
      if (mp.joaat(id) == newWeapon) {
        currentWeapons[player.id] = id;
        yarp.client.unequipWeapon(player, id);
      } else if ((mp.joaat(id) == oldWeapon) && (newWeapon != 1970349056)) {
        yarp.client.equipWeapon(palyer, yarp.weapons[id]);
      }
    }
  }
});

/**
 * Weapon shot event.
 * @event playerWeaponShot
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {String} targetPositionJson Target position JSON.
 * @param {String} targetEntityJson Target entity JSON.
 * @param {Number} weaponHash Weapon hash.
 */
mp.events.add('playerWeaponShot', (player, targetPositionJson, targetEntityJson, weaponHash) => {
  let character = yarp.characters[player.name];
  if (character) {
    if (currentWeapons[player.id]) {
      character.takeAmmo(currentWeapons[player.id], 1);
    }
  }
});
