'use strict';

/**
 * Open store menu.
 * @function openSublistStore
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} location Store location.
 * @param {Object} options Store options.
 */
yarp.server.openSublistStore = (player, location, options) => {
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
        items: [],
      };

      submenu.items.push({
        displayText: 'Back',
      });

      for (let itemId in sale[category]) {
        if (sale[category].hasOwnProperty(itemId)) {
          let saleItem = sale[category][itemId];
          if (saleItem.amount > 0) {
            submenu.items.push({
              type: 'list',
              displayText: saleItem.price + '$ - ' + saleItem.name,
              caption: `Buy ${saleItem.name} for $${saleItem.price}.`,
              items: Array.from({length: 10}, (v, k) => {
                return {
                  displayText: k + 1,
                };
              }),
              data: {itemId: saleItem.id, storeId: location.id, categoryId: category, storeType: 'sublist'},
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
  yarp.hotkeys['Open Menu'].bind(player, [menu]);
};
