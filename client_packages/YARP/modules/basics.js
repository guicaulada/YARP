var cfg = null;

mp.events.add('showAuthenticationMenu', (juser, jtime) => {
  var user = JSON.parse(juser);
  var time = JSON.parse(jtime);
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

mp.events.add('loadServerConfig', (serverConfig) => {
  cfg = serverConfig;
});

var inRange = null;
mp.events.add('render', () => {
  mp.keys.unbind(69, false);
  inRange = null;
  if(cfg != null){
    for (file in cfg){
      for (id in cfg[file]){
        let item = cfg[file][id];
        if(item){
          if(item.action != null){
            if((typeof item.action[0]) == "string"){
              for(ipos of item.positions){
                const pos = mp.players.local.position;
                if (mp.game.system.vdist(pos.x, pos.y, pos.z, ipos.x, ipos.y, ipos.z) < 3){
                  inRange = {
                    file: file,
                    id: id
                  };
                  mp.game.graphics.drawText(item.text.msg, [ipos.x, ipos.y, ipos.z],
                  {
                    font: item.text.font,
                    color: [item.text.color.r, item.text.color.g, item.text.color.b, item.text.color.a],
                    scale: [item.scale.x, item.scale.y],
                    outline: item.scale.outline
                  });
                  mp.keys.bind(69, false, function() {
                    mp.events.callRemote(item.action[0], inRange.file, inRange.id);
                  });
                }
              }
            }
          }
        }
      }
    }
  }
});
