'use strict';
/**
 * Character events
 * @memberof yarp.server
 */

/**
 * Create character event.
 * @function createCharacter
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} id Character id.
 * @param {Number} age Character age.
 * @param {String} model Character model.
 * @param {String} face Character face.
 */
yarp.server.createCharacter = (player, id, age, model, face) => {
  let character = yarp.characters[id];
  if (character == null) {
    character = new yarp.Character({id: id, socialClub: player.socialClub, age: age, model: model, face: face});
    character.save();
    yarp.client.characterCreatedSuccessfully(player);
    yarp.client.showPlayerCharacters(player, character.user.characters);
  } else {
    yarp.client.characterNameDuplicated(player);
  }
};

/**
 * Change character model event.
 * @function changeCharacterModel
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} model Character model.
 */
yarp.server.changeCharacterModel = (player, model) => {
  player.model = mp.joaat(model);
};

/**
 * Set character into creator event.
 * @function setCharacterIntoCreator
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 */
yarp.server.setCharacterIntoCreator = (player) => {
  player.position = new mp.Vector3(152.5, -1001.25, -99.5);
  player.heading = 180;
};

/**
 * Load character event.
 * @function loadCharacter
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} id Character id.
 */
yarp.server.loadCharacter = (player, id) => {
  let character = yarp.characters[id];
  player.character = character;
  character.player = player;
  character.user = player.user;
  player.user.character = character;
  let lastLogin = character.lastLogin.split(' ');
  if (lastLogin[2]) {
    player.notify(`Last connection from ~g~${lastLogin[0]}~w~ at ~g~${lastLogin[1]} ${lastLogin[2]}`);
  }
  character.updateLastLogin(player.ip);
  character.save();
  player.outputChatBox('!{green}Welcome to Sighmir\'s YARP ');
  player.model = character.model;
  player.name = character._id;
  player.position = character.position;
  player.heading = character.heading;
  player.health = character.health;
  player.armour = character.armour;
  for (let id in character.weapons) {
    if (character.weapons.hasOwnProperty(id)) {
      player.giveWeapon(mp.joaat(id), character.weapons[id]);
      yarp.client.equipWeapon(player, yarp.weapons[id]);
    }
  }
  character.user.enter();
  character.enter();
  player.setVariable('PLAYER_HUNGER', character.hunger);
  player.setVariable('PLAYER_THIRST', character.thirst);
  player.setVariable('PLAYER_WALLET', character.wallet);
  player.setVariable('PLAYER_BANK', character.bank);
  player.setVariable('PLAYER_XP', character.xp);
  // character.loadCustomization();

  yarp.hotkeys['Inventory'].bind(player);

  if (character.user.hasPermission('menu.testmenu')) {
    yarp.hotkeys['Toggle Menu'].bind(player, ['Test Menu']);
    yarp.hotkeys['Test Proxy'].bind(player);
  }

  yarp.menus.forEach((menu) => {
    menu.create(player);
  });
};

yarp.server.characterJoinedGroup = (player, character, group) => {};
yarp.server.characterLeftGroup = (player, character, group) => {};
yarp.server.userLeftGroup = (player, character, group) => {};
yarp.server.userJoinedGroup = (player, character, group) => {};
