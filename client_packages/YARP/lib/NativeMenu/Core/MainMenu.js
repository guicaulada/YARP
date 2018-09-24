'use strict';
/**
 * Implements a main menu.
 */
class MainMenu extends NativeMenu.Menu {
  /**
   *Creates an instance of MainMenu.
   * @extends {NativeMenu.Menu}
   * @param {String} [title='']
   * @param {Boolean} [isVisible=true]
   * @memberof MainMenu
   */
  constructor(title = '', isVisible = true) {
    super(isVisible);
    this.title = title;
    this.firstRender = true;
    this.textureDict = NativeMenu.CommonMenuTexture;
    this.textureSprite = 'interaction_bgd';
  }

  /**
   * Sets menu title
   * @param {String} value Title
   * @memberof MainMenu
   */
  set title(value) {
    this._title = value;
  }

  /**
   * Sets title texture.
   * @param {String} dict Dictionary name.
   * @param {*} sprite Sprite name.
   * @memberof MainMenu
   */
  setTitleTexture(dict, sprite) {
    this.textureDict = new NativeMenu.TextureDictionary(dict, [sprite]);
    this.textureSprite = sprite;
  }

  /**
   * Renders the menu if visible.
   * @param {Number} x Offset from left 0 to 1
   * @param {Number} y Offset from top 0 to 1
   * @memberof MainMenu
   */
  render(x, y) {
    if (this.isVisible) {
      if (this.firstRender) {
        this.setToItem(0, false);
        this.firstRender = false;
      }
      this.setResolutionRatio();
      if (x < MainMenu.MENU_DRAW_OFFSET_X) {
        x += MainMenu.MENU_DRAW_OFFSET_X;
      }
      if (y < MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y) {
        y += MainMenu.MAIN_MENU_HEIGHT;
      }
      x = Math.min(x, 1 - MainMenu.MENU_DRAW_OFFSET_X);
      y = Math.min(y, 1 - MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y);
      this.textureDict.draw(this.textureSprite, x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT, new NativeMenu.Color(255, 255, 255, 255), 0);
      yarp.utils.client.drawText(this._title, [x, y - (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y / 2)], new NativeMenu.Color(), 1, [1, 1], true);
      y += (MainMenu.MAIN_MENU_HEIGHT / 2);
      if (Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
        if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_DOWN)) {
          let menuInstance = NativeMenu.MenuPool.getCurrentMenu();
          menuInstance.setToItem(menuInstance.currentIndexMenuItems + 1);
        } else {
          if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_UP)) {
            let menuInstance = NativeMenu.MenuPool.getCurrentMenu();
            menuInstance.setToItem(menuInstance.currentIndexMenuItems - 1);
          }
        }
      }
      super.render(x, y);
    }
  }

  /**
   * Opens menu.
   * @memberof MainMenu
   */
  open() {
    this.isVisible = true;
  }
  /**
   * Closes menu.
   * @memberof MainMenu
   */
  close() {
    this.isVisible = false;
  }
  /**
   * Sets main menu resolution ratio.
   * @memberof MainMenu
   */
  setResolutionRatio() {
    MainMenu.SCREEN_RATIO_WIDTH = 1024 / mp.game.graphics.getScreenActiveResolution(0, 0).x;
    MainMenu.SCREEN_RATIO_HEIGHT = 768 / mp.game.graphics.getScreenActiveResolution(0, 0).y;
    MainMenu.MENU_WIDTH = 0.27 * MainMenu.SCREEN_RATIO_WIDTH;
    MainMenu.MENU_WIDTH = Math.max(MainMenu.MENU_WIDTH, yarp.utils.client.getTextWidth(this._title, 1, [1, 1]) + MainMenu.MENU_WIDTH / 5);
    MainMenu.MENU_HEIGHT = 0.04 * MainMenu.SCREEN_RATIO_HEIGHT;
    MainMenu.MAIN_MENU_HEIGHT = MainMenu.MENU_HEIGHT * 2.5;
    MainMenu.MENU_DRAW_OFFSET_X = MainMenu.MENU_WIDTH / 2;
    MainMenu.MENU_DRAW_OFFSET_Y = MainMenu.MENU_HEIGHT / 2;
    MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y = MainMenu.MAIN_MENU_HEIGHT / 2;
    MainMenu.MENU_ARROW_DOWN_HEIGHT = MainMenu.MENU_HEIGHT / 3;
  }
}

MainMenu.MAX_MENU_DISPLAY = 8;
MainMenu.CONTROL_TICK_TIME_MS = 150;
MainMenu.LAST_TICK_TIME = Date.now();

exports = MainMenu;
