'use strict';
/**
 * Implements a menu pool.
 */
class MenuPool {
  /**
   * @abstract
   * @throws {TypeError} Abstract class MenuPool cannot be instantiated directly.
   * @memberof MenuPool
   */
  constructor() {
    if (this.constructor === MenuPool) {
      throw new TypeError('Abstract class MenuPool cannot be instantiated directly.');
    }
  }

  /**
   * Returns current menu.
   * @static
   * @return {NativeMenu.Menu} Current menu.
   * @memberof MenuPool
   */
  static getCurrentMenu() {
    let visibleMenus = MenuPool.MenuInstances.filter((value) => value.isVisible);
    return visibleMenus[visibleMenus.length - 1];
  }

  /**
   * Displays submenu on screen.
   * @static
   * @param {NativeMenu.SubMenuItem} menu
   * @memberof MenuPool
   */
  static displaySubMenu(menu) {
    if (MenuPool.MenuInstances.indexOf(menu) == -1) {
      MenuPool.MenuInstances.push(menu);
    }
    menu.isVisible = true;
  }

  /**
   * Removes submenu from screen.
   * @static
   * @param {NativeMenu.SubMenuItem} menu
   * @memberof MenuPool
   */
  static removeSubMenu(menu) {
    if (MenuPool.MenuInstances.indexOf(menu) != -1) {
      MenuPool.MenuInstances.splice(MenuPool.MenuInstances.indexOf(menu), 1);
      menu.isVisible = false;
    }
  }
}

MenuPool.MenuInstances = [];

exports = MenuPool;
