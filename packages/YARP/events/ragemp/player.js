'use strict';
/**
 * Player events
 * @memberof ragemp.server
 */

/**
 * Chat event.
 * @event playerChat
 * @memberof ragemp.server
 * @param {Object} player The player that called the event.
 * @param {String} message Message sent.
 */
mp.events.add('playerChat', (player, message) => {
  yarp.log.info(`${player.name}: ${message}`);
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
  yarp.log.info(`${player.name}: /${command}`);
  command = yarp.commands[commandName];

  if (command) {
    let user = player.user;
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
    let character = player.character;
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
  yarp.server.loginPlayer(player);
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
  if (player.user) {
    player.user.leave();
    player.user.player = null;
    player.user.character = null;
  }
  if (player.character) {
    player.character.leave();
    player.character.player = null;
  }
  let msg = `${player.name}(${player.socialClub}/${player.ip}) quit. (${exitType})`;
  if (exitType == 'kicked') {
    msg = `${player.name}(${player.socialClub}/${player.ip}) quit. Reason: ${reason} (${exitType})`;
  }
  yarp.log.info(msg);
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
mp.events.add('playerWeaponChange', (player, oldWeapon, newWeapon) => {
  let character = player.character;
  if (character) {
    for (let id in character.equipment) {
      if (yarp.items[id].isWeapon()) {
        if (mp.joaat(id) == newWeapon) {
          character.weapon = id;
          yarp.client.unequipWeapon(player, id);
          yarp.utils.client.setWeaponAmmo(player, newWeapon, Number(character.equipment[yarp.weapons[id].ammo]));
        } else if ((mp.joaat(id) == oldWeapon) && (newWeapon != 1970349056)) {
          yarp.client.equipWeapon(player, yarp.weapons[id]);
        }
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
  let character = player.character;
  if (character) {
    if (character.weapon) {
      character.equipment[yarp.weapons[character.weapon].ammo] = character.equipment[yarp.weapons[character.weapon].ammo]-1;
      yarp.utils.client.setWeaponAmmo(player, weaponHash, character.equipment[yarp.weapons[character.weapon].ammo]);
    }
  }
});
