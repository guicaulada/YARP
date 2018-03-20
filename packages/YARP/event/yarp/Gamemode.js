'use strict';
/**
* @file Gamemode events
*/

mp.events.add('runServerCode', (player, code) => {
  if (yarp.users[player.socialClub].hasPermission("cmd.code") || yarp.users[player.socialClub].isDev()){
    eval(code);
  }
});

mp.events.add('callLabel', (player, id) => {
  (eval(yarp.labels[id].call))(player);
});


function tick() {
  mp.players.forEach((player,id) => {
    yarp.markers.forEach((marker) => {
      let i = marker.players.indexOf(id);
      if (i < 0) {
        if (yarp.utils.Vector3Distance(player.position,marker.position) < marker.range){
          if (marker.enter){
            marker.enter(player);
          }
          marker.players.push(id)
        }
      } else {
        if (yarp.utils.Vector3Distance(player.position,marker.position) > marker.range){
          if (marker.leave){
            marker.leave(player);
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
            checkpoint.enter(player);
          }
          checkpoint.players.push(id)
        }
      } else {
        if (yarp.utils.Vector3Distance(player.position,checkpoint.position) > checkpoint.range){
          if (checkpoint.leave){
            checkpoint.leave(player);
          }
          checkpoint.players.splice(i,1)
        }
      }
    });

    yarp.labels.forEach((label) => {
      let i = label.players.indexOf(id);
      if (i < 0) {
        if (yarp.utils.Vector3Distance(player.position,label.position) < label.range){
          if (label.call){
            player.call('enterLabel',[label.id,label.key])
          }
          label.players.push(id)
        }
      } else {
        if (yarp.utils.Vector3Distance(player.position,label.position) > label.range){
          if (label.call){
            player.call('leaveLabel')
          }
          label.players.splice(i,1)
        }
      }
    });
  });
  setTimeout(tick,100);
}
tick();
