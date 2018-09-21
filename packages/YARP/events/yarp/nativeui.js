'use strict';
/**
 * NativeUI events
 */

/**
 * Called when index is changed on native menu.
 * @function menuIndexChage
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuIndexChage = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when list is changed on native menu.
 * @function menuListChange
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuListChange = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when checkbox is changed on native menu.
 * @function menuCheckboxChange
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuCheckboxChange = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when item is selected on native menu.
 * @function menuItemSelect
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuItemSelect = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when slider is changed on native menu.
 * @function menuSliderChange
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuSliderChange = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};

/**
 * Called when a native menu is closed.
 * @function menuClose
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 */
yarp.server.menuClose = (player, menuId) => {
    if (menuId == 'Test Menu') console.log(menuId);
};

/**
 * Called when a native menu is changed.
 * @function menuClose
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} menuId Id of the menu.
 * @param {Object} data Data representing the event.
 */
yarp.server.menuChange = (player, menuId, data) => {
    if (menuId == 'Test Menu') console.log(menuId, data);
};
