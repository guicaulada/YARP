'use strict';
/**
 * Implements a list menu item.
 */
class ListMenuItem extends NativeMenu.MenuItem {
  /**
   *Creates an instance of ListMenuItem.
   * @extends {NativeMenu.MenuItem}
   * @param {String} displayText
   * @param {Array<MenuItem>} [items=[]]
   * @param {Number} [defaultIndex=0]
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {*} [data={}]
   * @memberof ListMenuItem
   */
  constructor(displayText, items = [], defaultIndex = 0, caption, badge, data) {
    super(displayText, caption, badge, data);
    this.items = items;
    this.onChangeEvents = [];
    this.firstRender = true;
    this.isSet = false;
    this.defaultIndex = defaultIndex;
  }

  /**
   * Add on change event to item.
   * @param {Function} onChangeEvent
   * @memberof ListMenuItem
   */
  addOnChangeEvent(onChangeEvent) {
    this.onChangeEvents.push(onChangeEvent);
  }

  /**
   * Render the item.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @param {Number} yCaption
   * @memberof ListMenuItem
   */
  render(x, y, yCaption) {
    if (this.items.length > 0) {
      if (this.firstRender) {
        this.setToItem(this.defaultIndex, false);
        this.firstRender = false;
      }
      if (this._isSelect && Date.now() - NativeMenu.MainMenu.CONTROL_TICK_TIME_MS > NativeMenu.MainMenu.LAST_TICK_TIME) {
        if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_RIGHT)) {
          this.setToItem(this.itemsCurrentIndex + 1);
        } else {
          if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_LEFT)) {
            this.setToItem(this.itemsCurrentIndex - 1);
          }
        }
      }
    }
    super.render(x, y, yCaption);
  }

  /**
   * Draws the item.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @param {Number} yCaption
   * @memberof ListMenuItem
   */
  draw(x, y, yCaption) {
    super.draw(x, y, yCaption);
    if (this.items.length > 0) {
      if (!isNaN(this.itemsCurrentIndex) && this.items[this.itemsCurrentIndex].displayText != null) {
        let xRightArrowPosition = x + NativeMenu.MainMenu.MENU_DRAW_OFFSET_X - (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH);
        let xLeftArrowPosition = xRightArrowPosition - yarp.utils.client.getTextWidth(this.items[this.itemsCurrentIndex].displayText) - (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH);
        NativeMenu.CommonMenuTexture.draw('arrowleft', xLeftArrowPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), (0.035 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
        NativeMenu.CommonMenuTexture.draw('arrowright', xRightArrowPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), (0.035 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
        yarp.utils.client.drawText(this.items[this.itemsCurrentIndex].displayText, [(xLeftArrowPosition + xRightArrowPosition) / 2, y + (0.005 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT)], this.textColor, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), [0.35, 0.35], true);
      }
    }
  }

  /**
   * Sets list item by index.
   * @param {Number} newIndex
   * @param {Boolean} [withSound=true]
   * @memberof ListMenuItem
   */
  setToItem(newIndex, withSound = true) {
    if (newIndex < 0) {
      this.itemsCurrentIndex = this.items.length - 1;
    } else {
      this.itemsCurrentIndex = newIndex % this.items.length;
    }
    if (withSound) {
      NativeMenu.Sound.NAV_LEFT_RIGHT.playSound();
    }
    this.data.item = this.items[this.itemsCurrentIndex];
    NativeMenu.MainMenu.LAST_TICK_TIME = Date.now();
    if (this.isSet) {
      this.onChangeEvents.forEach((value) => {
        value.trigger(this.data);
      });
    }
    this.isSet = true;
  }
}

exports = ListMenuItem;
