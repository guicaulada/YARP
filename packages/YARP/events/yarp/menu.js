'use strict';
/**
 * NativeMenu events
 * @memberof yarp.server
 */

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
    if (type == 'close') yarp.client.chatShow(player, true);
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
