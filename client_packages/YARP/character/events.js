mp.events.add('characterSelection', (juser) => {
  var user = JSON.parse(juser);
  mp.game.graphics.notify('~r~Under development!');
  mp.players.local.freezePosition(false);
  mp.players.local.setCoords(-18.4206,-1439.0106,30.1015, true, false, false, true);
  mp.players.local.freezePosition(true);
  if (user.characters.length == 0){
    mp.events.call('characterCreation', juser)
  } else {
    mp.game.graphics.notify('~b~*Character selection menu*');
  }
});

mp.events.add('characterCreation', (juser) => {
  var user = JSON.parse(juser);
  mp.game.graphics.notify('~b~*Character creation menu*');
});
