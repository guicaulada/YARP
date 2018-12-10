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
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemClicked = (player, data) => {
    if (data._menuId == 'Test Menu') console.log(data);
    if (data._type == 'close') {
        yarp.client.chatShow(player, true);
        yarp.menus[data._menuId].visible = false;
    }
    if (data._menuId.includes('inventory') && data._type != 'close') {
        yarp.server.inventoryItemClicked(player, data);
    }
    if (data._menuId.includes('equipment') && data._type != 'close') {
        yarp.server.equipmentItemClicked(player, data);
    }
    if (data._menuId == 'Login Panel') {
        yarp.server.loginItemClicked(player, data);
    }
};

/**
 * Called when item is selected on native menu.
 * @function menuItemSelected
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemSelected = (player, data) => {
    if (data._menuId == 'Test Menu') console.log(data);
};

/**
 * Called when item is changed on native menu.
 * @function menuItemChanged
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemChanged = (player, data) => {
    if (data._menuId == 'Test Menu') console.log(data);
};

/**
 * Called when menu is clicked for native menu.
 * @function menuClicked
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} data._menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuClicked = (player, data) => {
    if (data._menuId == 'Test Menu') console.log(data);
};

/**
 * Called when menu is selected for native menu.
 * @function menuSelected
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} data._menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuSelected = (player, data) => {
    if (data._menuId == 'Test Menu') console.log(data);
};

/**
 * Called when menu is closed for native menu.
 * @function menuClosed
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} data._menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuClosed = (player, data) => {
    if (data._menuId == 'Test Menu') console.log(data);
};
