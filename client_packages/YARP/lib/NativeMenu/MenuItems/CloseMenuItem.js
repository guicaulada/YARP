'use strict';
/**
 * Implements a close menu item.
 */
class CloseMenuItem extends NativeMenu.TextMenuItem {
  /**
   *Creates an instance of CloseMenuItem.
   * @extends {NativeMenu.MenuItem}
   * @param {String} displayText
   * @param {*} data
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {NativeMenu.Color} [textColor=new NativeMenu.Color(255, 255, 255, 240)]
   * @param {NativeMenu.Color} [backgroundColor=new NativeMenu.Color(0, 0, 0, 120)]
   * @param {NativeMenu.Color} [hoverTextColor=new NativeMenu.Color(0, 0, 0, 240)]
   * @param {NativeMenu.Color} [hoverBackgroundColor=new NativeMenu.Color(255, 255, 255, 170)]
   * @memberof CloseMenuItem
   */
  constructor(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
    super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
  }
}

exports = CloseMenuItem;
