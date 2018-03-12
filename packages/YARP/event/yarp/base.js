
mp.events.add('yarp_runServerCode', (player, code) => {
  if (yarp.users[player.socialClub].hasPermission("cmd.code") || yarp.users[player.socialClub].isDev()){
    eval(code);
  }
});

mp.events.add('yarp_createGamemodeObject', (player, Class, object) => {
  if (yarp.users[player.socialClub].hasPermission("cmd.new") || yarp.users[player.socialClub].isDev()){
    console.log(Class+object);
    new yarp[Class](JSON.parse(object)).save();
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
    player.call('yarp_showLoginMenu');
  }
});
