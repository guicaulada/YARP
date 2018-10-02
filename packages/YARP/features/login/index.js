'use strict';

yarp.server.loginPlayer = (player) => {
  player.name = player.socialClub;
  yarp.log.info(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
  yarp.client.setWorldTime(player, {h: mp.world.time.hour, m: mp.world.time.minute, s: mp.world.time.second});
  let user = yarp.users[player.socialClub];
  if (!user) {
    yarp.server.openLoginMenu(player);
    return;
  }
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
    yarp.server.openLoginMenu(player);
  }
};

yarp.server.openLoginMenu = (player) => {
  let menu = new yarp.Menu({id: 'Login Panel', size: [9, 9]});
  menu.items = [
    {
      type: 'panel',
      x: 3,
      y: 3,
      width: 3,
      height: 1,
      text: (yarp.users[player.socialClub] != null) ? 'Login Panel' : 'Registrarion Panel',
      backgroundColor: [0, 0, 0, 100],
    },
    {
      type: 'input',
      x: 3,
      y: 4,
      width: 3,
      height: 1,
      text: player.socialClub,
      maxLength: 25,
      backgroundColor: [0, 0, 0, 100],
      backgroundHoverColor: [255, 255, 51, 100],
      backgroundColorDisabled: [0, 0, 0, 100],
      textColorDisabled: [255, 255, 255, 255],
      backgroundTextFieldColorDisabled: [230, 230, 230, 255],
      disabled: true,
    },
    {
      type: 'input',
      x: 3,
      y: 5,
      width: 3,
      height: 1,
      maxLength: 25,
      masked: true,
      backgroundColor: [0, 0, 0, 100],
      backgroundHoverColor: [255, 255, 51, 100],
    },
    {
      type: 'button',
      x: 3,
      y: 6,
      width: 3,
      height: 1,
      text: (yarp.users[player.socialClub] != null) ? 'Login' : 'Register',
      data: {login: true},
      backgroundColor: [0, 0, 0, 100],
      backgroundHoverColor: [255, 255, 51, 100],
    },
  ];
  menu.build(player);
  menu.open(player);
};

yarp.server.loginItemClicked = async (player, data) => {
  if (data._index === 3 && data.login === true) {
    let inputs = await yarp.menus['Login Panel'].getItemsByIndex(player, [1, 2]);
    yarp.menus['Login Panel'].close(player);
    yarp.server.verifyLogin(player, inputs[2].inputText);
  }
};

/**
 *Verify user login.
 * @function verifyLogin
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} password User password.
 */
yarp.server.verifyLogin = (player, password) => {
  if (password.length > 5) {
    let user = yarp.users[player.socialClub];
    if (user == null) {
      user = new yarp.User({id: player.socialClub, password: bcrypt.hashSync(password, 10)});
      user.giveGroup(yarp.variables['Default Group'].value);
    }
    if (user.verifyPassword(password)) {
      player.user = user;
      user.player = player;
      user.updateLastLogin(player.ip);
      user.save();
      if (Object.keys(user.characters).length == 0) {
        yarp.client.showCharacterCreationMenu(player);
      } else {
        yarp.server.showPlayerCharacters(player);
      }
      return;
    }
  }
  yarp.menus['Login Panel'].addAt(4, {
    type: 'panel',
    x: 3,
    y: 2,
    width: 3,
    height: 1,
    text: (password.length <= 5) ? 'Your password must have at least 5 characters' : 'Invalid password',
    backgroundColor: [237, 82, 73, 100],
  });
  yarp.menus['Login Panel'].build(player);
  yarp.menus['Login Panel'].open(player);
};
