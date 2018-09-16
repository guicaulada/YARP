'use strict';

mp.events.add('openStoreMenu', (player, location) => {
  let sale = location.sale;
  let menu = new yarp.Menu({
    id: location.id,
    title: '7/11',
    subtitle: 'Welcome to 7/11, how can I help?',
    offset: [1450, 450],
  });

  for (let category in sale) {
    if (sale.hasOwnProperty(category)) {
      menu.items.push({
        text: category,
        description: `Buy ${category.toLowerCase()} items.`,
      });
    }
  }

  menu.create(player);
  yarp.hotkeys['Open Menu'].bind(player, [menu]);
});

mp.events.add('closeStoreMenu', (player, location) => {
  if (yarp.menus[location.id]) {
    yarp.menus[location.id].close(player);
    for (let category in location.sale) {
      if (location.sale.hasOwnProperty(category)) {
        if (yarp.menus[location.id + ' ' + category]) {
          yarp.menus[location.id + ' ' + category].close(player);
        }
      }
    }
  }
  yarp.hotkeys['Open Menu'].unbind(player);
});

/**
 * Called when item is selected on native menu.
 * @event menuItemSelect
 * @memberof features.common
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} jsonData Json data representing the event.
 */
mp.events.add('menuItemSelect', (player, menuId, jsonData) => {
  let data = JSON.parse(jsonData);
  let item = data.item;
  if (menuId.indexOf('7/11') >= 0) {
    let location = yarp.locations[menuId];
    if (location) {
      let sale = location.sale;
      if (sale[item.text]) {
        let categoryMenu = new yarp.Menu({
          id: location.id + ' ' + item.text,
          subtitle: 'Please choose your ' + item.text.toLowerCase(),
          offset: [1450, 450],
        });

        for (let itemId in sale[item.text]) {
          if (sale[item.text].hasOwnProperty(itemId)) {
            let saleItem = sale[item.text][itemId];
            if (saleItem.amount > 0) {
              categoryMenu.items.push({
                text: saleItem.name,
                description: `Buy ${saleItem.name} for $${saleItem.price}.`,
                rightLabel: '$'+saleItem.price,
                _metadata: {itemId: saleItem.id, storeId: location.id, categoryId: item.text},
              });
            }
          }
        }

        yarp.menus[menuId].close(player);
        categoryMenu.create(player);
        categoryMenu.open(player);
      }
    }
  }
});

/**
 * Called when item is selected on native menu.
 * @event menuItemSelect
 * @memberof features.common
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} jsonData Json data representing the event.
 */
mp.events.add('menuItemSelect', (player, menuId, jsonData) => {
  let data = JSON.parse(jsonData);
  let item = data.item;
  if (item._metadata.itemId && item._metadata.storeId && item._metadata.categoryId) {
    let storeId = item._metadata.storeId;
    let location = yarp.locations[storeId];
    if (location) {
      let categoryId = item._metadata.categoryId;
      let sale = location.sale;
      if (sale[categoryId]) {
        let itemId = item._metadata.itemId;
        let saleItem = sale[categoryId][itemId];
        let character = yarp.characters[player.name];
        if (character.tryFullPayment(saleItem.price)) {
          location.inventory[itemId].amount -= 1;
          character.giveItem(yarp.items[itemId], 1);
          character.save();
          player.notify('Paid ~r~$' + saleItem.price);
          player.notify('Received ~g~' + 1 + ' ' + item.text);
        }
      }
    }
  }
});
