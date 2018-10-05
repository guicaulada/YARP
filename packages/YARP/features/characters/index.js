'use strict';

yarp.server.showPlayerCharacters = (player) => {
  player.character = null;
  let characters = player.user.characters;
  yarp.client.toClouds(player);
  let menu = new yarp.Menu({id: 'Character List', size: [16, 16], debug: false});
  menu.add({
    type: 'panel',
    x: 12,
    y: 5,
    width: 3,
    height: 1,
    text: 'Character List',
    backgroundColor: [0, 0, 0, 100],
  });

  let i = 0;
  for (let charId in characters) {
    if (characters.hasOwnProperty(charId)) {
      let character = characters[charId];
      menu.add({
        type: 'button',
        x: 12,
        y: 6+i,
        width: 3,
        height: 1,
        text: `${character.id}`,
        data: {charId: charId},
        backgroundColor: [0, 0, 0, 100],
        backgroundHoverColor: [255, 255, 51, 100],
      });
      i++;
    }
  }

  if (i < 5) {
    menu.add({
      type: 'button',
      x: 12,
      y: 6+i,
      width: 3,
      height: 1,
      text: `New Character`,
      data: {newChar: true},
      backgroundColor: [0, 70, 0, 100],
      backgroundHoverColor: [255, 255, 51, 100],
    });
  }

  menu.build(player);
  menu.open(player);
};

yarp.server.add.menuItemClicked = (player, data) => {
  if (data._menuId == 'Character List') {
    yarp.menus[data._menuId].close(player);
    if (data.charId && yarp.characters[data.charId]) {
      yarp.server.loadCharacter(player, data.charId);
      yarp.client.fromClouds(player);
    } else if (data.newChar) {
      yarp.server.showCharacterCreationMenu(player);
    }
  }
};

require('./creator.js');
