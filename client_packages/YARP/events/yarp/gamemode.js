'use strict';
/**
* @file Gamemode events
* @namespace client.gamemode
*/

let keybinds = {};

/**
 * Sets the world time in game.
 * @event setWorldTime
 * @memberof client.gamemode
 * @param {string} jtime - JSON string with h, m, s.
 */
mp.events.add('setWorldTime', (jtime) => {
  let time = JSON.parse(jtime);
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
  mp.game.time.setClockTime(time.h, time.m, time.s);
});

/**
 * Executes code on the server.
 * @event runServerCode
 * @memberof client.gamemode
 * @param {string} code - The code to be executed.
 * @fires runServerCode
 */
mp.events.add('runServerCode', (code) => {
  mp.events.callRemote('runServerCode', code)
});

/**
 * Executes code on the client.
 * @event runClientCode
 * @memberof client.gamemode
 * @param {string} code - The code to be executed.
 * @fires runClientCode
 */
mp.events.add('runClientCode', (code) => {
  eval(code);
});

/**
 * Binds a key.
 * @event playerBindKey
 * @memberof client.gamemode
 * @param {string} id - The id of the keybind.
 * @param {string} key - The virtual key code.
 * @fires playerBoundKeyPressed
 */
mp.events.add('playerBindKey', (id,key) => {
  if (keybinds[id]) {
    mp.keys.unbind(keybinds[id].key, false, keybinds[id].call);
    keybinds[id] = null;
  }
  if ((typeof key) === 'string') key = yarp.utils.getVirtualKeys()[key.toUpperCase()];
  keybinds[id] = {
    key: key,
    call: () => {
      mp.events.callRemote('playerBoundKeyPressed', id)
    }
  }
  mp.keys.bind(keybinds[id].key, false, keybinds[id].call);
});

/**
 * Unbind a key.
 * @event playerUnbindKey
 * @memberof client.gamemode
 * @param {string} id - The id of the keybind.
 */
mp.events.add('playerUnbindKey', (id) => {
  if (keybinds[id]) {
    mp.keys.unbind(keybinds[id].key, false, keybinds[id].call);
    keybinds[id] = null;
  }
});

/**
 * Open a door.
 * @event playerOpenDoor
 * @memberof client.gamemode
 * @param {string} doorJson - Door data in JSON.
 */
mp.events.add('playerOpenDoor', (doorJson) => {
  let door = JSON.parse(doorJson);
  mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, false, 0.0, 50.0, 0.0);
});

/**
 * Close a door.
 * @event playerCloseDoor
 * @memberof client.gamemode
 * @param {string} doorJson - Door data in JSON.
 */
mp.events.add('playerCloseDoor', (doorJson) => {
  let door = JSON.parse(doorJson);
  mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, true, 0.0, 50.0, 0.0);
});
