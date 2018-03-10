
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
