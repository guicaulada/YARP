'use strict';
/**
 * NativeMenu events
 * @memberof yarp.server
 */


/**
 * Called when inventory item is clicked on native menu.
 * @function menuItemClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} type Type of the item.
 * @param {Object} data Data representing the event.
 */
yarp.server.inventoryItemClicked = (player, menuId, type, data) => {
    let character = player.character;
    let item = yarp.items[data.itemId];
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
        yarp.menus['inventory'+character.id].updateItem(player, data.itemIndex, submenu);
    } else {
        yarp.menus['inventory' + character.id].removeItem(player, data.itemIndex);
    }
    item.options[data.option](player);
};

/**
 * Called when item is clicked on native menu.
 * @function menuItemClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} type Type of the item.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemClicked = (player, menuId, type, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
    if (type == 'close') {
        yarp.client.chatShow(player, true);
        yarp.menus[menuId].visible = false;
    }
    if (menuId.includes('inventory') && type != 'close') {
        yarp.server.inventoryItemClicked(player, menuId, type, data);
    }
};

/**
 * Called when item is selected on native menu.
 * @function menuItemSelected
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} type Type of the item.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemSelected = (player, menuId, type, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when item is changed on native menu.
 * @function menuItemChanged
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {String} type Type of the item.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemChanged = (player, menuId, type, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when menu is clicked for native menu.
 * @function menuClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuClicked = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when menu is selected for native menu.
 * @function menuSelected
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuSelected = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};
