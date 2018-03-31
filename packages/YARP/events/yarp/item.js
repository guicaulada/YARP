'use strict';
/**
* @file Item events
*/

mp.events.add('restoreHunger', (player, value) => {
  let character = yarp.characters[player.name];
  let hunger = character.hunger-value[0];
  if (hunger > 0) {
    character.hunger = hunger;
  } else {
    character.hunger = 0;
    player.health += hunger;
  }
});

mp.events.add('restoreThirst', (player, value) => {
  let character = yarp.characters[player.name];
  let thirst = character.thirst-value[0];
  if (thirst > 0) {
    character.thirst = thirst;
  } else {
    character.thirst = 0;
    player.health += thirst;
  }
});
