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
      else if (cfg.basics.whitelist && !user.whitelisted) {
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
    player.call('removeWeapons');
    player.spawn(cfg.basics.spawn[Math.floor(Math.random() * cfg.basics.spawn.length)]);
    db.characters.removeAllWeapons(player);
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
        for(pos of item.positions){
          if(!item.blip.hidden){
            mp.blips.new(item.blip.sprite, pos, {
              name: item.blip.name,
              scale: item.blip.scale,
              color: item.blip.color,
              alpha: item.blip.alpha,
              drawDistance: item.blip.distance,
              shortRange: item.blip.range,
              rotation: item.blip.rotation,
              dimension: 0
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
    if (inRange[player] == null){
      for (file in cfg){
        for (cfg_id in cfg[file]){
          let item = cfg[file][cfg_id];
          if(item != null){
            if(item.action != null && item.action != []){
              if((typeof item.action[0]) === "string"){
                if(item.positions != null){
                  for(pos of item.positions){
                    item.pos = pos;
                    dist = player.dist(pos)
                    if (dist < item.text.range || dist < item.marker.range){
                      player.call('addInRangeItem', [JSON.stringify(item), file, cfg_id]);
                      inRange[player] = pos;
                    }
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

mp.events.add('removeInRangeItem', (player) => {
  inRange[player] = null;
});
