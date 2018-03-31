'use strict';
/**
* @file Gamemode events
*/

mp.events.add('runServerCode', (player, code) => {
  if (yarp.users[player.socialClub].hasPermission('cmd.code')){
    eval(code);
  }
});

mp.events.add('playerBoundKeyPressed', (player, id) => {
  let user = yarp.users[player.socialClub];
  let character = user.character;
  let hotkey = yarp.hotkeys[id];
  if (hotkey.call){
    if (hotkey.args[player.id]) {
      if (user.hasPermissions(hotkey.permissions) || character.hasPermissions(hotkey.permissions)){
        if (character.hasItems(hotkey.items)) {
          if(hotkey.position && hotkey.range) {
            if (yarp.utils.Vector3Distance(player.position,hotkey.position) < hotkey.range){
              hotkey.call(player,hotkey.args[player.id]);
            }
          } else {
            hotkey.call(player,hotkey.args[player.id]);
          }
        } else {
          player.call('displayHelpText',['You don\'t have the required items.']);
        }
	   } else {
        player.call('displayHelpText',['You don\'t have permission.']);
      }
    }
  }
});

yarp.tick = 0;
function tick() {
  mp.players.forEach((player,id) => {
    let user = yarp.users[player.socialClub];
    if (user) {
      let character = user.character;
      if (character) {
        yarp.markers.forEach((marker) => {
          let i = marker.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,marker.position) < marker.range){
              if (user.hasPermissions(marker.permissions) || character.hasPermissions(marker.permissions)){
                if (character.hasItems(marker.items)) {
                  if (marker.enter){
                    marker.enter(player);
                  }
                } else {
                  player.notify('~r~You don\'t have permission.');
                }
              } else {
                player.notify('~r~You don\'t have the required items.');
              }
              marker.players.push(id)
            }
          } else {
            if (yarp.utils.Vector3Distance(player.position,marker.position) > marker.range){
              if (user.hasPermissions(marker.permissions) || character.hasPermissions(marker.permissions)){
                if (character.hasItems(marker.items)) {
                  if (marker.leave){
                    marker.leave(player);
                  }
                }
              }
              marker.players.splice(i,1)
            }
          }
        });

        yarp.props.forEach((prop) => {
          let i = prop.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,prop.position) < prop.range){
              if (user.hasPermissions(prop.permissions) || character.hasPermissions(prop.permissions)){
                if (character.hasItems(prop.items)) {
                  if (prop.enter){
                    prop.enter(player);
                  }
                } else {
                  player.notify('~r~You don\'t have permission.');
                }
              } else {
                player.notify('~r~You don\'t have the required items.');
              }
              prop.players.push(id)
            }
          } else {
            if (yarp.utils.Vector3Distance(player.position,prop.position) > prop.range){
              if (user.hasPermissions(prop.permissions) || character.hasPermissions(prop.permissions)){
                if (character.hasItems(prop.items)) {
                    if (prop.leave){
                    prop.leave(player);
                  }
                }
              }
              prop.players.splice(i,1)
            }
          }
        });

        yarp.checkpoints.forEach((checkpoint) => {
          let i = checkpoint.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,checkpoint.position) < checkpoint.range){
              if (user.hasPermissions(checkpoint.permissions) || character.hasPermissions(checkpoint.permissions)){
                if (character.hasItems(checkpoint.items)) {
                  if (checkpoint.enter){
                    checkpoint.enter(player);
                  }
                } else {
                  player.notify('~r~You don\'t have permission.');
                }
              } else {
                player.notify('~r~You don\'t have the required items.');
              }
              checkpoint.players.push(id)
            }
          } else {
            if (yarp.utils.Vector3Distance(player.position,checkpoint.position) > checkpoint.range){
              if (user.hasPermissions(checkpoint.permissions) || character.hasPermissions(checkpoint.permissions)){
                if (character.hasItems(checkpoint.items)) {
                  if (checkpoint.leave){
                    checkpoint.leave(player);
                  }
                }
              }
              checkpoint.players.splice(i,1)
            }
          }
        });

        yarp.labels.forEach((label) => {
          let i = label.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,label.position) < label.range){
              if (user.hasPermissions(label.permissions) || character.hasPermissions(label.permissions)){
                if (character.hasItems(label.items)) {
                  if (label.enter){
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
            if (yarp.utils.Vector3Distance(player.position,label.position) > label.range){
              if (user.hasPermissions(label.permissions) || character.hasPermissions(label.permissions)){
                if (character.hasItems(label.items)) {
                  if (label.leave){
                    label.leave(player);
                  }
                }
              }
              label.players.splice(i,1);
            }
          }
        });

        yarp.doors.forEach((door) => {
          let i = door.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,door.position) < door.range){
              if (user.hasPermissions(door.permissions) || character.hasPermissions(door.permissions)){
                if (character.hasItems(door.items)) {
                  if (door.enter){
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
            if (yarp.utils.Vector3Distance(player.position,door.position) > door.range){
              if (user.hasPermissions(door.permissions) || character.hasPermissions(door.permissions)){
                if (character.hasItems(door.items)) {
                  if (door.leave){
                    door.leave(player);
                  }
                }
              }
              door.players.splice(i,1);
            }
          }
        });

        if (yarp.tick % yarp.variables['Save Interval'].value == 0) {
          if ((player.position.x && player.position.y && player.position.z && player.health) != 0) {
            character.position = player.position;
            character.heading = player.heading;
            character.health = player.health;
            character.armour = player.armour;
            character.save();
          }
        }

        if (yarp.tick % yarp.variables['Hunger Interval'].value == 0) {
          character.addHunger(yarp.variables['Hunger Rate'].value);
        }

        if (yarp.tick % yarp.variables['Thirst Interval'].value == 0) {
          character.addThirst(yarp.variables['Thirst Rate'].value);
        }
      }
    }
  });

  yarp.tick++;
  if (yarp.tick == Number.MAX_SAFE_INTEGER) yarp.tick = 0;

  setTimeout(tick,500);
}
tick();
