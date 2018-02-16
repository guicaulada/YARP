var cfg = require('../exports/config.js');
var db = require('../exports/database.js');

mp.events.add('playerJoin', (player) => {
    console.log(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
    var user = db.users.getUserByPlayer(player);
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
    player.spawn(cfg.basics.spawn[Math.floor(Math.random() * cfg.basics.spawn.length)]);
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

mp.events.add('verifyAuthentication', (player,password) => {
  var user = db.users.verifyAuthentication(player, password);
  if(user != null){
    var characters = db.characters.getPlayerCharacters(player);
    if(characters.length == 0){
      player.call('showCharacterCreationMenu');
    } else {
      player.call('showPlayerCharacters', [JSON.stringify(characters)]);
    }
  } else {
    player.call('showAuthenticationMenu', [JSON.stringify(user),JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
  }
});

for (file in cfg){
  for (id in cfg[file]){
    let item = cfg[file][id];
    if(item != null){
      if(item.blip != null){
        if(!item.blip.hidden){
          for(pos of item.positions){
            mp.blips.new(item.blip.sprite, pos, {
              name: item.blip.name,
              scale: item.blip.scale,
              color: item.blip.color,
              alpha: item.blip.alpha,
              drawDistance: item.blip.distance,
              shortRange: item.blip.range,
              rotation: item.blip.rotation,
              dimension: item.blip.dimension
            });
          }
        }
      }
    }
  }
}

inRange = {};
setInterval(function(){
  mp.players.forEach((player, id) => {
    for (file in cfg){
      for (id in cfg[file]){
        let item = cfg[file][id];
        if(item != null){
          if(item.action != null && item.action != []){
            if((typeof item.action[0]) === "string"){
              if(item.positions != null){
                for(pos of item.positions){
                  item.pos = pos;
                  if (player.dist(pos) < 3){
                    player.call('addInRangeItem', [JSON.stringify(item), file, id]);
                    inRange[player] = pos;
                  } else if (inRange[player] == pos) {
                    player.call('removeInRangeItem');
                    inRange[player] = null;
                  }
                }
              }
            }
          }
        }
      }
    }
  });
},100);
