'use strict';
/**
 * @file Menu events
 * @namespace server.nativui
 */

/**
 * Called when index is changed on native menu.
 * @event menuIndexChage
 * @memberof server.nativui
 * @param {object} player The player that called the event.
 * @param {string} menuId Id of the menu.
 * @param {string} jsonData Json data representing the event.
 */
mp.events.add('menuIndexChage', (player, menuId, jsonData) => {
});

/**
 * Called when list is changed on native menu.
 * @event menuListChange
 * @memberof server.nativui
 * @param {object} player The player that called the event.
 * @param {string} menuId Id of the menu.
 * @param {string} jsonData Json data representing the event.
 */
mp.events.add('menuListChange', (player, menuId, jsonData) => {
});

/**
 * Called when checkbox is changed on native menu.
 * @event menuCheckboxChange
 * @memberof server.nativui
 * @param {object} player The player that called the event.
 * @param {string} menuId Id of the menu.
 * @param {string} jsonData Json data representing the event.
 */
mp.events.add('menuCheckboxChange', (player, menuId, jsonData) => {
});

/**
 * Called when item is selected on native menu.
 * @event menuItemSelect
 * @memberof server.nativui
 * @param {object} player The player that called the event.
 * @param {string} menuId Id of the menu.
 * @param {string} jsonData Json data representing the event.
 */
mp.events.add('menuItemSelect', (player, menuId, jsonData) => {
});

/**
 * Called when slider is changed on native menu.
 * @event menuSliderChange
 * @memberof server.nativui
 * @param {object} player The player that called the event.
 * @param {string} menuId Id of the menu.
 * @param {string} jsonData Json data representing the event.
 */
mp.events.add('menuSliderChange', (player, menuId, jsonData) => {
});

/**
 * Called when a native menu is closed.
 * @event menuClose
 * @memberof server.nativui
 * @param {object} player The player that called the event.
 * @param {string} menuId Id of the menu.
 * @param {string} jsonData Json data representing the event.
 */
mp.events.add('menuClose', (player, menuId) => {
});

/**
 * Called when a native menu is changed.
 * @event menuClose
 * @memberof server.nativui
 * @param {object} player The player that called the event.
 * @param {string} menuId Id of the menu.
 * @param {string} jsonData Json data representing the event.
 */
mp.events.add('menuChange', (player, menuId, jsonData) => {
});
