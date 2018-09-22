'use strict';
/**
* Menu events
*/

yarp.client.menuAddItem = (menuId, item) => {
    let menuItem = [item.displayText, item.data,
        yarp.utils.client.default(item.caption, ''),
        yarp.utils.client.default(item.badge, NaN),
        new NativeMenu.Color(...yarp.utils.client.default(item.textColor, [255, 255, 255, 240])),
        new NativeMenu.Color(...yarp.utils.client.default(item.backgroundColor, [0, 0, 0, 120])),
        new NativeMenu.Color(...yarp.utils.client.default(item.hoverTextColor, [20, 0, 0, 240])),
        new NativeMenu.Color(...yarp.utils.client.default(item.hoverBackgroundColor, [255, 255, 255, 170])),
    ];
    switch (item.type) {
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
                yarp.server.menuItemClicked(menuId, item.type, data);
            },
        });
    }
    if (menuItem.addOnSelectEvent) {
        menuItem.addOnSelectEvent({
            trigger: (data) => {
                yarp.server.menuItemSelected(menuId, item.type, data);
            },
        });
    }
    if (menuItem.addOnChangeEvent) {
        menuItem.addOnChangeEvent({
            trigger: (data) => {
                yarp.server.menuItemChanged(menuId, item.type, data);
            },
        });
    }
    yarp.menus[menuId].add(menuItem);
};

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


yarp.client.toggleMenu = (menuId) => {
    if (yarp.menus[menuId].isVisible) {
        mp.gui.chat.show(true);
        yarp.menus[menuId].close();
    } else {
        mp.gui.chat.show(false);
        mp.gui.cursor.visible = false;
        yarp.menus[menuId].open();
    }
};

yarp.client.openMenu = (menuId) => {
    yarp.menus[menuId].open();
    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
};

yarp.client.closeMenu = (menuId) => {
    yarp.menus[menuId].close();
    mp.gui.chat.show(true);
};

yarp.client.menuAddItems = (menuId, items) => {
    for (item of items) {
        yarp.client.menuAddItem(menuId, item);
    }
};

mp.events.add('render', () => {
    for (let menuId in yarp.menus) {
        if (yarp.menus.hasOwnProperty(menuId)) {
            let menu = yarp.menus[menuId];
            if (menu.offset) menu.render(...menu.offset);
        }
    }
});
