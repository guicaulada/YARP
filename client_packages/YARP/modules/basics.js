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
      item: JSON.parse(itemJson),
      file: file,
      id: id
    };
    mp.keys.bind(69, false, function() {
      mp.events.callRemote(inRange.item.action[0], inRange.file, inRange.id);
    });
  }
});

mp.events.add('removeInRangeItem', () => {
  mp.events.call('destroyBrowser');
  mp.keys.unbind(69, false);
  inRange = null;
});

mp.events.add('render', () => {
  if (inRange != null){
    mp.game.graphics.drawText(inRange.item.text.msg, [inRange.item.pos.x, inRange.item.pos.y, inRange.item.pos.z],
    {
      font: inRange.item.text.font,
      color: [inRange.item.text.color.r, inRange.item.text.color.g, inRange.item.text.color.b, inRange.item.text.color.a],
      scale: [inRange.item.text.scale.x, inRange.item.text.scale.y],
      outline: inRange.item.text.outline
    });
  }
});
