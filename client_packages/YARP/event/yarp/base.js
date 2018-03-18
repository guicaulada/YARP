var inRangeItems = {};
var closestText = {};
var closestMarker = {};
var spawnedNpcs = {};

mp.events.add('yarp_setWorldTime', (jtime) => {
  let time = JSON.parse(jtime);
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
  mp.game.time.setClockTime(time.h, time.m, time.s);
});

mp.events.add('yarp_runServerCode', (code) => {
  mp.events.callRemote('yarp_runServerCode', code)
});

mp.events.add('yarp_runClientCode', (code) => {
  eval(code);
});
