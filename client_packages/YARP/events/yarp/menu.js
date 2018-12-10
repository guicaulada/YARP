'use strict';
/**
 * Menu events
 * @memberof yarp.client
 */

/**
 * Add menu item.
 * @function menuAddItem
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Object} item The item data.
 */
yarp.client.menuAddItem = (menuId, item) => {
    item.type = yarp.utils.client.default(item.type, 'text');
    let menuItem = [
        item.displayText, item.caption, item.badge, item.data,
    ];
    switch (item.type) {
        case 'checkbox':
            menuItem = new NativeMenu.CheckboxMenuItem(...menuItem);
            if (item.toggled === true) menuItem.toggled = true;
            break;
        case 'list':
            menuItem = [
                menuItem[0], item.items, item.defaultIndex, ...menuItem.slice(1, menuItem.length),
            ];
            menuItem = new NativeMenu.ListMenuItem(...menuItem);
            break;
        case 'slider':
            menuItem = [
                menuItem[0], item.min, item.max, item.step, item.start, ...menuItem.slice(1, menuItem.length),
            ];
            menuItem = new NativeMenu.SliderMenuItem(...menuItem);
            break;
        case 'close':
            menuItem = new NativeMenu.CloseMenuItem(...menuItem);
            break;
        case 'submenu':
            menuItem = new NativeMenu.SubMenuItem(...menuItem);
            yarp.menus[item.id] = menuItem.menu;
            yarp.client.setMenuEvent(item.id);
            yarp.menus[item.id].data._submenu = true;
            yarp.menus[item.id].data._parentId = menuId;
            for (let subitem of item.items) {
                yarp.client.menuAddItem(item.id, subitem);
            }
            break;
        case 'input':
            menuItem = [
                menuItem[0], item.masked, item.max, item.inputText, ...menuItem.slice(1, menuItem.length),
            ];
            menuItem = new NativeMenu.InputMenuItem(...menuItem);
            if (item.disabled === true) menuItem.disabled = true;
            break;
        default:
            menuItem = new NativeMenu.TextMenuItem(...menuItem);
            break;
    }
    menuItem.data._menuId = menuId;
    menuItem.data._index = yarp.menus[menuId].menuItems.length;
    yarp.client.setMenuItemColor(menuItem, item);
    yarp.client.addMenuItemEvents(menuItem, item);
    yarp.menus[menuId].add(menuItem);
};

/**
 * Add menu builder item.
 * @function menuBuilderAddItem
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Object} item The item data.
 */
yarp.client.menuBuilderAddItem = (menuId, item) => {
    item.type = yarp.utils.client.default(item.type, 'panel');
    let menuItem = [
        item.x, item.y, item.width, item.height, item.text, item.data,
    ];
    switch (item.type) {
        case 'button':
            menuItem = new NativeMenu.Button(...menuItem);
            if (item.disabled === true) menuItem.disabled = true;
            break;
        case 'input':
            menuItem = [
                ...menuItem.slice(0, 5), item.maxLength, ...menuItem.slice(6, menuItem.length),
            ];
            menuItem = new NativeMenu.InputPanel(...menuItem);
            if (item.masked === true) menuItem.inputMasked = true;
            if (item.disabled === true) menuItem.disabled = true;
            break;
        case 'debug':
            menuItem = new NativeMenu.DebugPanel(...menuItem);
            break;
        default:
            menuItem = new NativeMenu.Panel(...menuItem);
            break;
    }
    menuItem.data._menuId = menuId;
    menuItem.data._index = yarp.menus[menuId].menuItems.length;
    yarp.client.setMenuItemColor(menuItem, item);
    yarp.client.addMenuItemEvents(menuItem, item);
    yarp.menus[menuId].add(menuItem);
};

yarp.client.setMenuItemColor = (menuItem, item) => {
    for (let color in menuItem.skin) {
        if (item[color] && item[color].length && item[color].length == 4) {
            menuItem.skin[color] = new NativeMenu.Color(...item[color]);
        }
    }
};

yarp.client.addMenuItemEvents = (menuItem, item) => {
    if (menuItem.addOnClickEvent) {
        menuItem.addOnClickEvent({
            trigger: menuItem.onClickEvents.length == 0 ? (data) => {
                yarp.server.menuItemClicked(data);
            } : item.click ? item.click : () => {},
        });
    }
    if (menuItem.addOnSelectEvent) {
        menuItem.addOnSelectEvent({
            trigger: menuItem.onSelectEvents.length == 0 ? (data) => {
                yarp.server.menuItemSelected(data); // Do we really need that many events? No. YES!
            } : item.select ? item.select : () => {},
        });
    }
    if (menuItem.addOnChangeEvent) {
        menuItem.addOnChangeEvent({
            trigger: menuItem.onChangeEvents.length == 0 ? (data) => {
                yarp.server.menuItemChanged(data); // This might be a little too much, use with caution.
            } : item.changed ? item.changed : () => {},
        });
    }
};

yarp.client.setMenuEvent = (menuId, menu) => {
    yarp.menus[menuId].setMenuEvent({
        click: !menu || !menu.click ? (menu, data) => {
            data._menuId = menuId;
            yarp.server.menuClicked(data); // Enabled if you need this, probably don't.
        } : menu.click,
        select: !menu || !menu.select ? (menu, data) => {
            data._menuId = menuId;
            yarp.server.menuSelected(data); // Im on an event diet.
        } : menu.select,
        close: !menu || !menu.close ? (menu, data) => {
            data._menuId = menuId;
            yarp.server.menuClosed(data); // MOAR EVENTS!
        } : menu.close,
    });
};

/**
 * Creates menu.
 * @function createMenu
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Object} options The menu data.
 */
yarp.client.createMenu = (menuId, options) => {
    yarp.menus[menuId] = new NativeMenu.MainMenu(options.title, false);
    yarp.menus[menuId].offset = yarp.utils.client.default(options.offset, [0, 0]);
    if (options.texture) {
        yarp.menus[menuId].setTitleTexture(...options.texture);
    }
    yarp.client.setMenuEvent(menuId);
    for (let item of options.items) {
        yarp.client.menuAddItem(menuId, item);
    }
};

/**
 * Creates menu builder.
 * @function buildMenu
 * @memberof yarp.client
 * @param {String} menuId The menu builder id.
 * @param {Object} options The menu builder data.
 */
yarp.client.buildMenu = (menuId, options) => {
    yarp.menus[menuId] = new NativeMenu.MenuBuilder(options.title, ...options.size);
    if (options.debug === true) {
        yarp.menus[menuId].debugMode = true;
    }
    yarp.client.setMenuEvent(menuId);
    for (let item of options.items) {
        yarp.client.menuBuilderAddItem(menuId, item);
    }
};

/**
 * Toggles menu open/closed.
 * @function toggleMenu
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 */
yarp.client.toggleMenu = (menuId) => {
    if (yarp.menus[menuId].isVisible) {
        yarp.client.closeMenu(menuId);
    } else {
        yarp.client.openMenu(menuId);
    }
};

/**
 * Open menu.
 * @function openMenu
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Boolean} [chat=false] Chat on/off.
 */
yarp.client.openMenu = (menuId, chat = false) => {
    yarp.client.closeAllMenus();
    yarp.menus[menuId].open();
    mp.gui.cursor.visible = false;
    mp.gui.chat.show(chat);
};

/**
 * Close menu.
 * @function closeMenu
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 */
yarp.client.closeMenu = (menuId) => {
    NativeMenu.MenuPool.currentInputBox = null;
    let currentMenu = yarp.client.getCurrentMenu();
    let targetMenu = yarp.menus[menuId];
    while (currentMenu != targetMenu && currentMenu != null) {
        yarp.client.removeSubMenu(currentMenu);
        currentMenu = yarp.client.getCurrentMenu();
    }
    if (currentMenu) currentMenu.close();
    mp.gui.chat.show(true);
};

/**
 * Close all menus.
 * @function closeAllMenus
 * @memberof yarp.client
 */
yarp.client.closeAllMenus = () => {
    for (let menuId in yarp.menus) {
        if (yarp.menus[menuId].isVisible) {
            yarp.client.closeMenu(menuId);
        }
    }
};

/**
 * Creates menu.
 * @function menuAddItems
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Array<Object>} items Items list.
 */
yarp.client.menuAddItems = (menuId, items) => {
    for (let item of items) {
        yarp.client.menuAddItem(menuId, item);
    }
};

/**
 * Updates menu item.
 * @function menuUpdateItem
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Number} index The item index.
 * @param {Object} item Items list.
 */
yarp.client.menuUpdateItem = (menuId, index, item) => {
    let menuItem = yarp.menus[menuId].menuItems[index];
    Object.assign(menuItem, item);
    if (item.type == 'submenu') {
        yarp.client.menuUpdateItems(item.id, item.items);
    }
};

/**
 * Updates menu items.
 * @function menuUpdateItems
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Object} indexItems Dictionary of items by index.
 */
yarp.client.menuUpdateItems = (menuId, indexItems) => {
    for (let index in indexItems) {
        if (indexItems.hasOwnProperty(index)) {
            yarp.client.menuUpdateItem(menuId, Number(index), indexItems[index]);
        }
    }
};

/**
 * Removes menu item.
 * @function menuRemoveItem
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Number} index The item index.
 */
yarp.client.menuRemoveItem = (menuId, index) => {
    let currentMenu = yarp.client.getCurrentMenu();
    yarp.client.removeSubMenu(currentMenu);
    yarp.menus[menuId].menuItems.splice(index, 1);
    yarp.menus[menuId].setToItem(index % yarp.menus[menuId].menuItems.length);
    yarp.client.refreshMenuIndex(menuId);
};

/**
 * Removes menu item.
 * @function menuRemoveItems
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 * @param {Number} indexStart The starting item index.
 * @param {Number} indexEnd The last index to remove.
 */
yarp.client.menuRemoveItems = (menuId, indexStart, indexEnd) => {
    let currentMenu = yarp.client.getCurrentMenu();
    yarp.client.removeSubMenu(currentMenu);
    yarp.menus[menuId].menuItems.splice(indexStart, indexEnd);
    yarp.menus[menuId].setToItem(indexStart % yarp.menus[menuId].menuItems.length);
    yarp.client.refreshMenuIndex(menuId);
};

/**
 * Recalculate index for menu items.
 * @function refreshMenuIndex
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 */
yarp.client.refreshMenuIndex = (menuId) => {
    for (let i in yarp.menus[menuId].menuItems) {
        if (yarp.menus[menuId].menuItems[i].data) {
            yarp.menus[menuId].menuItems[i].data.itemIndex = i;
            if (yarp.menus[menuId].menuItems[i].menu) {
                for (let j in yarp.menus[menuId].menuItems[i].menu.menuItems) {
                    if (yarp.menus[menuId].menuItems[i].menu.menuItems[j].data) {
                        yarp.menus[menuId].menuItems[i].menu.menuItems[j].data.itemIndex = i;
                    }
                }
            }
        }
    }
};

/**
 * Returns current menu.
 * @function getCurrentMenu
 * @memberof yarp.client
 * @return {NativeMenu.Menu}
 */
yarp.client.getCurrentMenu = () => {
    return NativeMenu.MenuPool.getCurrentMenu();
};

/**
 * Returns menu.
 * @function getMenuById
 * @param {String} id Menu id.
 * @memberof yarp.client
 * @return {NativeMenu.Menu}
 */
yarp.client.getMenuById = (id) => {
    return yarp.menus[id];
};

/**
 * Returns item data.
 * @function getMenuItemByIndex
 * @param {String} id Menu id.
 * @param {Number} index Item index.
 * @memberof yarp.client
 * @return {*} Item data.
 */
yarp.client.getMenuItemByIndex = (id, index) => {
    return yarp.menus[id].menuItems[index].data;
};

/**
 * Returns items data.
 * @function getMenuItemsByIndex
 * @param {String} id Menu id.
 * @param {Array<Number>} indexList Item index list.
 * @memberof yarp.client
 * @return {Array<*>} Item data by index.
 */
yarp.client.getMenuItemsByIndex = (id, indexList) => {
    let result = [];
    for (let index of indexList) {
        result[index] = yarp.menus[id].menuItems[index].data;
    }
    return result;
};

/**
 * Displays submenu.
 * @function displaySubMenu
 * @param {String|NativeMenu.Menu} menu Menu id or object.
 * @memberof yarp.client
 */
yarp.client.displaySubMenu = (menu) => {
    if (typeof menu === 'string') menu = yarp.menus[menu];
    NativeMenu.MenuPool.displaySubMenu(menu);
};

/**
 * Removes submenu.
 * @function removeSubMenu
 * @param {String|NativeMenu.Menu} menu Menu id or object.
 * @memberof yarp.client
 */
yarp.client.removeSubMenu = (menu) => {
    if (typeof menu === 'string') menu = yarp.menus[menu];
    NativeMenu.MenuPool.removeSubMenu(menu);
};

/**
 * Renders the menus.
 * @event render
 * @memberof ragemp.client
 */
mp.events.add('render', () => {
    for (let menuId in yarp.menus) {
        if (yarp.menus.hasOwnProperty(menuId)) {
            let menu = yarp.menus[menuId];
            if (menu.offset != null) menu.render(...menu.offset);
        }
    }
});
