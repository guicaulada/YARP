'use strict';
/**
 * Implements a close menu item.
 */
class CloseMenuItem extends NativeMenu.TextMenuItem {
  /**
   *Creates an instance of CloseMenuItem.
   * @extends {NativeMenu.MenuItem}
   * @param {String} displayText
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {*} data
   * @memberof CloseMenuItem
   */
  constructor(displayText, caption, badge, data) {
    super(displayText, caption, badge, data);
  }
}

exports = CloseMenuItem;
