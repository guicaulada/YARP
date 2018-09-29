'use strict';
/**
 * Inventory menu events
 * @memberof yarp.server
 */

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
    character.takeItem(item, 1);
    let amount = character.inventory[item.id];
    if (amount > 0) {
      let submenu = {
        type: 'submenu',
        id: 'inventory' + item.name,
        displayText: amount + ' - ' + item.name,
        caption: yarp.utils.server.default(item.caption, ''),
        data: [],
      };
      let i = 0;
      for (let option in item.options) {
        if (item.options.hasOwnProperty(option)) {
          submenu.data.push({
            type: 'text',
            displayText: option,
            caption: option + ` item`,
            data: {itemId: item.id, option: option, index: i, itemIndex: data.itemIndex},
          });
          i++;
        }
      }
      yarp.menus['inventory' + character.id].updateItem(player, data.itemIndex, submenu);
    } else {
      yarp.menus['inventory' + character.id].removeItem(player, data.itemIndex);
    }
    item.options[data.option](player);
  }
};
