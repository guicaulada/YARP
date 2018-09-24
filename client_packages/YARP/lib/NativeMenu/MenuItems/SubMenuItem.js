'use strict';
/**
 * Implements a submenu menu item.
 */
class SubMenuItem extends NativeMenu.MenuItem {
  /**
   * Creates an instance of SubMenuItem.
   * @extends {NativeMenu.MenuItem}
   * @param {String} displayText
   * @param {*} data
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {NativeMenu.Color} [textColor=new NativeMenu.Color(255, 255, 255, 240)]
   * @param {NativeMenu.Color} [backgroundColor=new NativeMenu.Color(0, 0, 0, 120)]
   * @param {NativeMenu.Color} [hoverTextColor=new NativeMenu.Color(0, 0, 0, 240)]
   * @param {NativeMenu.Color} [hoverBackgroundColor=new NativeMenu.Color(255, 255, 255, 170)]
   * @memberof SubMenuItem
   */
  constructor(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
    super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
    this.menu = new NativeMenu.Menu(false);
  }

  /**
   * Add item to the submenu.
   * @param {Object} menuItem A menu item object.
   * @memberof SubMenuItem
   */
  add(menuItem) {
    this.menu.add(menuItem);
  }

  /**
   * Renders the submenu if selected.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @param {Number} yCaption
   * @memberof SubMenuItem
   */
  render(x, y, yCaption) {
    if (this._isSelect) {
      this.menu.render(x + NativeMenu.MainMenu.MENU_WIDTH, y);
      if (Date.now() - NativeMenu.MainMenu.CONTROL_TICK_TIME_MS > NativeMenu.MainMenu.LAST_TICK_TIME) {
        if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_RIGHT)) {
          NativeMenu.MenuPool.displaySubMenu(this.menu);
        } else {
          if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_LEFT)) {
            NativeMenu.MenuPool.removeSubMenu(this.menu);
            NativeMenu.MainMenu.LAST_TICK_TIME = Date.now();
          }
        }
      }
    }
    this.draw(x, y, yCaption);
  }

  /**
   * Draws the menu.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @param {Number} yCaption
   * @memberof Menu
   */
  draw(x, y, yCaption) {
    super.draw(x, y, yCaption);
    NativeMenu.CommonMenuTexture.draw('arrowright', x + NativeMenu.MainMenu.MENU_DRAW_OFFSET_X - (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), (0.035 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
  }
}

exports = SubMenuItem;
