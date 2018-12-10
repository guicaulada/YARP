'use strict';
/**
 * Inventory menu events
 * @memberof yarp.server
 */

yarp.server.openCharacterInventory = (player, character) => {
  let menu = new yarp.Menu({
    id: 'inventory' + character.id,
    title: ['Inventory'],
    offset: [0.1, 0.15],
  });

  let i = 0;
  for (let itemId in character.inventory) {
    if (character.inventory.hasOwnProperty(itemId)) {
      let item = yarp.items[itemId];
      let submenu = {
        type: 'submenu',
        id: 'inventory' + item.name,
        displayText: character.inventory[itemId] + ' - ' + item.name,
        caption: character.default(item.caption, ''),
        items: [],
      };

      let o = 0;
      let playerOptions = item.options(player, 'inventory');
      for (let option in playerOptions) {
        if (playerOptions.hasOwnProperty(option)) {
          submenu.items.push({
            type: 'text',
            displayText: option,
            caption: option + ` item`,
            data: {itemId: item.id, option: option, index: o, itemIndex: i},
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
 * Called when inventory item is clicked on native menu.
 * @function menuItemClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} data Data representing the event.
 */
yarp.server.inventoryItemClicked = (player, data) => {
  let character = player.character;
  let item = yarp.items[data.itemId];
  if (item && character) {
    let option = item.options(player, 'inventory')[data.option];
    if (option) {
      option(player);
    }
    let amount = character.inventory[item.id];
    let submenu = {
      type: 'submenu',
      id: 'inventory' + item.name,
      displayText: amount + ' - ' + item.name,
      caption: yarp.utils.server.default(item.caption, ''),
      items: [],
    };
    let i = 0;
    let playerOptions = item.options(player, 'inventory');
    for (let option in playerOptions) {
      if (playerOptions.hasOwnProperty(option)) {
        submenu.items.push({
          type: 'text',
          displayText: option,
          caption: option + ` item`,
          data: {itemId: item.id, option: option, index: i, itemIndex: data.itemIndex, _menuId: 'inventory' + item.name},
        });
        i++;
      }
    }
    if (amount) {
      yarp.menus['inventory' + character.id].updateItem(player, data.itemIndex, submenu);
    } else {
      yarp.menus['inventory' + character.id].removeItem(player, data.itemIndex);
    }
  }
};

yarp.server.closeCharacterInventory = (player, character) => {
  yarp.menus['inventory' + character.id].close(player);
};


yarp.server.toggleCharacterInventory = (player, character) => {
  if (!yarp.menus['inventory' + character.id] || !yarp.menus['inventory' + character.id].isVisible(player)) {
    character.openInventory();
  } else {
    character.closeInventory();
  }
};
