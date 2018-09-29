'use strict';

/**
 * Open store menu.
 * @function openStoreMenu
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} location Store location.
 * @param {Object} options Store options.
 */
yarp.server.openListStore = (player, location, options) => {
  if (!options) options = {};
  let sale = location.sale;
  let menu = new yarp.Menu({
    id: location.id,
    title: yarp.utils.server.default(options.title, 'Store'),
    offset: yarp.utils.server.default(options.offset, [0, 0]),
  });

  for (let category in sale) {
    if (sale.hasOwnProperty(category)) {
      let text = {
        type: 'text',
        displayText: category,
        caption: `Buy ${category.toLowerCase()} items.`,
        data: {storeId: location.id, categoryId: category, storeType: 'list', offset: options.offset},
      };
      menu.add(text);
    }
  }

  menu.add({
    type: 'close',
    displayText: 'Close',
  });

  menu.create(player);
  yarp.hotkeys['Open Menu'].bind(player, [menu]);
};


/**
 * Called when item is clicked on native menu.
 * @function menuItemClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} data Data representing the event.
 */
yarp.server.add.menuItemClicked = (player, data) => {
  if (data && data.storeType == 'list' && data.storeId && data.categoryId && data.offset) {
    let storeId = data.storeId;
    let location = yarp.locations[storeId];
    if (location) {
      let categoryId = data.categoryId;
      let sale = location.sale;
      if (sale[categoryId]) {
        let menu = new yarp.Menu({
          id: location.id + categoryId,
          title: categoryId,
          offset: data.offset,
        });
        for (let itemId in sale[categoryId]) {
          if (sale[categoryId].hasOwnProperty(itemId)) {
            let saleItem = sale[categoryId][itemId];
            if (saleItem.amount > 0) {
              menu.add({
                type: 'list',
                displayText: saleItem.price + '$ - ' + saleItem.name,
                caption: `Buy ${saleItem.name} for $${saleItem.price}.`,
                items: Array.from({length: 100}, (v, k) => {
                  return {
                    displayText: k + 1,
                  };
                }),
                data: {itemId: saleItem.id, storeId: location.id, categoryId: categoryId, storeType: 'list'},
              });
            }
          }
        }

        menu.add({
          type: 'close',
          displayText: 'Close',
        });

        menu.create(player);
        menu.open(player);
      }
    }
  }
};
