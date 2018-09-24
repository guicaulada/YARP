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
    let index = yarp.menus[menuId].menuItems.length;
    let type = yarp.utils.client.default(item.type, 'text');
    let menuItem = [item.displayText, item.data,
        yarp.utils.client.default(item.caption, ''),
        yarp.utils.client.default(item.badge, NaN),
        new NativeMenu.Color(...yarp.utils.client.default(item.textColor, [255, 255, 255, 240])),
        new NativeMenu.Color(...yarp.utils.client.default(item.backgroundColor, [0, 0, 0, 120])),
        new NativeMenu.Color(...yarp.utils.client.default(item.hoverTextColor, [20, 0, 0, 240])),
        new NativeMenu.Color(...yarp.utils.client.default(item.hoverBackgroundColor, [255, 255, 255, 170])),
    ];
    switch (type) {
        case 'checkbox':
            menuItem = new NativeMenu.CheckboxMenuItem(...menuItem);
            break;
        case 'list':
            menuItem = [...menuItem.slice(0, 2),
                yarp.utils.client.default(item.defaultIndex, 0),
                ...menuItem.slice(2, 8),
            ];
            menuItem = new NativeMenu.ListMenuItem(...menuItem);
            break;
        case 'slider':
            menuItem = [menuItem[0],
                yarp.utils.client.default(item.min, 1),
                yarp.utils.client.default(item.max, 1),
                yarp.utils.client.default(item.step, 1),
                ...menuItem.slice(1, 8),
            ];
            menuItem = new NativeMenu.SliderMenuItem(...menuItem);
            break;
        case 'close':
            menuItem = [...menuItem.slice(0, 4),
                new NativeMenu.Color(...yarp.utils.client.default(item.textColor, [255, 255, 255, 255])),
                new NativeMenu.Color(...yarp.utils.client.default(item.backgroundColor, [242, 67, 67, 204])),
                new NativeMenu.Color(...yarp.utils.client.default(item.hoverTextColor, [255, 255, 255, 255])),
                new NativeMenu.Color(...yarp.utils.client.default(item.hoverBackgroundColor, [242, 67, 67, 255])),
            ];
            menuItem = new NativeMenu.CloseMenuItem(...menuItem);
            break;
        case 'submenu':
            menuItem = new NativeMenu.SubMenuItem(...menuItem);
            yarp.menus[item.id] = menuItem;
            for (let subitem of item.data) {
                yarp.client.menuAddItem(item.id, subitem);
            }
            break;
        default:
            menuItem = new NativeMenu.TextMenuItem(...menuItem);
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
    for (let item of options.data) {
        yarp.client.menuAddItem(menuId, item);
    }
    yarp.menus[menuId].setEventMenu({
        click: (data) => {
            yarp.server.menuClicked(menuId, data);
        },
        select: (data) => {
            yarp.server.menuSelected(menuId, data);
        },
    });
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
 */
yarp.client.openMenu = (menuId) => {
    yarp.client.closeAllMenus();
    yarp.menus[menuId].open();
    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
};

/**
 * Close menu.
 * @function closeMenu
 * @memberof yarp.client
 * @param {String} menuId The menu id.
 */
yarp.client.closeMenu = (menuId) => {
    let currentMenu = yarp.client.getCurrentMenu();
    let targetMenu = yarp.menus[menuId];
    while (currentMenu != targetMenu) {
        yarp.client.removeSubMenu(currentMenu);
        currentMenu = yarp.client.getCurrentMenu();
    }
    targetMenu.close();
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
            if (menu.offset) menu.render(...menu.offset);
        }
    }
});
