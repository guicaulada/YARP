'use strict';
/**
 * Gamemode events
 * @memberof yarp.server
 */

/**
 * Evaluates code on server-side.
 * @function runServerCode
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} code Code.
 */
yarp.server.runServerCode = (player, code) => {
  if (yarp.users[player.socialClub].hasPermission('cmd.code')) {
    eval(code);
  }
};

/**
 * Run server function.
 * @function runServerFunction
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} func Function name.
 * @param {Array} args Function arguments.
 */
yarp.server.runServerFunction = (player, func, args) => {
  if (yarp.users[player.socialClub].hasPermission('cmd.func')) {
    eval(func)(...args);
  }
};

/**
 * Evaluates code on server-side.
 * @function playerBoundKeyPressed
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} id Hotkey id.
 */
yarp.server.playerBoundKeyPressed = (player, id) => {
  let user = yarp.users[player.socialClub];
  let character = user.character;
  let hotkey = yarp.hotkeys[id];
  if (hotkey.call) {
    if (user.hasPermissions(hotkey.permissions) || character.hasPermissions(hotkey.permissions)) {
      if (character.hasItems(hotkey.items)) {
        if (hotkey.position && hotkey.range) {
          if (yarp.utils.server.vectorDistance(player.position, hotkey.position) < hotkey.range) {
            hotkey.call(player, hotkey.args[player.id]);
          }
        } else {
          hotkey.call(player, hotkey.args[player.id]);
        }
      } else {
        yarp.client.displayHelpText(player, 'You don\'t have the required items.');
      }
    } else {
      yarp.client.displayHelpText(player, 'You don\'t have permission.');
    }
  }
};

yarp.tick = 0;

/**
 * Scans players and objects to act on proximity.
 * @function tick
 * @memberof yarp.server
 */
function tick() {
  try {
    mp.players.forEach((player) => {
      try {
        let id = player.socialClub;
        let user = yarp.users[id];
        if (user) {
          let character = user.character;
          if (character) {
            yarp.checkpoints.forEach((checkpoint) => {
              try {
                let i = checkpoint.players.indexOf(id);
                if (i < 0) {
                  if (yarp.utils.server.vectorDistance(player.position, checkpoint.position) < checkpoint.range) {
                    if (user.hasPermissions(checkpoint.permissions) || character.hasPermissions(checkpoint.permissions)) {
                      if (character.hasItems(checkpoint.items)) {
                        if (checkpoint.enter) {
                          checkpoint.enter(player);
                        }
                      } else {
                        player.notify('~r~You don\'t have permission.');
                      }
                    } else {
                      player.notify('~r~You don\'t have the required items.');
                    }
                    checkpoint.players.push(id);
                  }
                } else {
                  if (yarp.utils.server.vectorDistance(player.position, checkpoint.position) > checkpoint.range) {
                    if (user.hasPermissions(checkpoint.permissions) || character.hasPermissions(checkpoint.permissions)) {
                      if (character.hasItems(checkpoint.items)) {
                        if (checkpoint.leave) {
                          checkpoint.leave(player);
                        }
                      }
                    }
                    checkpoint.players.splice(i, 1);
                  }
                }
              } catch (err) {
                console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
              }
            });

            yarp.doors.forEach((door) => {
              try {
                let i = door.players.indexOf(id);
                if (i < 0) {
                  if (yarp.utils.server.vectorDistance(player.position, door.position) < door.range) {
                    if (user.hasPermissions(door.permissions) || character.hasPermissions(door.permissions)) {
                      if (character.hasItems(door.items)) {
                        if (door.enter) {
                          door.enter(player);
                        }
                      } else {
                        player.notify('~r~You don\'t have permission.');
                      }
                    } else {
                      player.notify('~r~You don\'t have the required items.');
                    }
                    door.players.push(id);
                  }
                } else {
                  if (yarp.utils.server.vectorDistance(player.position, door.position) > door.range) {
                    if (user.hasPermissions(door.permissions) || character.hasPermissions(door.permissions)) {
                      if (character.hasItems(door.items)) {
                        if (door.leave) {
                          door.leave(player);
                        }
                      }
                    }
                    door.players.splice(i, 1);
                  }
                }
              } catch (err) {
                console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
              }
            });

            yarp.labels.forEach((label) => {
              try {
                let i = label.players.indexOf(id);
                if (i < 0) {
                  if (yarp.utils.server.vectorDistance(player.position, label.position) < label.range) {
                    if (user.hasPermissions(label.permissions) || character.hasPermissions(label.permissions)) {
                      if (character.hasItems(label.items)) {
                        if (label.enter) {
                          label.enter(player);
                        }
                      } else {
                        player.notify('~r~You don\'t have permission.');
                      }
                    } else {
                      player.notify('~r~You don\'t have the required items.');
                    }
                    label.players.push(id);
                  }
                } else {
                  if (yarp.utils.server.vectorDistance(player.position, label.position) > label.range) {
                    if (user.hasPermissions(label.permissions) || character.hasPermissions(label.permissions)) {
                      if (character.hasItems(label.items)) {
                        if (label.leave) {
                          label.leave(player);
                        }
                      }
                    }
                    label.players.splice(i, 1);
                  }
                }
              } catch (err) {
                console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
              }
            });

            yarp.markers.forEach((marker) => {
              try {
                let i = marker.players.indexOf(id);
                if (i < 0) {
                  if (yarp.utils.server.vectorDistance(player.position, marker.position) < marker.range) {
                    if (user.hasPermissions(marker.permissions) || character.hasPermissions(marker.permissions)) {
                      if (character.hasItems(marker.items)) {
                        if (marker.enter) {
                          marker.enter(player);
                        }
                      } else {
                        player.notify('~r~You don\'t have permission.');
                      }
                    } else {
                      player.notify('~r~You don\'t have the required items.');
                    }
                    marker.players.push(id);
                  }
                } else {
                  if (yarp.utils.server.vectorDistance(player.position, marker.position) > marker.range) {
                    if (user.hasPermissions(marker.permissions) || character.hasPermissions(marker.permissions)) {
                      if (character.hasItems(marker.items)) {
                        if (marker.leave) {
                          marker.leave(player);
                        }
                      }
                    }
                    marker.players.splice(i, 1);
                  }
                }
              } catch (err) {
                console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
              }
            });

            yarp.props.forEach((prop) => {
              try {
                let i = prop.players.indexOf(id);
                if (i < 0) {
                  if (yarp.utils.server.vectorDistance(player.position, prop.position) < prop.range) {
                    if (user.hasPermissions(prop.permissions) || character.hasPermissions(prop.permissions)) {
                      if (character.hasItems(prop.items)) {
                        if (prop.enter) {
                          prop.enter(player);
                        }
                      } else {
                        player.notify('~r~You don\'t have permission.');
                      }
                    } else {
                      player.notify('~r~You don\'t have the required items.');
                    }
                    prop.players.push(id);
                  }
                } else {
                  if (yarp.utils.server.vectorDistance(player.position, prop.position) > prop.range) {
                    if (user.hasPermissions(prop.permissions) || character.hasPermissions(prop.permissions)) {
                      if (character.hasItems(prop.items)) {
                          if (prop.leave) {
                          prop.leave(player);
                        }
                      }
                    }
                    prop.players.splice(i, 1);
                  }
                }
              } catch (err) {
                console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
              }
            });

            /* Player on player interaction disabled until I get more friends to test it :(
            mp.players.forEach((player2) => {
              try {
                let id2 = player2.socialClub;
                if (id != id2) {
                  let i = character.players.indexOf(id);
                  let user2 = yarp.users[id2];
                  if (user2) {
                    let character2 = user2.character;
                    if (character2) {
                      if (i < 0) {
                        if (yarp.utils.server.vectorDistance(player.position, player2.position) < 3) {
                          yarp.client.displayHelpText(player, 'Press ~INPUT_PICKUP~ to interact.');
                          yarp.hotkeys['Event'].bind(player, ['createBrowser', ['menu', ['package://YARP/ui/html/sideMenu.html', 'populateActionMenu', player2.name]], true, true]);
                          character.players.push(id2);
                          character2.player.push(id);
                        }
                      } else {
                        if (yarp.utils.server.vectorDistance(player.position, player2.position) > 3) {
                          yarp.client.clearHelpText(player);
                          yarp.hotkeys['Event'].unbind(player);
                          prop.players.splice(id2, 1);
                        }
                      }
                    }
                  }
                }
              } catch (err) {
                console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
              }
            });
            */

            if (yarp.tick % yarp.variables['Save Interval'].value == 0 && !character.isLocked()) {
              if ((player.position.x && player.position.y && player.position.z && player.health) != 0) {
                character._position = player.position;
                character._heading = player.heading;
                character._health = player.health;
                character._armour = player.armour;
                character.save();
              }
            }

            if (character.health > 5) {
              if (yarp.tick % yarp.variables['Hunger Interval'].value == 0) {
                character.hunger += yarp.variables['Hunger Rate'].value;
              }

              if (yarp.tick % yarp.variables['Thirst Interval'].value == 0) {
                character.thirst += yarp.variables['Thirst Rate'].value;
              }
            }

            if (yarp.tick % yarp.variables['XP Interval'].value == 0) {
              character.xp += yarp.variables['XP Rate'].value;
            }
          }
        }
      } catch (err) {
        console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
      }
    });

    yarp.vehicles.forEach((vehicle) => {
      try {
        if (yarp.tick % yarp.variables['Save Interval'].value == 0) {
          vehicle._position = vehicle.mp.position;
          vehicle._heading = vehicle.mp.heading;
          vehicle.save();
        }
      } catch (err) {
        console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
      }
    });
  } catch (err) {
    console.log(chalk.redBright('[YARP] ') + 'TickError: ' + err.message + '\n' + err.stack);
  }

  yarp.tick++;
  if (yarp.tick == Number.MAX_SAFE_INTEGER) yarp.tick = 0;

  setTimeout(tick, 1000/yarp.variables['Ticks/Second'].value);
}
tick();
