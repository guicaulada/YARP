
mp.events.add('yarp_runServerCode', (player, code) => {
  if (yarp.configs.admins.value.indexOf(player.socialClub) > -1){
    eval(code);
  }
});
