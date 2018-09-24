'use strict';
/**
 * Implements a checkbox menu item.
 */
class CheckboxMenuItem extends NativeMenu.MenuItem {
  /**
   *Creates an instance of CheckboxMenuItem.
   * @extends {NativeMenu.MenuItem}
   * @param {String} displayText
   * @param {Boolean} [data=false]
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {NativeMenu.Color} [textColor=new NativeMenu.Color(255, 255, 255, 240)]
   * @param {NativeMenu.Color} [backgroundColor=new NativeMenu.Color(0, 0, 0, 120)]
   * @param {NativeMenu.Color} [hoverTextColor=new NativeMenu.Color(0, 0, 0, 240)]
   * @param {NativeMenu.Color} [hoverBackgroundColor=new NativeMenu.Color(255, 255, 255, 170)]
   * @memberof CheckboxMenuItem
   */
  constructor(displayText, data = false, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
    super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
    this.addOnClickEvent({
      trigger: (data) => {
        this.data = !this.data;
      },
    });
  }

  /**
   *
   *
   * @param {*} x
   * @param {*} y
   * @param {*} yCaption
   * @memberof CheckboxMenuItem
   */
  draw(x, y, yCaption) {
    super.draw(x, y, yCaption);
    NativeMenu.CommonMenuTexture.draw(this.data ? 'shop_box_tick' : 'shop_box_blank', x + NativeMenu.MainMenu.MENU_DRAW_OFFSET_X - (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), (0.035 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), new NativeMenu.Color(), 0);
  }
}

exports = CheckboxMenuItem;
