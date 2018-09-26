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
   * @param {NativeMenu.Color} [textColor=new NativeMenu.Color(255, 255, 255, 255)]
   * @param {NativeMenu.Color} [backgroundColor=new NativeMenu.Color(242, 67, 67, 204)]
   * @param {NativeMenu.Color} [hoverTextColor=new NativeMenu.Color(255, 255, 255, 255)]
   * @param {NativeMenu.Color} [hoverBackgroundColor=new NativeMenu.Color(242, 67, 67, 255)]
   * @memberof CloseMenuItem
   */
  constructor(displayText, data, caption, badge, textColor = new NativeMenu.Color(255, 255, 255, 255), backgroundColor = new NativeMenu.Color(242, 67, 67, 204), hoverTextColor = new NativeMenu.Color(255, 255, 255, 255), hoverBackgroundColor = new NativeMenu.Color(242, 67, 67, 255)) {
    super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
  }
}

exports = CloseMenuItem;
