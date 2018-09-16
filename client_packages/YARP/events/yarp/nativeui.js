'use strict';
/**
 * Holds nativui functions for the client.
 * @namespace client.yarp.nativeui
 */

/**
 * Adds an item to the menu.
 * @param {String} menuId Menu id.
 * @param {Object} item Item to be added.
 */
function menuAddItem(menuId, item) {
    let menuItem = null;
    switch (item.type) {
        case 3:
            menuItem = new NativeUI.UIMenuCheckboxItem(
                yarp.utils.default(item.text, ''),
                yarp.utils.default(item.checked, false),
                yarp.utils.default(item.description, '')
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            break;
        case 2:
            menuItem = new NativeUI.UIMenuSliderItem(
                yarp.utils.default(item.text, ''),
                yarp.utils.default(item.items, []),
                yarp.utils.default(item.start, 0),
                yarp.utils.default(item.description, ''),
                yarp.utils.default(item.divider, false)
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            break;
        case 1:
            menuItem = new NativeUI.UIMenuListItem(
                yarp.utils.default(item.text, ''),
                yarp.utils.default(item.description, ''),
                new NativeUI.ItemsCollection(yarp.utils.default(item.items, [''])),
                yarp.utils.default(item.start, 0)
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            break;
        default:
            menuItem = new NativeUI.UIMenuItem(
                yarp.utils.default(item.text, ''),
                yarp.utils.default(item.description, '')
            );
            if (item.leftBadge) menuItem.SetLeftBadge(NativeUI.BadgeStyle(item.leftBadge));
            if (item.rightBadge) menuItem.SetRightBadge(NativeUI.BadgeStyle(item.rightBadge));
            if (item.rightLabel) menuItem.SetRightLabel(NativeUI.BadgeStyle(item.rightLabel));
            break;
    }
    yarp.nui[menuId].AddItem(menuItem);
}

/**
 * Creates a menu.
 * @event createMenu
 * @memberof client.nativeui
 * @fires menuIndexChage
 * @fires menuListChange
 * @fires menuCheckboxChange
 * @fires menuItemSelect
 * @fires menuSliderChange
 * @fires menuClose
 * @fires menuChange
 */
mp.events.add('createMenu', (menuId, optionsJson) => {
    let options = JSON.parse(optionsJson);
    yarp.nui[menuId] = new NativeUI.Menu(options.title, options.subtitle, new NativeUI.Point(...options.offset), options.spriteLibrary, options.spriteName);
    for (let item of options.items) {
        menuAddItem(menuId, item);
    }

    yarp.nui[menuId].IndexChange.on((index) => {
        mp.events.callRemote('menuIndexChage', menuId, JSON.stringify({index: index}));
    });

    yarp.nui[menuId].ListChange.on((item, index) => {
        mp.events.callRemote('menuListChange', menuId, JSON.stringify({
            index: index,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
            },
        }));
    });

    yarp.nui[menuId].CheckboxChange.on((item, checked) => {
        mp.events.callRemote('menuCheckboxChange', menuId, JSON.stringify({
            checked: checked,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
            },
        }));
    });

    yarp.nui[menuId].ItemSelect.on((item, index) => {
        mp.events.callRemote('menuItemSelect', menuId, JSON.stringify({
            index: index,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
            },
        }));
    });

    yarp.nui[menuId].SliderChange.on((item, index, value) => {
        mp.events.callRemote('menuSliderChange', menuId, JSON.stringify({
            index: index,
            value: value,
            item: {
                rightLabel: item.RightLabel,
                rightBadge: item.RightBadge,
                leftBadge: item.LeftBadge,
                text: item._text.caption,
                description: item.Description,
                item: item._itemText ? item._itemText.caption : null,
            },
        }));
    });

    yarp.nui[menuId].MenuClose.on(() => {
        mp.events.callRemote('menuClose', menuId);
    });

    yarp.nui[menuId].MenuChange.on((menu) => {
        mp.events.callRemote('menuChange', menuId, yarp.utils.circularJSON({menu: menu}));
    });


    yarp.nui[menuId].Close();
});

mp.events.add('toggleMenu', (menuId) => {
    if (yarp.nui[menuId].Visible) {
        yarp.nui[menuId].Close();
        mp.gui.chat.show(true);
    } else {
        yarp.nui[menuId].Open();
        mp.gui.cursor.visible = false;
        mp.gui.chat.show(false);
    }
});

mp.events.add('openMenu', (menuId) => {
    yarp.nui[menuId].Open();
    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
});

mp.events.add('closeMenu', (menuId) => {
    yarp.nui[menuId].Close();
    mp.gui.chat.show(true);
});

mp.events.add('menuAddItem', (menuId, itemJson) => {
    let item = JSON.parse(itemJson);
    menuAddItem(menuId, item);
});

mp.events.add('menuAddItems', (menuId, itemsJson) => {
    let items = JSON.parse(itemsJson);
    for (item of items) {
        menuAddItem(menuId, item);
    }
});
