'use strict';

yarp.server.loginPlayer = (player) => {
  player.name = player.socialClub;
  yarp.log.info(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
  yarp.client.setWorldTime(player, {h: mp.world.time.hour, m: mp.world.time.minute, s: mp.world.time.second});
  let user = yarp.users[player.socialClub];
  if (user != null) {
    if (user.banned) {
      player.outputChatBox('!{red}You have been banned.');
      yarp.log.info(`${player.socialClub} is banned.`);
      setTimeout(() => {
        player.kick('You have been banned.');
      }, 1000);
    } else if (yarp.variables['Whitelisted'].value && !user.whitelisted) {
      player.outputChatBox('!{yellow}You are not whitelisted.');
      yarp.log.info(`${player.socialClub} is not whitelisted.`);
      setTimeout(() => {
        player.kick('You are not whitelisted.');
      }, 1000);
    } else {
      yarp.server.openLoginPrompt(player); // yarp.client.createBrowser(player, 'menu', ['package://YARP/ui/html/accountLogin.html'], true, true);
    }
  } else {
    yarp.client.createBrowser(player, 'menu', ['package://YARP/ui/html/accountRegister.html', 'setAccountName', player.socialClub], true, true);
  }
};

yarp.server.openLoginPrompt = (player) => {
  let prompt = {title: 'Login Prompt', size: [16, 16]};
  prompt.items = [
    {
      type: 'panel',
      x: 11,
      y: 11,
      width: 4,
      height: 1,
      text: 'Login Panel',
    },
    {
      type: 'input',
      x: 11,
      y: 12,
      width: 4,
      height: 1,
      text: 25,
    },
    {
      type: 'input',
      x: 11,
      y: 13,
      width: 4,
      height: 1,
      text: 25,
      masked: true,
    },
    {
      type: 'button',
      x: 11,
      y: 14,
      width: 2,
      height: 1,
      text: 'Login',
    },
  ];
  yarp.client.createPrompt(player, 'login', prompt);
  yarp.client.openMenu(player, 'login');
};
