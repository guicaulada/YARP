var utils = require('./YARP/js/utils.js');
var camdir = false;
var noclip = false;
var charpos = false;

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

//Key codes http://keycode.info/
mp.events.add('render', () => {
  if (noclip){
    if (mp.keys.isDown(87) === true) {
      const pos = mp.players.local.position;
      const dir = utils.FUNCTIONS.getCameraDirection();
      mp.players.local.setCoordsNoOffset(pos.x+dir.x,pos.y+dir.y,pos.z+dir.z, false, false, false);
    }
    if (mp.keys.isDown(83) === true) {
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
