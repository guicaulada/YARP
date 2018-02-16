mp.events.add('showAuthenticationMenu', (juser, jtime) => {
  var user = JSON.parse(juser);
  var time = JSON.parse(jtime);
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

var inRange = null;
mp.events.add('addInRangeItem', (itemJson, file, id) => {
  if (inRange == null){
    inRange = {
      active: false,
      item: JSON.parse(itemJson),
      file: file,
      id: id
    };
  }
});

mp.events.add('render', () => {
  if (inRange != null){
    var player_pos = mp.players.local.position;
    var pos = inRange.item.pos;
    var dist = mp.game.system.vdist2(player_pos.x, player_pos.y, player_pos.z, pos.x, pos.y, pos.z);
    var text = inRange.item.text;
    var marker = inRange.item.marker;
    var hasText = false;
    var hasMarker = false;
    if (text != null){
      if(dist < text.range){
        hasText = true;
        if(!text.hidden){
          mp.game.graphics.drawText(text.msg, [pos.x, pos.y, pos.z], {
            font: text.font,
            color: [text.color.r, text.color.g, text.color.b, text.color.a],
            scale: [text.scale.x, text.scale.y],
            outline: text.outline
          });
          if(!inRange.active){
            inRange.active = true;
            mp.keys.bind(69, false, function() {
              mp.events.callRemote(inRange.item.action[0], inRange.file, inRange.id);
            });
          }
        } else {
          if(inRange.active){
            inRange.active = false;
            mp.keys.unbind(69, false);
          }
        }
      }
    }
    if (marker != null){
      if(dist < marker.range){
        hasMarker = true;
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
    if(!hasText && !hasMarker){
      inRange = null;
      mp.events.call('destroyBrowser');
      mp.events.callRemote('removeInRangeItem');
    }
  }
});
