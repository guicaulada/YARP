'use strict';
/**
* @file Gamemode events
*/

mp.events.add('runServerCode', (player, code) => {
  if (yarp.users[player.socialClub].hasPermission("cmd.code") || yarp.users[player.socialClub].isDev()){
    eval(code);
  }
});

mp.events.add('playerBoundKeyPressed', (player, id) => {
  let call = yarp.hotkeys[id].call;
  if (call){
    (eval(call))(player,yarp.hotkeys[id].args);
  }
});


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
              if (marker.enter){
                (eval(marker.enter))(player);
              }
              marker.players.push(id)
            }
          } else {
            if (yarp.utils.Vector3Distance(player.position,marker.position) > marker.range){
              if (marker.leave){
                (eval(marker.leave))(player);
              }
              marker.players.splice(i,1)
            }
          }
        });

        yarp.checkpoints.forEach((checkpoint) => {
          let i = checkpoint.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,checkpoint.position) < checkpoint.range){
              if (checkpoint.enter){
                (eval(checkpoint.enter))(player);
              }
              checkpoint.players.push(id)
            }
          } else {
            if (yarp.utils.Vector3Distance(player.position,checkpoint.position) > checkpoint.range){
              if (checkpoint.leave){
                (eval(checkpoint.leave))(player);
              }
              checkpoint.players.splice(i,1)
            }
          }
        });

        yarp.labels.forEach((label) => {
          let i = label.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,label.position) < label.range){
              if (label.enter){
                (eval(label.enter))(player);
              }
              label.players.push(id)
            }
          } else {
            if (yarp.utils.Vector3Distance(player.position,label.position) > label.range){
              if (label.leave){
                (eval(label.leave))(player);
              }
              label.players.splice(i,1)
            }
          }
        });

        yarp.doors.forEach((door) => {
          let i = door.players.indexOf(id);
          if (i < 0) {
            if (yarp.utils.Vector3Distance(player.position,door.position) < door.range){
              if (user.hasPermissions(door.permissions) || character.hasPermissions(door.permissions)){
                if (character.hasItems(door.items)) {
                  player.call('playerOpenDoor',[JSON.stringify(door)]);
                } else {
                  player.call('playerCloseDoor',[JSON.stringify(door)]);
                }
              } else {
                player.call('playerCloseDoor',[JSON.stringify(door)]);
              }
              door.players.push(id)
            }
          } else {
            if (yarp.utils.Vector3Distance(player.position,door.position) > door.range){
              if (user.hasPermissions(door.permissions) || character.hasPermissions(door.permissions)){
                if (character.hasItems(door.items)) {
                  player.call('playerCloseDoor',[JSON.stringify(door)])
                }
              }
              door.players.splice(i,1)
            }
          }
        });
      }
    }
  });
  setTimeout(tick,100);
}
tick();
