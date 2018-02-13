var utils = require('./YARP/js/utils.js');
var camdir = false
var noclip = false
var charpos = false
var bWindow = null;
var cbargs = [];

//Browser Creation Events
mp.events.add('createBrowser', (args) => {
	if(bWindow != null) {
		mp.events.call('destroyBrowser');
	}
	cbargs = args.slice(1,args.length);
	bWindow = mp.browsers.new(args[0]);
});

mp.events.add('destroyBrowser', (args) => {
	mp.gui.cursor.visible = false;
  mp.gui.chat.activate(true);
	bWindow.destroy();
	bWindow = null;

	cbargs = args.slice(1,args.length);
	var cbr = args[0];
  mp.game.graphics.notify(cbr);
	if(args.length > 0) {
		mp.events.call(cbr, cbargs);
	}
});

mp.events.add('browserDomReady', (browser) => {
	if(bWindow === browser) {
		mp.gui.cursor.visible = true;
    mp.gui.chat.activate(false);
		var args = cbargs.slice(1,cbargs.length);
		var cbr = cbargs[0];
		if(cbargs.length > 0) {
			mp.events.call(cbr, args);
		}
	}
});

//Character Creation Events
mp.events.add('showLogin', (juser, jtime) => {
  var user = JSON.parse(juser);
  var time = JSON.parse(jtime);
	mp.game.time.setClockTime(time.h, time.m, time.s);
  mp.game.graphics.notify('~r~Under development!');
  mp.players.local.freezePosition(false);
  mp.players.local.setCoords(-18.4206,-1439.0106,30.1015, true, false, false, true);
  mp.players.local.freezePosition(true);
  if (user.characters == null){
    mp.events.call('createBrowser', ['package://YARP/www/html/accountRegister.html','setAccountName',user.social_club]);
  } else {
    mp.events.call('createBrowser', ['package://YARP/www/html/accountLogin.html']);
  }
});

mp.events.add('setAccountName', (args) => {
  mp.browsers.at(0).execute(`document.getElementById('acct').value = '${args[0]}';`);
});

mp.events.add('loginUser', (password) => {
  mp.events.callRemote('loginUser', password);
});

mp.events.add('characterSelection', (juser) => {
  var user = JSON.parse(juser);
  if (user.characters.length == 0){
    mp.events.call('createBrowser', ['package://YARP/www/html/characterCreator.html']);
  } else {
    mp.game.graphics.notify('~b~*Character selection menu*');
  }
});

mp.events.add('freezePlayer', (args) => {
	mp.players.local.freezePosition(args[0]);
});

//Command Events
mp.events.add('toggleCamdir', () => {
    camdir = !camdir
});

mp.events.add('toggleCharpos', () => {
    charpos = !charpos
});

mp.events.add('toggleNoclip', () => {
    noclip = !noclip
    mp.players.local.setInvincible(noclip);
    mp.players.local.freezePosition(false);
    mp.players.local.setVisible(!noclip, !noclip)
    mp.players.local.setCollision(!noclip,!noclip);
    mp.players.local.setHasGravity(!noclip);
    if (noclip){
      mp.players.local.setMaxSpeed(0.0001);
    } else {
      mp.players.local.setMaxSpeed(10);
    }
});

mp.events.add('render', () => {
  if (noclip){
    if (mp.keys.isDown(0x57) === true) {
      const pos = mp.players.local.position;
      const dir = utils.FUNCTIONS.getCameraDirection();
      mp.players.local.setCoordsNoOffset(pos.x+dir.x,pos.y+dir.y,pos.z+dir.z, false, false, false);
    }
    if (mp.keys.isDown(0x53) === true) {
      const pos = mp.players.local.position;
      const dir = utils.FUNCTIONS.getCameraDirection();
      mp.players.local.setCoordsNoOffset(pos.x-dir.x,pos.y-dir.y,pos.z-dir.z, false, false, false);
    }
  }
  if (charpos){
    const pos = mp.players.local.position;
    mp.game.graphics.drawText(`X:${pos.x}    Y:${pos.y}    Z:${pos.z}`, [0.5, 0.005],
    {
      font: 4,
      color: [255, 255, 255, 255],
      scale: [1.0, 1.0],
      outline: true
    });
  }
  if (camdir){
    const dir = utils.FUNCTIONS.getCameraDirection();
    mp.game.graphics.drawText(`X:${dir.x}    Y:${dir.y}    Z:${dir.z}`, [0.5, 0.05],
    {
      font: 4,
      color: [255, 255, 255, 255],
      scale: [1.0, 1.0],
      outline: true
    });
  }
});
