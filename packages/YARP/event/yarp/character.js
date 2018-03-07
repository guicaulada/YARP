mp.events.add('yarp_createCharacter', (player, id, age, sex, faceJson) => {
  let character = yarp.characters[id];
  if(character == null){
    character = new yarp.Character(id, player.socialClub, age, sex, JSON.parse(faceJson));
    character.save();
    player.call('yarp_characterCreatedSuccessfully');
    player.call('yarp_showPlayerCharacters', [JSON.stringify(character.user.characters)]);
  } else {
    player.call('yarp_characterNameDuplicated');
  }
});

mp.events.add('yarp_changeCharacterSex', (player, sex) => {
  player.model = mp.joaat(sex);
});

mp.events.add('yarp_setCharacterIntoCreator', (player) => {
  player.position = {"x" : 152.5, "y" : -1001.25, "z" : -99.5};
  player.heading = 180;
});

mp.events.add('yarp_loadCharacter', (player,id) => {
  let character = yarp.characters[id];
  let lastLogin = character.lastLogin.split(" ");
  if (lastLogin[2]){
    player.notify(`Last connection from ~g~${lastLogin[0]}~w~ at ~g~${lastLogin[1]} ${lastLogin[2]}`);
  }
  character.updateLastLogin(player.ip);
  character.save();
  player.outputChatBox("!{green}Welcome to Sighmir's YARP Server.");
  player.model = character.model;
  player.name = character._id;
  player.position = character.position;
  player.heading = character.heading;
  player.health = character.health;
  player.armour = character.armour;
  for (weapon in character.weapons){
    player.giveWeapon(Number(weapon), Number(character.weapons[weapon]));
  }
  player.setVariable('PLAYER_WALLET', character.wallet);
  player.setVariable('PLAYER_BANK', character.bank);
  player.call('yarp_updatePlayerCustomSkin',[player,JSON.stringify(character.face), JSON.stringify(character.decoration)]);
});

mp.events.add('yarp_updateWeaponAmmo', (player, weaponHash, amount) => {
  if (!db.characters.updateWeaponAmmo(player, weaponHash, amount)){
    player.outputChatBox("!{red}You shot more bullets than you currently have.");
    setTimeout(function(){
      player.kick("You shot more bullets than you currently have.");
    },1000);
  }
});

setInterval(function(){
  mp.players.forEach(
		(player, id) => {
      if ((player.position.x && player.position.y && player.position.z && player.health) != 0) {
        let character = yarp.characters[player.name];
        if (character) {
          character.position = player.position;
          character.heading = player.heading;
          character.health = player.health;
          character.armour = player.armour;
          character.save();
        }
      }
		}
	);
},1000*yarp.configs.save_interval.value);
