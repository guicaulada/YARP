'use strict';
/**
 * @file Character events
 * @namespace server.character
 */

/**
 * Create character event.
 * @event createCharacter
 * @memberof server.character
 * @param {object} player - The player that called the event.
 * @param {string} id - Character id.
 * @param {number} age - Character age.
 * @param {string} model - Character model.
 * @param {string} faceJson - Character face JSON.
 * @fires characterCreatedSuccessfully
 * @fires showPlayerCharacters
 * @fires characterNameDuplicated
 */
mp.events.add('createCharacter', (player, id, age, model, faceJson) => {
  let character = yarp.characters[id];
  if(character == null){
    character = new yarp.Character(id, player.socialClub, age, model, JSON.parse(faceJson));
    character.save();
    player.call('characterCreatedSuccessfully');
    player.call('showPlayerCharacters', [JSON.stringify(character.user.characters)]);
  } else {
    player.call('characterNameDuplicated');
  }
});

/**
 * Change character model event.
 * @event changeCharacterModel
 * @memberof server.character
 * @param {object} player - The player that called the event.
 * @param {string} model - Character model.
 */
mp.events.add('changeCharacterModel', (player, model) => {
  player.model = mp.joaat(model);
});

/**
 * Set character into creator event.
 * @event setCharacterIntoCreator
 * @memberof server.character
 * @param {object} player - The player that called the event.
 */
mp.events.add('setCharacterIntoCreator', (player) => {
  player.position = new mp.Vector3(152.5, -1001.25, -99.5);
  player.heading = 180;
});

/**
 * Load character event.
 * @event loadCharacter
 * @memberof server.character
 * @param {object} player - The player that called the event.
 * @param {string} id - Character id.
 * @fires equipWeapon
 * @fires updatePlayerCustomSkin
 */
mp.events.add('loadCharacter', (player,id) => {
  let character = yarp.characters[id];
  let lastLogin = character.lastLogin.split(" ");
  if (lastLogin[2]){
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
  for (let id in character.weapons){
    player.giveWeapon(mp.joaat(id), character.weapons[id]);
    player.call('equipWeapon', [JSON.stringify(yarp.weapons[id])]);
  }
  character.user.enter();
  character.enter();
  player.setVariable('PLAYER_WALLET', character.wallet);
  player.setVariable('PLAYER_BANK', character.bank);
  player.call('updatePlayerCustomSkin',[player,JSON.stringify(character.face), JSON.stringify(character.decoration)]);
});
