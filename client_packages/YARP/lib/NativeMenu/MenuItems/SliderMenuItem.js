'use strict';
/**
 * Implements a slider menu item.
 */
class SliderMenuItem extends NativeMenu.MenuItem {
  /**
   * Creates an instance of SliderMenuItem.
   * @extends {NativeMenu.MenuItem}
   * @param {String} displayText
   * @param {Number} [min=1]
   * @param {Number} [max=3]
   * @param {Number} [step=1]
   * @param {Number} [start=Math.floor((min + max) / 2)]
   * @param {*} data
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {NativeMenu.Color} [textColor=new NativeMenu.Color(255, 255, 255, 240)]
   * @param {NativeMenu.Color} [backgroundColor=new NativeMenu.Color(0, 0, 0, 120)]
   * @param {NativeMenu.Color} [hoverTextColor=new NativeMenu.Color(0, 0, 0, 240)]
   * @param {NativeMenu.Color} [hoverBackgroundColor=new NativeMenu.Color(255, 255, 255, 170)]
   * @memberof SliderMenuItem
   */
  constructor(displayText, min=1, max=3, step=1, start = Math.floor((min + max) / 2), data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
    super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
    this.min = min;
    this.max = max;
    this.step = step;
    this.start = start;
    this.firstRender = true;
    this.onChangeEvents = [];
  }

  /**
   * Add on change event to item.
   * @param {Function} onChangeEvent
   * @memberof SliderMenuItem
   */
  addOnChangeEvent(onChangeEvent) {
    this.onChangeEvents.push(onChangeEvent);
  }

  /**
   * Renders the item.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @param {Number} yCaption
   * @memberof SliderMenuItem
   */
  render(x, y, yCaption) {
    if (this.firstRender) {
      this.setToValue(this.start, false);
      this.firstRender = false;
    }
    if (this._isSelect && Date.now() - NativeMenu.MainMenu.CONTROL_TICK_TIME_MS > NativeMenu.MainMenu.LAST_TICK_TIME) {
      if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_RIGHT)) {
        this.setToValue(this.start + this.step);
      } else {
        if (mp.game.controls.isControlPressed(0, NativeMenu.Control.INPUT_CELLPHONE_LEFT)) {
          this.setToValue(this.start - this.step);
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
   * @memberof SliderMenuItem
   */
  draw(x, y, yCaption) {
    super.draw(x, y, yCaption);
    let xMargin = (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH);
    let xOffset = x + NativeMenu.MainMenu.MENU_DRAW_OFFSET_X - xMargin;
    let sliderWidth = NativeMenu.MainMenu.MENU_WIDTH / 2.5;
    let sliderHeight = NativeMenu.MainMenu.MENU_HEIGHT / 4;
    let xPosition = xOffset - (sliderWidth / 2);
    mp.game.graphics.drawRect(xPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, sliderWidth, sliderHeight, 52, 73, 94, 255);
    let xDataPosition = xOffset - sliderWidth + (sliderWidth / ((this.max - this.min) / this.step) * ((this.start + Math.abs(this.min)) / this.step));
    mp.game.graphics.drawRect(xDataPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, 0.004, sliderHeight * 2, this.textColor.red, this.textColor.green, this.textColor.blue, this.textColor.alpha);
    let arrowWidth = (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH);
    let xLeftArrowPosition = xOffset - sliderWidth - (arrowWidth / 2);
    NativeMenu.CommonMenuTexture.draw('arrowleft', xLeftArrowPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, arrowWidth, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
    NativeMenu.CommonMenuTexture.draw('arrowright', xOffset + (arrowWidth / 2), y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, arrowWidth, (0.025 * NativeMenu.MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
  }

  /**
   * Sets slider to value.
   * @param {Number} newValue
   * @param {Boolean} [withSound=true]
   * @memberof SliderMenuItem
   */
  setToValue(newValue, withSound = true) {
    if (newValue < this.min) {
      this.start = this.max;
    } else {
      if (newValue > this.max) {
        this.start = this.min;
      } else {
        this.start = newValue;
      }
    }
    if (withSound) {
      NativeMenu.Sound.NAV_LEFT_RIGHT.playSound();
    }
    NativeMenu.MainMenu.LAST_TICK_TIME = Date.now();
    this.onChangeEvents.forEach((value) => {
      value.trigger(this.start);
    });
  }
}

exports = SliderMenuItem;
