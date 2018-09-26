'use strict';

let openStores = {};

/**
 * Open store menu.
 * @function openStoreMenu
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} location Store location.
 * @param {Object} options Store options.
 */
yarp.server.openStoreMenu = (player, location, options) => {
  if (!options) options = {};
  openStores[player.name] = {total: 0, received: {}, type: options.type, location: location.id};
  switch (options.type) {
    case 'submenu':
    yarp.server.openSubmenuStore(player, location, options);
    break;
    case 'list':
    yarp.server.openListStore(player, location, options);
    break;
    default:
    yarp.log.danger('Unknow store type given in options.\nOptions: ' + JSON.stringify(options));
    break;
  }
};

/**
 * Closes store menu.
 * @function closeStoreMenu
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} location Store location.
 */
yarp.server.closeStoreMenu = (player, location) => {
  if (openStores[player.name] != null) {
    if (yarp.menus[location.id] && yarp.menus[location.id].isVisible(player)) {
      yarp.menus[location.id].close(player);
    }
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
    yarp.hotkeys['Open Menu'].unbind(player);
  }
};

/**
 * Called when item is clicked on native menu.
 * @function menuItemClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} type Type of the item.
 * @param {Number} index Index of the item.
 * @param {Object} data Data representing the event.
 */
yarp.server.add.menuItemClicked = (player, menuId, type, index, data) => {
  if (data && data.storeType && data.itemId && data.storeId && data.categoryId) {
    let storeId = data.storeId;
    let location = yarp.locations[storeId];
    if (location) {
      let categoryId = data.categoryId;
      let sale = location.sale;
      if (sale[categoryId]) {
        let itemId = data.itemId;
        let saleItem = sale[categoryId][itemId];
        let character = player.character;
        let amount = 1;
        if (data.item) amount = Number(data.item.displayText);
        if (character.tryFullPayment(saleItem.price*amount)) {
          location.inventory[itemId].amount -= amount;
          let item = yarp.items[itemId];
          if (item.isWeapon()) {
            character.giveWeapon(yarp.weapons[item.id]);
          } else if (item.isAmmo()) {
            character.giveAmmo(item.id, amount);
          } else {
            character.giveItem(item, amount);
          }
          location.save();
          character.save();

          openStores[player.name].total += (saleItem.price * amount);
          if (!openStores[player.name].received[item.name]) {
            openStores[player.name].received[item.name] = amount;
          } else {
            openStores[player.name].received[item.name] += amount;
          }
        }
      }
    }
  }
};

require('./list.js');
require('./submenu.js');
