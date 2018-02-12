function getCameraDirection(){ // Credits to https://github.com/ImagicTheCat/vRP/blob/vrpex/vrp/client/base.lua#L46 - Thank you for teaching me so much.
  const heading = mp.game.cam.getGameplayCamRelativeHeading()+mp.players.local.getHeading();
  const pitch = mp.game.cam.getGameplayCamRot(0).x;

  var x = -Math.sin(heading*Math.PI/180.0);
  var y = Math.cos(heading*Math.PI/180.0);
  var z = Math.sin(pitch*Math.PI/180.0);

  var len = Math.sqrt(x*x+y*y+z*z);
  if (len != 0) {
    x = x/len;
    y = y/len;
    z = z/len;
  }

  return {"x":x,"y":y,"z":z};
}

var camdir = false
mp.events.add('toggleCamdir', () => {
    camdir = !camdir
});

var charpos = false
mp.events.add('toggleCharpos', () => {
    charpos = !charpos
});

mp.events.add('render', () => {
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
    const dir = getCameraDirection();
    mp.game.graphics.drawText(`X:${dir.x}    Y:${dir.y}    Z:${dir.z}`, [0.5, 0.05],
    {
      font: 4,
      color: [255, 255, 255, 255],
      scale: [1.0, 1.0],
      outline: true
    });
  }
});

var noclip = false
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
      const dir = getCameraDirection();
      mp.players.local.setCoordsNoOffset(pos.x+dir.x,pos.y+dir.y,pos.z+dir.z, false, false, false);
    }
    if (mp.keys.isDown(0x53) === true) {
      const pos = mp.players.local.position;
      const dir = getCameraDirection();
      mp.players.local.setCoordsNoOffset(pos.x-dir.x,pos.y-dir.y,pos.z-dir.z, false, false, false);
    }
  }
});
