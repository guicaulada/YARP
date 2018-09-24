'use strict';
/**
 * Creates menu badge dictionary.
 * @memberof NativeMenu
 */
let MenuBadge = {};

MenuBadge[MenuBadge['MEDAL_BRONZE'] = 0] = 'MEDAL_BRONZE';
MenuBadge[MenuBadge['MEDAL_GOLD'] = 1] = 'MEDAL_GOLD';
MenuBadge[MenuBadge['MEDAL_SILVER'] = 2] = 'MEDAL_SILVER';
MenuBadge[MenuBadge['MP_ALERTTRIANGLE'] = 3] = 'MP_ALERTTRIANGLE';
MenuBadge[MenuBadge['MP_HOSTCROWN'] = 4] = 'MP_HOSTCROWN';
MenuBadge[MenuBadge['MP_MEDAL_BRONZE'] = 5] = 'MP_MEDAL_BRONZE';
MenuBadge[MenuBadge['MP_MEDAL_GOLD'] = 6] = 'MP_MEDAL_GOLD';
MenuBadge[MenuBadge['MP_MEDAL_SILVER'] = 7] = 'MP_MEDAL_SILVER';
MenuBadge[MenuBadge['MP_SPECITEM_CASH'] = 8] = 'MP_SPECITEM_CASH';
MenuBadge[MenuBadge['MP_SPECITEM_COKE'] = 9] = 'MP_SPECITEM_COKE';
MenuBadge[MenuBadge['MP_SPECITEM_HEROIN'] = 10] = 'MP_SPECITEM_HEROIN';
MenuBadge[MenuBadge['MP_SPECITEM_METH'] = 11] = 'MP_SPECITEM_METH';
MenuBadge[MenuBadge['MP_SPECITEM_WEED'] = 12] = 'MP_SPECITEM_WEED';
MenuBadge[MenuBadge['SHOP_AMMO'] = 13] = 'SHOP_AMMO';
MenuBadge[MenuBadge['SHOP_ARMOUR'] = 14] = 'SHOP_ARMOUR';
MenuBadge[MenuBadge['SHOP_ARROWS_UPANDDOWN'] = 15] = 'SHOP_ARROWS_UPANDDOWN';
MenuBadge[MenuBadge['SHOP_BARBER'] = 16] = 'SHOP_BARBER';
MenuBadge[MenuBadge['SHOP_BOX_BLANK'] = 17] = 'SHOP_BOX_BLANK';
MenuBadge[MenuBadge['SHOP_BOX_CROSS'] = 18] = 'SHOP_BOX_CROSS';
MenuBadge[MenuBadge['SHOP_BOX_TICK'] = 19] = 'SHOP_BOX_TICK';
MenuBadge[MenuBadge['SHOP_CLOTHING'] = 20] = 'SHOP_CLOTHING';
MenuBadge[MenuBadge['SHOP_FRANKLIN'] = 21] = 'SHOP_FRANKLIN';
MenuBadge[MenuBadge['SHOP_GARAGE_BIKE'] = 22] = 'SHOP_GARAGE_BIKE';
MenuBadge[MenuBadge['SHOP_GARAGE'] = 23] = 'SHOP_GARAGE';
MenuBadge[MenuBadge['SHOP_GUNCLUB'] = 24] = 'SHOP_GUNCLUB';
MenuBadge[MenuBadge['SHOP_HEALTH'] = 25] = 'SHOP_HEALTH';
MenuBadge[MenuBadge['SHOP_LOCK'] = 26] = 'SHOP_LOCK';
MenuBadge[MenuBadge['SHOP_MAKEUP'] = 27] = 'SHOP_MAKEUP';
MenuBadge[MenuBadge['SHOP_MASK'] = 28] = 'SHOP_MASK';
MenuBadge[MenuBadge['SHOP_MICHAEL'] = 29] = 'SHOP_MICHAEL';
MenuBadge[MenuBadge['SHOP_NEW_STAR'] = 30] = 'SHOP_NEW_STAR';
MenuBadge[MenuBadge['SHOP_TATTOOS'] = 31] = 'SHOP_TATTOOS';
MenuBadge[MenuBadge['SHOP_TICK_ICON'] = 32] = 'SHOP_TICK_ICON';
MenuBadge[MenuBadge['SHOP_TREVOR'] = 33] = 'SHOP_TREVOR';

/**
 * Returns different badge name for hovered sprites.
 * @function menuBadgeToSpriteName
 * @param {Number} badge Badge number
 * @param {Boolean} isHover If badge is hovered
 * @return {String} Modified badge name
 * @memberof MenuBadge
 */
MenuBadge.menuBadgeToSpriteName = (badge, isHover = false) => {
  let result = MenuBadge[badge].toString().toLowerCase();
  switch (badge) {
    case MenuBadge.SHOP_AMMO:
    case MenuBadge.SHOP_ARMOUR:
    case MenuBadge.SHOP_ARROWS_UPANDDOWN:
    case MenuBadge.SHOP_BARBER:
    case MenuBadge.SHOP_CLOTHING:
    case MenuBadge.SHOP_FRANKLIN:
    case MenuBadge.SHOP_GARAGE_BIKE:
    case MenuBadge.SHOP_GARAGE:
    case MenuBadge.SHOP_GUNCLUB:
    case MenuBadge.SHOP_HEALTH:
    case MenuBadge.SHOP_MAKEUP:
    case MenuBadge.SHOP_MASK:
    case MenuBadge.SHOP_MICHAEL:
    case MenuBadge.SHOP_TATTOOS:
    case MenuBadge.SHOP_TREVOR:
      return isHover ? result + '_icon_a' : result + '_icon_b';
    case MenuBadge.SHOP_BOX_BLANK:
    case MenuBadge.SHOP_BOX_CROSS:
    case MenuBadge.SHOP_BOX_TICK:
      return isHover ? result + 'b' : result;
    default:
      return result;
  }
};

exports = MenuBadge;
