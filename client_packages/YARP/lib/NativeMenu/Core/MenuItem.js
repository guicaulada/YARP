'use strict';
/**
 * Implements a menu item.
 * @class MenuItem
 */
class MenuItem {
  /**
   *Creates an instance of MenuItem.
   * @param {String} displayText
   * @param {*} data
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {NativeMenu.Color} [textColor=new NativeMenu.Color(255, 255, 255, 240)]
   * @param {NativeMenu.Color} [backgroundColor=new NativeMenu.Color(0, 0, 0, 120)]
   * @param {NativeMenu.Color} [hoverTextColor=new NativeMenu.Color(0, 0, 0, 240)]
   * @param {NativeMenu.Color} [hoverBackgroundColor=new NativeMenu.Color(255, 255, 255, 170)]
   * @memberof MenuItem
   */
  constructor(displayText, data, caption = '', badge = NaN, textColor = new NativeMenu.Color(255, 255, 255, 240), backgroundColor = new NativeMenu.Color(0, 0, 0, 120), hoverTextColor = new NativeMenu.Color(0, 0, 0, 240), hoverBackgroundColor = new NativeMenu.Color(255, 255, 255, 170)) {
    this.displayText = displayText;
    this.data = data;
    this.caption = caption;
    this.badge = badge;
    this._textColor = textColor;
    this._backgroundColor = backgroundColor;
    this._hoverTextColor = hoverTextColor;
    this._hoverBackgroundColor = hoverBackgroundColor;
    this._isSelect = false;
    this.onClickEvents = [];
    this.onSelectEvents = [];
  }

  /**
   * Set item as selected.
   * @param {Boolean} value If item is selected or not.
   * @memberof MenuItem
   */
  set isSelect(value) {
    this._isSelect = value;
    if (this._isSelect && !(this instanceof NativeMenu.CloseMenuItem)) {
      this.onSelectEvents.forEach((event) => {
        event.trigger(this instanceof NativeMenu.ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
      });
      let currentMenuInstance = NativeMenu.MenuPool.getCurrentMenu();
      if (currentMenuInstance.onEventMenu != null && typeof currentMenuInstance.onEventMenu.select !== 'undefined') {
        currentMenuInstance.onEventMenu.select(this, this instanceof NativeMenu.ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
      }
    }
  }

  /**
   * Add on click event to item.
   * @param {Function} onClickEvent
   * @memberof MenuItem
   */
  addOnClickEvent(onClickEvent) {
    this.onClickEvents.push(onClickEvent);
  }

  /**
   * Add on select event to item.
   * @param {Function} onSelectEvent
   * @memberof MenuItem
   */
  addOnSelectEvent(onSelectEvent) {
    this.onSelectEvents.push(onSelectEvent);
  }

  /**
   * Renders item on screen.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} yCaption
   * @memberof MenuItem
   */
  render(x, y, yCaption) {
    this.draw(x, y, yCaption);
    if (this._isSelect && Date.now() - NativeMenu.MainMenu.CONTROL_TICK_TIME_MS > NativeMenu.MainMenu.LAST_TICK_TIME) {
      if (mp.game.controls.isControlJustReleased(0, NativeMenu.Control.INPUT_FRONTEND_ACCEPT)) {
        NativeMenu.Sound.SOUND_SELECT.playSound();
        this.onClickEvents.forEach((event) => {
          event.trigger(this instanceof NativeMenu.ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
        });
        if (!(this instanceof NativeMenu.CloseMenuItem)) {
          let currentMenuInstance = NativeMenu.MenuPool.getCurrentMenu();
          if (currentMenuInstance.onEventMenu != null && typeof currentMenuInstance.onEventMenu.click !== 'undefined') {
            currentMenuInstance.onEventMenu.click(this, this instanceof NativeMenu.ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
          }
        }
        NativeMenu.MainMenu.LAST_TICK_TIME = Date.now();
      }
    }
  }

  /**
   * Draws item on screen.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} yCaption
   * @memberof MenuItem
   */
  draw(x, y, yCaption) {
    mp.game.graphics.drawRect(x, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, NativeMenu.MainMenu.MENU_WIDTH, NativeMenu.MainMenu.MENU_HEIGHT, this.backgroundColor.red, this.backgroundColor.green, this.backgroundColor.blue, this.backgroundColor.alpha);
    let xOffset = x - NativeMenu.MainMenu.MENU_DRAW_OFFSET_X + (0.004 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH);
    if (!isNaN(this.badge)) {
      NativeMenu.CommonMenuTexture.draw(NativeMenu.MenuBadge.menuBadgeToSpriteName(this.badge, this._isSelect), x - NativeMenu.MainMenu.MENU_DRAW_OFFSET_X + (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), (0.035 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), new NativeMenu.Color(160, 160, 160), 0);
      xOffset += (0.023 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH);
    }
    yarp.utils.client.drawText(this.displayText, [xOffset, y + (0.005 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT)], this.textColor);
    if (this._isSelect && this.caption.length > 0) {
      let numberOfLine = Math.ceil(yarp.utils.client.getTextWidth(this.caption) / NativeMenu.MainMenu.MENU_WIDTH);
      let textLengthPerLine = this.caption.length / numberOfLine;
      let textureHeight = NativeMenu.MainMenu.MENU_HEIGHT * numberOfLine;
      NativeMenu.CommonMenuTexture.draw('gradient_nav', x, yCaption + textureHeight / 2, NativeMenu.MainMenu.MENU_WIDTH, textureHeight, new NativeMenu.Color(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, 220), 270);
      for (let i = 0; i < numberOfLine; i++) {
        yarp.utils.client.drawText(this.caption.substring(i * textLengthPerLine, (i + 1) * textLengthPerLine), [x - NativeMenu.MainMenu.MENU_DRAW_OFFSET_X + (0.004 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH), yCaption + (0.005 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT) + i * NativeMenu.MainMenu.MENU_HEIGHT], this._textColor);
      }
    }
  }

  /**
   * Returns hover text color.
   * @memberof MenuItem
   */
  get hoverTextColor() {
    return this._hoverTextColor;
  }

  /**
   * Sets hover text color.
   * @param {NativeMenu.Color} value
   * @memberof MenuItem
   */
  set hoverTextColor(value) {
    this._hoverTextColor = value;
  }

  /**
   * Returns hover background color.
   * @memberof MenuItem
   */
  get hoverBackgroundColor() {
    return this._hoverBackgroundColor;
  }

  /**
   * Sets hover background color.
   * @param {NativeMenu.Color} value
   * @memberof MenuItem
   */
  set hoverBackgroundColor(value) {
    this._hoverBackgroundColor = value;
  }

  /**
   * Returns text color.
   * @memberof MenuItem
   */
  get textColor() {
    return this._isSelect ? this._hoverTextColor : this._textColor;
  }

  /**
   * Sets text color.
   * @param {NativeMenu.Color} value
   * @memberof MenuItem
   */
  set textColor(value) {
    this._textColor = value;
  }

  /**
   * Returns background color.
   * @memberof MenuItem
   */
  get backgroundColor() {
    return this._isSelect ? this._hoverBackgroundColor : this._backgroundColor;
  }

  /**
   * Sets background color.
   * @param {NativeMenu.Color} value
   * @memberof MenuItem
   */
  set backgroundColor(value) {
    this._backgroundColor = value;
  }
}

exports = MenuItem;
