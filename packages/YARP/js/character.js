var cfg = require('./config.js');
var db = require('./database.js');

//Character creation
mp.events.add('createCharacter', (player, name, age, sex, jface) => {
  var characters = db.CHARACTERS.createCharacter(player,name,age,sex,jface);
  if(characters != null){
    player.call('characterCreatedSuccessfully');
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
  player.notify(`Last connection from ~g~${character.last_login.ip}~w~ at ~g~${character.last_login.date}`);
  player.outputChatBox("!{green}Welcome to Sighmir's YARP Server.");
  player.model = character.model;
  player.name = character.name;
  player.position = { "x" : character.position.x, "y" : character.position.y, "z" : character.position.z };
  player.heading = character.position.h
  player.health = character.health;
  player.armour = character.armour;
  player.weapons = character.weapons;
  player.call('updatePlayerCustomSkin',[player,JSON.stringify(character.face), JSON.stringify(character.decoration)]);
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
        db.CHARACTERS.updateCharacterWorldData(character);
      }
		}
	);
},1000*cfg.save);
