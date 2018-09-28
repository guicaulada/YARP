'use strict';
/**
 * Prompt events
 * @memberof yarp.client
 */

/**
 * Add menu item.
 * @function menuAddItem
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Object} item The item data.
 */
yarp.client.promptAddItem = (menuId, item) => {
  let index = null;
  let type = yarp.utils.client.default(item.type, 'panel');
  let menuItem = [
      item.x, item.y, item.width, item.height, item.text, item.data,
  ];
  switch (type) {
    case 'button':
      index = yarp.menus[menuId].buttons.length;
      menuItem = new NativeMenu.Button(...menuItem);
      break;
    case 'input':
      index = yarp.menus[menuId].inputPanels.length;
      menuItem = new NativeMenu.InputPanel(...menuItem);
      if (item.masked) menuItem.inputMasked = true;
      break;
    case 'panel':
      index = yarp.menus[menuId].panels.length;
      menuItem = new NativeMenu.Panel(...menuItem);
      break;
    case 'debug':
      index = yarp.menus[menuId].debugPanels.length;
      menuItem = new NativeMenu.DebugPanel(...menuItem);
      break;
    default:
      index = yarp.menus[menuId].panels.length;
      menuItem = new NativeMenu.Panel(...menuItem);
      break;
  }
  if (menuItem.addOnClickEvent) {
      menuItem.addOnClickEvent({
          trigger: (data) => {
              yarp.server.menuItemClicked(menuId, type, index, data);
          },
      });
  }
  if (menuItem.addOnSelectEvent) {
      menuItem.addOnSelectEvent({
          trigger: (data) => {
              yarp.server.menuItemSelected(menuId, type, index, data);
          },
      });
  }
  if (menuItem.addOnChangeEvent) {
      menuItem.addOnChangeEvent({
          trigger: (data) => {
              yarp.server.menuItemChanged(menuId, type, index, data);
          },
      });
  }
  yarp.menus[menuId].add(menuItem);
};

/**
 * Creates prompt.
 * @function createPrompt
 * @memberof yarp.client
 * @param {String} menuId The prompt id.
 * @param {Object} options The prompt data.
 */
yarp.client.createPrompt = (menuId, options) => {
  yarp.menus[menuId] = new NativeMenu.Prompt(options.title, ...options.size);
  for (let item of options.items) {
    yarp.client.promptAddItem(menuId, item);
  }
};
