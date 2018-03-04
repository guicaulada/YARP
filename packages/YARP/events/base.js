mp.events.add('playerJoin', (player) => {
    console.log(`${player.name}(${player.socialClub}/${player.ip}) joined.`);
    var user = db.users.getUserByPlayer(player);
    if(user != null){
      if (user.banned) {
        player.outputChatBox("!{red}You have been banned.");
        console.log(`${player.socialClub} is banned.`);
        setTimeout(function(){
          player.kick("You have been banned.");
        },1000);
      }
      else if (cfg.base.whitelist && !user.whitelisted) {
        player.outputChatBox("!{yellow}You are not whitelisted.");
        console.log(`${player.socialClub} is not whitelisted.`);
        setTimeout(function(){
          player.kick("You are not whitelisted.");
        },1000);
      }
      else {
        player.call('showAuthenticationMenu', [JSON.stringify(user),JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
      }
    }
    else {
      user = {socialClub: player.socialClub};
      player.call('showAuthenticationMenu', [JSON.stringify(user),JSON.stringify({h:mp.world.time.hour, m:mp.world.time.minute, s:mp.world.time.second})]);
    }
});

mp.events.add('playerDeath', (player) => {
    player.call('removeWeapons');
    player.spawn(cfg.base.spawn[Math.floor(Math.random() * cfg.base.spawn.length)]);
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
  console.log(`${player.name}: ${message}`);
	mp.players.broadcast(`${player.name}: ${message}`);
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

inRangeItems = {};
setInterval(function(){
  mp.players.forEach((player, i) => {
    if (inRangeItems[player] == null){
      inRangeItems[player] = {};
    }
    for (file in cfg){
      for (id in cfg[file]){
        if (inRangeItems[player][file+id] == null){
          let item = cfg[file][id];
          if(item != null){
            if(item.positions != null){
              for(pos of item.positions){
                if (inRangeItems[player][file+id] == null){
                  item.pos = pos;
                  dist = player.dist(pos)
                  if (inRangeItems[player][file+id] == null){
                    for (text of item.texts) {
                      if (dist < text.distance){
                        inRangeItems[player][file+id] = pos;
                      }
                    }
                  }
                  if (inRangeItems[player][file+id] == null){
                    for (marker of item.markers) {
                      if (dist < marker.distance){
                        inRangeItems[player][file+id] = pos;
                      }
                    }
                  }
                  if (inRangeItems[player][file+id] == null){
                    for (npc of item.npcs) {
                      if (dist < npc.distance){
                        inRangeItems[player][file+id] = pos;
                      }
                    }
                  }
                  if (inRangeItems[player][file+id] != null){
                    //console.log(`${player.name} has entered ${id}(${file})`);
                    inRangeItems[player][file+id] = pos;
                    player.call('addInRangeItem', [JSON.stringify(item), file, id]);
                  }
                } else {
                  break;
                }
              }
            }
          }
        } else {
          break;
        }
      }
    }
  });
},500);

mp.events.add('removeInRangeItem', (player, file, id) => {
  inRangeItems[player][file+id] = null;
});
