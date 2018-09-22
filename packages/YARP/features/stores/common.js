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
    offset: yarp.utils.server.default(options.offset, [0, 0]),
  });

  for (let category in sale) {
    if (sale.hasOwnProperty(category)) {
      let submenu = {
        type: 'submenu',
        id: category,
        displayText: category,
        caption: `Buy ${category.toLowerCase()} items.`,
        data: [],
      };

      for (let itemId in sale[category]) {
        if (sale[category].hasOwnProperty(itemId)) {
          let saleItem = sale[category][itemId];
          if (saleItem.amount > 0) {
            submenu.data.push({
              type: 'text',
              displayText: saleItem.price + '$ - ' + saleItem.name,
              caption: `Buy ${saleItem.name} for $${saleItem.price}.`,
              data: {itemId: saleItem.id, storeId: location.id, categoryId: category, storeType: 'common'},
            });
          }
        }
      }
      menu.add(submenu);
    }
  }

  menu.add({
    type: 'close',
    displayText: 'Close',
  });

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
  if (openStores[player.name] != null) {
    if (yarp.menus[location.id] && yarp.menus[location.id].isVisible(player)) {
      yarp.menus[location.id].close(player);
      if (openStores[player.name].total > 0) {
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
    yarp.hotkeys['Open Menu'].unbind(player);
  }
};

/**
 * Called when item is clicked on native menu.
 * @event menuItemClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} type Type of the item.
 * @param {Object} data Data representing the event.
 */
yarp.server.add.menuItemClicked = (player, menuId, type, data) => {
  if (data && data.storeType == 'common' && data.itemId && data.storeId && data.categoryId) {
    let storeId = data.storeId;
    let location = yarp.locations[storeId];
    if (location) {
      let categoryId = data.categoryId;
      let sale = location.sale;
      if (sale[categoryId]) {
        let itemId = data.itemId;
        let saleItem = sale[categoryId][itemId];
        let character = yarp.characters[player.name];
        if (character.tryFullPayment(saleItem.price)) {
          location.inventory[itemId].amount -= 1;
          let item = yarp.items[itemId];
          if (item.isWeapon()) {
            character.giveWeapon(yarp.weapons[item.id]);
          } else if (item.isAmmo()) {
            character.giveAmmo(item.id, 1);
          } else {
            character.giveItem(item, 1);
          }
          location.save();
          character.save();

          openStores[player.name].total += saleItem.price;
          if (!openStores[player.name].received[item.name]) {
            openStores[player.name].received[item.name] = 1;
          } else {
            openStores[player.name].received[item.name] += 1;
          }
        }
      }
    }
  }
};
