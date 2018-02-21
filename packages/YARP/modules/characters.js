var cfg = require('../exports/config.js');
var db = require('../exports/database.js');
var utils = require('../exports/utils.js');

//Character creation
mp.events.add('createCharacter', (player, name, age, sex, jface) => {
  var character = db.characters.tryCreateCharacter(player,name,age,sex,jface);
  if(character != null){
    player.call('characterCreatedSuccessfully');
    var characters = db.characters.getPlayerCharacters(player);
    player.call('showPlayerCharacters', [JSON.stringify(characters)]);
  } else {
    player.call('characterNameDuplicated');
  }
});

mp.events.add('changeCharacterSex', (player, sex) => {
  player.model = mp.joaat(sex);
});

mp.events.add('setCharacterIntoCreator', (player) => {
  player.position = {"x" : 152.5, "y" : -1001.25, "z" : -99.5};
  player.heading = 180;
});

mp.events.add('loadCharacter', (player, jchar) => {
  var character = JSON.parse(jchar);
  player.notify(`Last connection from ~g~${character.lastLogin.ip}~w~ at ~g~${character.lastLogin.date}`);
  player.outputChatBox("!{green}Welcome to Sighmir's YARP Server.");
  player.model = character.model;
  player.name = character.name;
  player.position = { "x" : character.position.x, "y" : character.position.y, "z" : character.position.z };
  player.heading = character.position.h;
  player.health = character.health;
  player.armour = character.armour;
  for (weapon in character.weapons){
    player.giveWeapon(Number(weapon), Number(character.weapons[weapon]));
  }
  player.setVariable('PLAYER_WALLET', character.wallet);
  player.setVariable('PLAYER_BANK', character.bank);
  player.call('setWeaponsConfig', [JSON.stringify(cfg.weapons)]);
  player.call('updatePlayerCustomSkin',[player,JSON.stringify(character.face), JSON.stringify(character.decoration)]);
});

mp.events.add('updateWeaponAmmo', (player, weaponHash, amount) => {
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
      if((player.position.x && player.position.y && player.position.z) != 0){
        var character = {};
        character.name = player.name;
        character.position = { "x" : player.position.x, "y" : player.position.y, "z" : player.position.z, "h" : player.heading};
        character.health = player.health;
        character.armour = player.armour;
        db.characters.updateCharacterWorldData(character);
      }
		}
	);
},1000*cfg.base.save_interval);
