'use strict';
/**
 * Holds nativui functions for the client.
 */

/**
 * Adds an item to the menu.
 * @param {String} menuId Menu id.
 * @param {Object} item Item to be added.
 */
yarp.client.menuAddItem = (menuId, item) => {
    let menuItem = null;
    switch (item.type) {
        case 3:
            menuItem = new NativeUI.UIMenuCheckboxItem(
                yarp.utils.client.default(item.text, ''),
                yarp.utils.client.default(item.checked, false),
                yarp.utils.client.default(item.description, '')
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            break;
        case 2:
            menuItem = new NativeUI.UIMenuSliderItem(
                yarp.utils.client.default(item.text, ''),
                yarp.utils.client.default(item.items, []),
                yarp.utils.client.default(item.start, 0),
                yarp.utils.client.default(item.description, ''),
                yarp.utils.client.default(item.divider, false)
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            break;
        case 1:
            menuItem = new NativeUI.UIMenuListItem(
                yarp.utils.client.default(item.text, ''),
                yarp.utils.client.default(item.description, ''),
                new NativeUI.ItemsCollection(yarp.utils.client.default(item.items, [''])),
                yarp.utils.default(item.start, 0)
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            break;
        default:
            menuItem = new NativeUI.UIMenuItem(
                yarp.utils.client.default(item.text, ''),
                yarp.utils.client.default(item.description, '')
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            if (item.rightBadge) menuItem.SetRightBadge(NativeUI.BadgeStyle(item.rightBadge));
            if (item.rightLabel) menuItem.SetRightLabel(item.rightLabel);
            break;
    }
    if (item.properties) {
        for (let k in item.properties) {
            if (item.properties.hasOwnProperty(k)) {
                if (k.includes('Color') || k.includes('color')) {
                    menuItem[k] = new NativeUI.Color(...v);
                }
            }
        }
    }
    menuItem._meta = yarp.utils.client.default(item._meta, {});
    yarp.nui[menuId].AddItem(menuItem);
};

/**
 * Creates a menu.
 * @function createMenu
 * @memberof client.NativeUI
 * @param {String} menuId Menu id
 * @param {Object} options Menu options
 */
yarp.client.createMenu = (menuId, options) => {
    yarp.nui[menuId] = new NativeUI.Menu(options.title, options.subtitle, new NativeUI.Point(...options.offset), options.spriteLibrary, options.spriteName);
    yarp.nui[menuId]._meta = {};
    for (let item of options.items) {
        yarp.client.menuAddItem(menuId, item);
    }

    yarp.nui[menuId].IndexChange.on((index) => {
        yarp.server.menuIndexChage(menuId, {index: index});
    });

    yarp.nui[menuId].ListChange.on((item, index) => {
        yarp.server.menuListChange(menuId, {
            index: index,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
                _meta: item._meta,
            },
            fullItem: yarp.utils.client.circularJSON(item),
        });
    });

    yarp.nui[menuId].CheckboxChange.on((item, checked) => {
        yarp.server.menuCheckboxChange(menuId, {
            checked: checked,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
                _meta: item._meta,
            },
            fullItem: yarp.utils.client.circularJSON(item),
        });
    });

    yarp.nui[menuId].ItemSelect.on((item, index) => {
        yarp.server.menuItemSelect(menuId, {
            index: index,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
                _meta: item._meta,
            },
            fullItem: yarp.utils.client.circularJSON(item),
        });
    });

    yarp.nui[menuId].SliderChange.on((item, index, value) => {
        yarp.server.menuSliderChange(menuId, {
            index: index,
            value: value,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
                _meta: item._meta,
            },
            fullItem: yarp.utils.client.circularJSON(item),
        });
    });

    yarp.nui[menuId].MenuClose.on(() => {
        yarp.server.menuClose(menuId);
    });

    yarp.nui[menuId].MenuChange.on((menu) => {
        yarp.server.menuChange(menuId, yarp.utils.client.circularJSON({menu: menu}));
    });


    yarp.nui[menuId].Close();
};

yarp.client.toggleMenu = (menuId) => {
    if (yarp.nui[menuId].Visible) {
        yarp.nui[menuId].Close();
        mp.gui.chat.show(true);
    } else {
        yarp.nui[menuId].Open();
        mp.gui.cursor.visible = false;
        mp.gui.chat.show(false);
    }
};

yarp.client.openMenu = (menuId) => {
    yarp.nui[menuId].Open();
    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
};

yarp.client.closeMenu = (menuId) => {
    yarp.nui[menuId].Close();
    mp.gui.chat.show(true);
};

yarp.client.menuAddItem = (menuId, item) => {
    yarp.client.menuAddItem(menuId, item);
};

yarp.client.menuAddItems = (menuId, items) => {
    for (item of items) {
        yarp.client.menuAddItem(menuId, item);
    }
};
