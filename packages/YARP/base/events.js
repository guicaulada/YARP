var db = require('./database.js');
let cfg = require('../config.json');
let spawnPoints = require('./spawn_points.json').SpawnPoints;

mp.events.add('playerDeath', (player) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});

mp.events.add('playerJoin', (player) => {
    console.log(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
    var user = db.loginUser(player);
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
      player.notify(`Last connection from ~g~${user.last_login.ip}~w~ at ~g~${user.last_login.date}`);
      player.outputChatBox("!{green}Welcome to Sighmir's YARP Server.");
      //player.call('characterSelection', [JSON.stringify(user)]);
    }
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
