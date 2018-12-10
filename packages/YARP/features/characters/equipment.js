'use strict';
/**
 * Equipment menu events
 * @memberof yarp.server
 */

yarp.server.openCharacterEquipment = (player, character) => {
  let menu = new yarp.Menu({
    id: 'equipment' + character.id,
    title: ['Equipment'],
    offset: [0.1, 0.15],
  });

  let i = 0;
  for (let itemId in character.equipment) {
    if (character.equipment.hasOwnProperty(itemId)) {
      let item = yarp.items[itemId];
      let submenu = {
        type: 'submenu',
        id: 'equipment' + item.name,
        displayText: character.equipment[itemId] + ' - ' + item.name,
        caption: character.default(item.caption, ''),
        items: [],
      };

      let o = 0;
      let playerOptions = item.options(player);
      for (let option in playerOptions) {
        if (playerOptions.hasOwnProperty(option)) {
          submenu.items.push({
            type: 'text',
            displayText: option,
            caption: option + ` item`,
            data: {itemId: item.id, option: option, index: o, itemIndex: i, _menuId: 'equipment' + item.name},
          });
          o++;
        }
      }
      menu.add(submenu);
      i++;
    }
  }

  menu.add({
    type: 'close',
    displayText: 'Close',
  });

  menu.create(player);
  menu.open(player);
};

/**
 * Called when equipment item is clicked on native menu.
 * @function menuItemClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} data Data representing the event.
 */
yarp.server.equipmentItemClicked = (player, data) => {
  let character = player.character;
  let item = yarp.items[data.itemId];
  if (item && character) {
    let option = item.options(player)[data.option];
    if (option) {
      option(player);
    }
    let amount = character.equipment[item.id];
    let submenu = {
      type: 'submenu',
      id: 'equipment' + item.name,
      displayText: amount + ' - ' + item.name,
      caption: yarp.utils.server.default(item.caption, ''),
      items: [],
    };
    let i = 0;
    let playerOptions = item.options(player);
    for (let option in playerOptions) {
      if (playerOptions.hasOwnProperty(option)) {
        submenu.items.push({
          type: 'text',
          displayText: option,
          caption: option + ` item`,
          data: {itemId: item.id, option: option, index: i, itemIndex: data.itemIndex},
        });
        i++;
      }
    }
    if (amount) {
      yarp.menus['equipment' + character.id].updateItem(player, data.itemIndex, submenu);
    } else {
      yarp.menus['equipment' + character.id].removeItem(player, data.itemIndex);
    }
  }
};

yarp.server.closeCharacterEquipment = (player, character) => {
  yarp.menus['equipment' + character.id].close(player);
};


yarp.server.toggleCharacterEquipment = (player, character) => {
  if (!yarp.menus['equipment' + character.id] || !yarp.menus['equipment' + character.id].isVisible(player)) {
    character.openEquipment();
  } else {
    character.closeEquipment();
  }
};
