'use strict';
/**
* @file Gamemode events
*/

mp.events.add('setWorldTime', (jtime) => {
  let time = JSON.parse(jtime);
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
  mp.game.time.setClockTime(time.h, time.m, time.s);
});

mp.events.add('runServerCode', (code) => {
  mp.events.callRemote('runServerCode', code)
});

mp.events.add('runClientCode', (code) => {
  eval(code);
});

let keybinds = {};
mp.events.add('playerBindKey', (id,key) => {
  if ((typeof key) === 'string') key = yarp.utils.virtualKeys[key.toUpperCase()];
  keybinds[id] = {
    key: key,
    call: () => {
      mp.events.callRemote('playerBoundKeyPressed', id)
    }
  }
  mp.keys.bind(keybinds[id].key, false, keybinds[id].call);
});

mp.events.add('playerUnbindKey', (id) => {
  mp.keys.unbind(keybinds[id].key, false, keybinds[id].call);
});

mp.events.add('playerOpenDoor', (doorJson) => {
  let door = JSON.parse(doorJson);
  mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, false, 0.0, 50.0, 0.0);
});

mp.events.add('playerCloseDoor', (doorJson) => {
  let door = JSON.parse(doorJson);
  mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, true, 0.0, 50.0, 0.0);
});
