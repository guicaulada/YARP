
exports.getCameraDirection = function(){
  // Credits to https://github.com/ImagicTheCat/vRP/blob/vrpex/vrp/client/base.lua#L46 - Thank you for teaching me so much.
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
};
