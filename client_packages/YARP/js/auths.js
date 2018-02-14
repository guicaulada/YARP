//Authentication Events
mp.events.add('showAuthenticationMenu', (juser, jtime) => {
  var user = JSON.parse(juser);
  var time = JSON.parse(jtime);
	mp.game.time.setClockTime(time.h, time.m, time.s);
  if (user.password == null){
    mp.events.call('createBrowser', ['package://YARP/www/html/accountRegister.html','setAccountName',user.social_club]);
  } else {
    mp.events.call('createBrowser', ['package://YARP/www/html/accountLogin.html']);
  }
});

mp.events.add('verifyAuthentication', (password) => {
  mp.events.callRemote('verifyAuthentication', password);
});
