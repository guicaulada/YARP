//Authentication Events
mp.events.add('showAuthenticationMenu', (juser, jtime) => {
  var user = JSON.parse(juser);
  var time = JSON.parse(jtime);
	mp.game.time.setClockTime(time.h, time.m, time.s);
  mp.game.graphics.notify('~r~Under development!');
  mp.players.local.freezePosition(false);
  mp.players.local.setCoords(152.5, -1001.25, -99.5, true, false, false, true);
  mp.players.local.setDesiredHeading(180);
  mp.players.local.freezePosition(true);
  if (user.characters == null){
    mp.events.call('createBrowser', ['package://YARP/www/html/accountRegister.html','setAccountName',user.social_club]);
  } else {
    mp.events.call('createBrowser', ['package://YARP/www/html/accountLogin.html']);
  }
});

mp.events.add('verifyAuthentication', (password) => {
	mp.players.local.freezePosition(false);
  mp.events.callRemote('verifyAuthentication', password);
});
