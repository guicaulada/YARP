'use strict';

let openStores = {};

/**
 * Open store menu.
 * @event openStoreMenu
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} location Store location.
 * @param {Object} options Store options.
 */
yarp.server.openStoreMenu = (player, location, options) => {
  if (!options) options = {};
  let sale = location.sale;
  let menu = new yarp.Menu({
    id: location.id,
    title: yarp.utils.server.default(options.title, 'Store'),
    subtitle: yarp.utils.server.default(options.subtitle, 'Welcome, buy your shit and get out!'),
    offset: yarp.utils.server.default(options.offset, [1450, 450]),
  });

  for (let category in sale) {
    if (sale.hasOwnProperty(category)) {
      menu.items.push({
        text: category,
        description: `Buy ${category.toLowerCase()} items.`,
        _meta: {storeId: location.id, storeType: 'common'},
      });
    }
  }

  menu.create(player);
  openStores[player.name] = {total: 0, received: {}};
  yarp.hotkeys['Open Menu'].bind(player, [menu]);
};

/**
 * Closes store menu.
 * @event closeStoreMenu
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} location Store location.
 */
yarp.server.closeStoreMenu = (player, location) => {
  if (yarp.menus[location.id]) {
    yarp.menus[location.id].close(player);
    for (let category in location.sale) {
      if (location.sale.hasOwnProperty(category)) {
        if (yarp.menus[category]) {
          yarp.menus[category].close(player);
          player.notify('Paid ~r~$' + openStores[player.name].total);
          for (let item in openStores[player.name].received) {
            if (openStores[player.name].received.hasOwnProperty(item)) {
              let amount = openStores[player.name].received[item];
              player.notify('Received ~g~' + amount + ' ' + item);
            }
          }
          delete openStores[player.name];
        }
      }
    }
  }
  yarp.hotkeys['Open Menu'].unbind(player);
};

/**
 * Called when item is selected on native menu.
 * @event menuItemSelect
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemSelect = (player, menuId, data) => {
  let item = data.item;
  if (item._meta.storeType == 'common' && item._meta.storeId) {
    let storeId = item._meta.storeId;
    let location = yarp.locations[storeId];
    if (location) {
      let sale = location.sale;
      if (sale[item.text]) {
        let categoryMenu = new yarp.Menu({
          id: item.text,
          subtitle: 'Pick your ' + item.text.toLowerCase(),
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
                _meta: {itemId: saleItem.id, storeId: location.id, categoryId: item.text, storeType: 'common'},
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
};

/**
 * Called when item is selected on native menu.
 * @event menuItemSelect
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemSelect = (player, menuId, data) => {
  let item = data.item;
  if (item._meta.storeType == 'common' && item._meta.itemId && item._meta.storeId && item._meta.categoryId) {
    let storeId = item._meta.storeId;
    let location = yarp.locations[storeId];
    if (location) {
      let categoryId = item._meta.categoryId;
      let sale = location.sale;
      if (sale[categoryId]) {
        let itemId = item._meta.itemId;
        let saleItem = sale[categoryId][itemId];
        let character = yarp.characters[player.name];
        if (character.tryFullPayment(saleItem.price)) {
          location.inventory[itemId].amount -= 1;
          character.giveItem(yarp.items[itemId], 1);
          character.save();

          openStores[player.name].total += saleItem.price;
          if (!openStores[player.name].received[item.text]) {
            openStores[player.name].received[item.text] = 1;
          } else {
            openStores[player.name].received[item.text] += 1;
          }
        }
      }
    }
  }
};
