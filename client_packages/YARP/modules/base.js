var utils = require('./YARP/exports/utils.js');

var inRange = null;

mp.events.add('showAuthenticationMenu', (juser, jtime) => {
  let user = JSON.parse(juser);
  let time = JSON.parse(jtime);
	mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
	mp.game.time.setClockTime(time.h, time.m, time.s);
  if (user.password == null){
    mp.events.call('createBrowser', ['package://YARP/statics/html/accountRegister.html','setAccountName',user.social_club]);
  } else {
    mp.events.call('createBrowser', ['package://YARP/statics/html/accountLogin.html']);
  }
});

mp.events.add('verifyAuthentication', (password) => {
  mp.events.callRemote('verifyAuthentication', password);
});

mp.events.add('addInRangeItem', (itemJson, file, id) => {
  if (inRange == null){
    inRange = {
      active: false,
      npcs: {},
      item: JSON.parse(itemJson),
      file: file,
      id: id
    };
  }
});

mp.events.add('render', () => {
  if (mp.players.local.isShooting()){
    mp.events.callRemote('updateWeaponAmmo', utils.getCurrentWeapon(), -1);
  }
  if (inRange != null){
    let player_pos = mp.players.local.position;
    let pos = inRange.item.pos;
    let dist = mp.game.system.vdist2(player_pos.x, player_pos.y, player_pos.z, pos.x, pos.y, pos.z);
    let texts = inRange.item.texts;
    let markers = inRange.item.markers;
    let npcs = inRange.item.npcs;
    let action = inRange.item.action;
    let actionRange = (dist < inRange.item.range);
    let textRange = false;
    let markerRange = false;
    let npcRange = false;
    for (let i = 0; i < texts.length; i++) {
      text = texts[i];
      if (text != null){
        textRange = (dist < text.range);
      }
      if(textRange){
        if(!text.hidden){
          mp.game.graphics.drawText(text.msg, [pos.x+text.offset.x, pos.y+text.offset.y, pos.z+text.offset.z], {
            font: text.font,
            color: [text.color.r, text.color.g, text.color.b, text.color.a],
            scale: [text.scale.x, text.scale.y],
            outline: text.outline
          });
        }
      }
    }
    for (let i = 0; i < markers.length; i++) {
      marker = markers[i];
      if (marker != null){
        markerRange = (dist < marker.range);
      }
      if(markerRange){
        if(!marker.hidden){
          mp.game.graphics.drawMarker(marker.type, pos.x+marker.offset.x, pos.y+marker.offset.y, pos.z+marker.offset.z,
            marker.direction.x, marker.direction.y, marker.direction.z,
            marker.rotation.x, marker.rotation.y, marker.rotation.z,
            marker.scale.x, marker.scale.y, marker.scale.z,
            marker.color.r, marker.color.g, marker.color.b, marker.color.a,
            marker.bounce, marker.rotate, 2,
            marker.spin, "", "", marker.onentity
          );
        }
      }
    }
    for (let i = 0; i < npcs.length; i++) {
      npc = npcs[i];
      if (npc != null){
        npcRange = (dist < npc.range);
        if(npcRange){
          if(!npc.hidden && inRange.npcs[i] == null){
            inRange.npcs[i] = mp.peds.new(
              mp.game.joaat(npc.model),
              new mp.Vector3( pos.x+npc.offset.x, pos.y+npc.offset.y, pos.z+npc.offset.z), npc.offset.h,
              (streamPed) => {
                if (npc.action.length > 0) {
                  let args = npc.action.splice(1,npc.action.length)
                  mp.events.callRemote(npc.action[0], streamPed, inRange.file, inRange.id, args);
                }
              },
              mp.players.local.dimension
            );
          }
        } else if (inRange.npc != null && npc.destroy){
          inRange.npcs[i].destroy();
          inRange.npcs[i] = null;
        }
      }
    }
    if(actionRange){
      if(!inRange.active){
        inRange.active = true;
        if (action.length > 0){
          let args = action.splice(1,action.length)
          mp.keys.bind(69, false, function() {
            mp.events.callRemote(action[0], inRange.file, inRange.id, args);
          });
        }
      }
    } else {
      if(inRange.active){
        inRange.active = false;
        mp.keys.unbind(69, false);
        mp.events.call('destroyBrowser');
      }
      if(!textRange && !markerRange && !npcRange){
        inRange = null;
        mp.events.callRemote('removeInRangeItem');
      }
    }
  }
});
