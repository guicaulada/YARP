var utils = require('./YARP/exports/utils.js');

mp.events.add('showAuthenticationMenu', (juser, jtime) => {
  let user = JSON.parse(juser);
  let time = JSON.parse(jtime);
	mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
	mp.game.time.setClockTime(time.h, time.m, time.s);
  if (user.password == null){
    mp.events.call('createBrowser', ['package://YARP/statics/html/accountRegister.html','setAccountName',user.socialClub]);
  } else {
    mp.events.call('createBrowser', ['package://YARP/statics/html/accountLogin.html']);
  }
});

mp.events.add('verifyAuthentication', (password) => {
  mp.events.callRemote('verifyAuthentication', password);
});

var inRange = null;
mp.events.add('addInRangeItem', (itemJson, file, id) => {
  if (inRange == null){
    inRange = {
      closestText: {},
      closestMarker: {},
      npcs: {},
      item: JSON.parse(itemJson),
      file: file,
      id: id
    };
  }
});

var lastWallet = 0;
var lastBank = 0;
var moneyUpdate = null;
var moneyUpdated = false;
var moneyColor = [];
mp.events.add('render', () => {
  //Saving bullets when ped is shooting and checking if shooting bullets that he doesnt have
  if (mp.players.local.isShooting()){
    mp.events.callRemote('updateWeaponAmmo', utils.getCurrentWeapon(), -1);
  }
  //Money display on top right, updates automatically with setVariable(PLAYER_WALLET, value)
  let playerWallet = mp.players.local.getVariable("PLAYER_WALLET");
  if (playerWallet == null){
    playerWallet = 0;
  }
  let walletDiff = playerWallet-lastWallet;
  if (walletDiff < 0){
    moneyUpdate = `-$${-walletDiff}`;
    moneyColor = [255, 0, 0, 255];
  } else if (walletDiff > 0) {
    moneyUpdate = `+$${walletDiff}`;
    moneyColor = [0, 255, 0, 255];
  }
  if (moneyUpdate != null) {
    mp.game.graphics.drawText(moneyUpdate, [1.0-(0.01*moneyUpdate.length), 0.1], {
      font: 7,
      color: moneyColor,
      scale: [0.75, 0.75],
      outline: true
    });
    if (!moneyUpdated){
      moneyUpdated = true;
      setTimeout(function(){
        moneyUpdate = null;
        moneyUpdated = false;
      },2500);
    }
  }
  lastWallet = playerWallet;
  let walletDisplay = `$${playerWallet}`;
  mp.game.graphics.drawText(walletDisplay, [1.0-(0.01*walletDisplay.length), 0.05], {
    font: 7,
    color: [255, 255, 255, 255],
    scale: [0.75, 0.75],
    outline: true
  });
  //Check for objects related to the in range item added by the event addInRangeItem
  if (inRange != null){
    let player_pos = mp.players.local.position;
    let pos = inRange.item.pos;
    let texts = inRange.item.texts;
    let markers = inRange.item.markers;
    let npcs = inRange.item.npcs;
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
            if (inRange.closestText.id != i && (dist < inRange.closestText.dist || inRange.closestText.dist == null)){
              inRange.closestText.id = i;
              inRange.closestText.dist = dist;
              let args = text.event.splice(1,text.event.length);
              mp.keys.bind(text.key, false, function() {
                mp.events.callRemote(text.event[0], inRange.file, inRange.id, args);
              });
            }
          } else if (inRange.closestText.id == i) {
            inRange.closestText = {};
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
          if (inRange.closestMarker.id != i && (dist < inRange.closestMarker.dist || inRange.closestMarker.dist == null)){
            inRange.closestMarker.id = i;
            inRange.closestMarker.dist = dist;
            if (marker.in.length > 0){
              let args = marker.in.splice(1,marker.in.length);
              mp.events.callRemote(marker.in[0], inRange.file, inRange.id, args);
            }
          }
        } else if (inRange.closestMarker.id == i) {
          inRange.closestMarker = {};
          mp.events.call('destroyBrowser');
          if (marker.out.length > 0){
            let args = marker.out.splice(1,marker.out.length);
            mp.events.callRemote(marker.out[0], inRange.file, inRange.id, args);
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
        if(!npc.hidden && inRange.npcs[i] == null){
          inRange.npcs[i] = mp.peds.new(
            mp.game.joaat(npc.model),
            new mp.Vector3(npc.pos.x, npc.pos.y, npc.pos.z), npc.offset.h,
            (streamPed) => {
              if (npc.event.length > 0) {
                let args = npc.event.splice(1,npc.event.length)
                mp.events.callRemote(npc.event[0], streamPed, inRange.file, inRange.id, args);
              }
            },
            mp.players.local.dimension
          );
        }
      } else if (inRange.npcs[i] != null && npc.destroy){
        inRange.npcs[i].destroy();
        inRange.npcs[i] = null;
      }
    }
    if(!textDistance && !markerDistance && !npcDistance){
      inRange = null;
      mp.events.callRemote('removeInRangeItem');
    }
  }
});
