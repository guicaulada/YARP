var inRangeItems = {};
var closestText = {};
var closestMarker = {};
var spawnedNpcs = {};
mp.events.add('addInRangeItem', (itemJson, file, id) => {
  inRangeItems[file+'.'+id] = JSON.parse(itemJson);
});

mp.events.add('render', () => {
  for (fileid in inRangeItems){
    let inRangeItem = inRangeItems[fileid];
    if (inRangeItem != null){
      let itemId = fileid.split('.');
      let file = itemId[0];
      let id = itemId[1];
      let player_pos = mp.players.local.position;
      let pos = inRangeItem.pos;
      let texts = inRangeItem.texts;
      let markers = inRangeItem.markers;
      let npcs = inRangeItem.npcs;
      let textDistance = false;
      let markerDistance = false;
      let npcDistance = false;
      for (let i = 0; i < texts.length; i++) {
        text = texts[i];
        text.pos = new mp.Vector3(pos.x+text.offset.x, pos.y+text.offset.y, pos.z+text.offset.z);
        let dist = mp.game.system.vdist2(player_pos.x, player_pos.y, player_pos.z, text.pos.x, text.pos.y, text.pos.z);
        textDistance = dist < text.distance;
        if(textDistance){
          if(!text.hidden){
            mp.game.graphics.drawText(text.msg, [text.pos.x, text.pos.y, text.pos.z], {
              font: text.font,
              color: [text.color.r, text.color.g, text.color.b, text.color.a],
              scale: [text.scale.x, text.scale.y],
              outline: text.outline
            });
          }
          if (text.event.length > 0){
            if (dist < text.range){
              if (closestText.id != fileid + i && (dist < closestText.dist || closestText.dist == null)){
                closestText.id = fileid + i;
                closestText.dist = dist;
                let args = text.event.splice(1,text.event.length);
                mp.keys.bind(text.key, false, function() {
                  mp.events.callRemote(text.event[0], file, id, args);
                });
              }
            } else if (closestText.id == fileid + i) {
              closestText = {};
              mp.keys.unbind(text.key, false);
              mp.events.call('destroyBrowser');
            }
          }
        }
      }
      for (let i = 0; i < markers.length; i++) {
        marker = markers[i];
        marker.pos = new mp.Vector3(pos.x+marker.offset.x, pos.y+marker.offset.y, pos.z+marker.offset.z);
        let dist = mp.game.system.vdist2(player_pos.x, player_pos.y, player_pos.z, marker.pos.x, marker.pos.y, marker.pos.z);
        markerDistance = dist < marker.distance;
        if(markerDistance){
          if(!marker.hidden){
            mp.game.graphics.drawMarker(marker.type, marker.pos.x, marker.pos.y, marker.pos.z,
              marker.direction.x, marker.direction.y, marker.direction.z,
              marker.rotation.x, marker.rotation.y, marker.rotation.z,
              marker.scale.x, marker.scale.y, marker.scale.z,
              marker.color.r, marker.color.g, marker.color.b, marker.color.a,
              marker.bounce, marker.rotate, 2,
              marker.spin, "", "", marker.onentity
            );
          }
          if (dist < marker.range) {
            if (closestMarker.id != fileid + i && (dist < closestMarker.dist || closestMarker.dist == null)){
              closestMarker.id = fileid + i;
              closestMarker.dist = dist;
              if (marker.in.length > 0){
                let args = marker.in.splice(1,marker.in.length);
                mp.events.callRemote(marker.in[0], file, id, args);
              }
            }
          } else if (closestMarker.id == fileid + i) {
            closestMarker = {};
            mp.events.call('destroyBrowser');
            if (marker.out.length > 0){
              let args = marker.out.splice(1,marker.out.length);
              mp.events.callRemote(marker.out[0], file, id, args);
            }
          }
        }
      }
      for (let i = 0; i < npcs.length; i++) {
        npc = npcs[i];
        npc.pos = new mp.Vector3(pos.x+npc.offset.x, pos.y+npc.offset.y, pos.z+npc.offset.z);
        let dist = mp.game.system.vdist2(player_pos.x, player_pos.y, player_pos.z, npc.pos.x, npc.pos.y, npc.pos.z);
        npcDistance = dist < npc.distance;
        if(npcDistance){
          if(!npc.hidden && spawnedNpcs[fileid+i] == null){
            spawnedNpcs[fileid+i] = mp.peds.new(
              mp.game.joaat(npc.model),
              new mp.Vector3(npc.pos.x, npc.pos.y, npc.pos.z), npc.offset.h,
              (streamPed) => {
                if (npc.event.length > 0) {
                  let args = npc.event.splice(1,npc.event.length)
                  mp.events.callRemote(npc.event[0], streamPed, file, id, args);
                }
              },
              mp.players.local.dimension
            );
          }
        } else if (spawnedNpcs[fileid+i] != null && npc.destroy){
          spawnedNpcs[fileid+i].destroy();
          spawnedNpcs[fileid+i] = null;
        }
      }
      if(!textDistance && !markerDistance && !npcDistance){
        inRangeItems[fileid] = null;
        mp.events.callRemote('removeInRangeItem', file, id);
      }
    }
  }
});
