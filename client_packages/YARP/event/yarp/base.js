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

let label = 0;
mp.events.add('enterLabel', (id,key) => {
  label = key;
  mp.keys.bind(key, false, () => {
    mp.events.callRemote('callLabel', id);
  });
});

mp.events.add('leaveLabel', (id,key) => {
  mp.keys.unbind(label, false);  //unbind it
});
