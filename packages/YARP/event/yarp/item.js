mp.events.add('restoreHunger', (player, value) => {
  if (player.health+value[0] < 100) {
    player.health = player.health + value[0]
  } else {
    player.health = 100;
  }
});

mp.events.add('restoreThirst', (player, value) => {
  if (player.health+value[0] < 100) {
    player.health = player.health + value[0]
  } else {
    player.health = 100;
  }
});
