
mp.events.add('yarp_runServerCode', (player, code) => {
  if (yarp.users[player.socialClub].hasPermission("cmd.code") || yarp.users[player.socialClub].isDev()){
    eval(code);
  }
});

mp.events.add('yarp_verifyLogin', (player,password) => {
  let user = yarp.users[player.socialClub]
  if(user == null){
    user = new yarp.User(player.socialClub,password);
  }
  if (user.verifyPassword(password)) {
    user.updateLastLogin(player.ip);
    user.save();
    if(Object.keys(user.characters).length == 0){
      player.call('yarp_showCharacterCreationMenu');
    } else {
      player.call('yarp_showPlayerCharacters', [JSON.stringify(user.characters)]);
    }
  } else {
    player.call('createBrowser', ["menu", ['package://YARP/ui/html/accountLogin.html']]);
  }
});

mp.events.add('yarp_callLabel', (player, id) => {
  (eval(yarp.labels[id].call))(player);
});
