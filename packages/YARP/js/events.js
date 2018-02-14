var cfg = require('./config.js');
var utils = require(`./utils.js`);
var db = require('./database.js');

mp.events.add('playerJoin', (player) => {
    console.log(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
    var user = db.USERS.getUserByPlayer(player);
    if(user != null){
      if (user.banned) {
        player.outputChatBox("!{red}You have been banned.");
        setTimeout(function(){
          player.kick("You have been banned.");
        },1000);
      }
      else if (cfg.whitelist && !user.whitelisted) {
        player.outputChatBox("!{yellow}You are not whitelisted.");
        setTimeout(function(){
          player.kick("You are not whitelisted.");
        },1000);
      }
      else {
        player.call('showAuthenticationMenu', [JSON.stringify(user),JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
      }
    }
    else {
      user = {social_club: player.socialClub};
      player.call('showAuthenticationMenu', [JSON.stringify(user),JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
    }
});

mp.events.add('playerDeath', (player) => {
    player.spawn(cfg.spawn[Math.floor(Math.random() * cfg.spawn.length)]);
    player.health = 100;
});

mp.events.add('playerQuit', (player, exitType, reason) => {
  if (exitType != "kicked") {
    var str = `${player.name}(${player.socialClub}/${player.ip}) quit. (${exitType})`;
  } else {
    var str = `${player.name}(${player.socialClub}/${player.ip}) kicked. Reason: ${reason} (${exitType})`;
  }
  console.log(str);
});

mp.events.add('playerChat', (player, message) => {
	 mp.players.broadcast(`${player.name}: ${message}`);
});

//Login events
mp.events.add('verifyAuthentication', (player,password) => {
  var user = db.USERS.verifyAuthentication(player, password);
  if(user != null){
    var characters = db.CHARACTERS.getPlayerCharacters(player);
    if(characters.length == 0){
      player.call('showCharacterCreationMenu');
    } else {
      player.call('showPlayerCharacters', [JSON.stringify(characters)]);
    }
  } else {
    player.call('showAuthenticationMenu', [JSON.stringify(user),JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
  }
});

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
  var user = db.USERS.activatePlayerCharacter(player, character);
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
