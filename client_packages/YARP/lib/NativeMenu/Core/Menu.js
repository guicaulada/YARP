'use strict';
/**
 * Implements a menu.
 */
class Menu {
  /**
   * Creates an instance of Menu.
   * @param {Boolean} [isVisible=true]
   * @memberof Menu
   */
  constructor(isVisible = true) {
    this.menuItems = [];
    this.currentIndexMenuItems = 0;
    this.onEventMenu = null;
    this._isVisible = isVisible;
    NativeMenu.MenuPool.MenuInstances.push(this);
  }

  /**
   * Add item to the menu.
   * @param {Object} menuItem A menu item object.
   * @memberof Menu
   */
  add(menuItem) {
    this.menuItems.push(menuItem);
    if (menuItem instanceof NativeMenu.CloseMenuItem) {
      menuItem.addOnClickEvent({
        trigger: () => {
          this.isVisible = false;
        },
      });
    }
  }

  /**
   * Set menu event.
   * @param {Function} eventMenu
   * @memberof Menu
   */
  setEventMenu(eventMenu) {
    this.onEventMenu = eventMenu;
  }

  /**
   * Renders the menu if visible.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @memberof Menu
   */
  render(x, y) {
    this.draw(x, y);
  }

  /**
   * Draws the menu.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @memberof Menu
   */
  draw(x, y) {
    if (this.currentIndexMenuItems >= NativeMenu.MainMenu.MAX_MENU_DISPLAY) {
      NativeMenu.CommonMenuTexture.draw('gradient_nav', x, y + NativeMenu.MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, NativeMenu.MainMenu.MENU_WIDTH, NativeMenu.MainMenu.MENU_ARROW_DOWN_HEIGHT, new NativeMenu.Color(0, 0, 0, 190), 90);
      NativeMenu.CommonMenuTexture.draw('arrowleft', x, y + NativeMenu.MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), new NativeMenu.Color(255, 255, 255, 200), 90);
      y += NativeMenu.MainMenu.MENU_ARROW_DOWN_HEIGHT;
    }
    let i = Math.max(0, this.currentIndexMenuItems + 1 - NativeMenu.MainMenu.MAX_MENU_DISPLAY);
    let to = Math.min(i + NativeMenu.MainMenu.MAX_MENU_DISPLAY, this.menuItems.length);
    let captionYOffset = y + ((to - i) * NativeMenu.MainMenu.MENU_HEIGHT); // + (0.02 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT);
    for (; i < to; i++) {
      this.menuItems[i].render(x, y, captionYOffset);
      y += NativeMenu.MainMenu.MENU_HEIGHT;
    }
    if (this.menuItems.length > NativeMenu.MainMenu.MAX_MENU_DISPLAY && this.currentIndexMenuItems < this.menuItems.length - 1) {
      NativeMenu.CommonMenuTexture.draw('gradient_nav', x, y + NativeMenu.MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, NativeMenu.MainMenu.MENU_WIDTH, NativeMenu.MainMenu.MENU_ARROW_DOWN_HEIGHT, new NativeMenu.Color(0, 0, 0, 190), 270);
      NativeMenu.CommonMenuTexture.draw('arrowleft', x, y + NativeMenu.MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), new NativeMenu.Color(255, 255, 255, 200), 270);
    }
  }

  /**
   * If the menu is visible or not.
   * @memberof Menu
   */
  get isVisible() {
    return this._isVisible;
  }

  /**
   * Sets if the menu is visible or not.
   * @param {Boolean} value If the menu is visible or not.
   * @memberof Menu
   */
  set isVisible(value) {
    this._isVisible = value;
    if (value) {
      this.setToItem(0);
      NativeMenu.Sound.SOUND_NAV_LEFT_RIGHT.playSound();
    } else {
      this.menuItems[this.currentIndexMenuItems].isSelect = false;
      NativeMenu.Sound.SOUND_BACK.playSound();
    }
  }

  /**
   * Selects item by index.
   * @param {Number} newIndex
   * @param {Boolean} [withSound=true]
   * @memberof Menu
   */
  setToItem(newIndex, withSound = true) {
    if (this.menuItems.length > 0) {
      this.menuItems[this.currentIndexMenuItems].isSelect = false;
      if (newIndex < 0) {
        newIndex = this.menuItems.length - 1;
      } else {
        newIndex %= this.menuItems.length;
      }
      if (withSound) {
        NativeMenu.Sound.SOUND_NAV_UP_DOWN.playSound();
      }
      this.currentIndexMenuItems = newIndex;
      this.menuItems[this.currentIndexMenuItems].isSelect = true;
      NativeMenu.MainMenu.LAST_TICK_TIME = new Date().getTime();
    }
  }
}

exports = Menu;
