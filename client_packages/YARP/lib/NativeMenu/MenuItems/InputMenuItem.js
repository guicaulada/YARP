'use strict';
/**
 * Implements a input menu item.
 */
class InputMenuItem extends NativeMenu.MenuItem {
  /**
   * Creates an instance of InputMenuItem.
   * @extends {NativeMenu.MenuItem}
   * @param {String} displayText
   * @param {Boolean} [masked=false]
   * @param {Number} [max=25]
   * @param {Number} [text='']
   * @param {String} [caption='']
   * @param {Number} [badge=NaN]
   * @param {*} data
   * @memberof InputMenuItem
   */
  constructor(displayText, masked = false, max = 10, text = '', caption, badge, data) {
    super(displayText, caption, badge, data);
    this.firstRender = true;
    this.onChangeEvents = [];
    this.data.inputText = text;
    this.inputMaxLength = max;
    this.inputMasked = masked;
    this.fontScale = [0.25, 0.25];
    this.fontScaleOffsetFix = 0.009;
    this.fontType = 4;
    this.fontOutline = false;
    this.addOnSelectEvent({
      trigger: (data) => {
        if (this.disabled) return;
        NativeMenu.MenuPool.currentInputBox = this;
        yarp.hotkeys.disabled = true;
      },
    });
  }

  /**
   * Add on change event to item.
   * @param {Function} onChangeEvent
   * @memberof InputMenuItem
   */
  addOnChangeEvent(onChangeEvent) {
    this.onChangeEvents.push(onChangeEvent);
  }

  /**
   * Renders the item.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @param {Number} yCaption
   * @memberof InputMenuItem
   */
  render(x, y, yCaption) {
    if (!this._isSelect && Date.now() - NativeMenu.MainMenu.CONTROL_TICK_TIME_MS > NativeMenu.MainMenu.LAST_TICK_TIME) {
      if (NativeMenu.MenuPool.currentInputBox == this) {
        NativeMenu.MenuPool.currentInputBox = null;
        yarp.hotkeys.disabled = false;
      }
    }
    super.render(x, y, yCaption);
  }

  /**
   * Draws the item.
   * @param {Number} x Offset from left 0 to 1.
   * @param {Number} y Offset from top 0 to 1.
   * @param {Number} yCaption
   * @memberof InputMenuItem
   */
  draw(x, y, yCaption) {
    super.draw(x, y, yCaption);
    let xMargin = (0.015 * NativeMenu.MainMenu.SCREEN_RATIO_WIDTH);
    let xOffset = x + NativeMenu.MainMenu.MENU_DRAW_OFFSET_X - xMargin;
    let inputWidth = NativeMenu.MainMenu.MENU_WIDTH / 2.5;
    let inputHeight = NativeMenu.MainMenu.MENU_HEIGHT / 2.5;
    let xPosition = xOffset - (inputWidth / 2);
    mp.game.graphics.drawRect(xPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y, inputWidth, inputHeight, this.skin.backgroundTextFieldColor.red, this.skin.backgroundTextFieldColor.green, this.skin.backgroundTextFieldColor.blue, this.skin.backgroundTextFieldColor.alpha);
    if (!this.inputMasked) {
      mp.game.graphics.drawText(this.data.inputText, [xPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y - this.fontScaleOffsetFix], {
        font: this.fontType,
        centre: true,
        color: [this.skin.textColor.red, this.skin.textColor.green, this.skin.textColor.blue, this.skin.textColor.alpha],
        scale: [this.fontScale[0], this.fontScale[1]],
        outline: this.fontOutline,
      });
    } else {
      if (this.data.inputText.length <= 0) {
        return;
      }
      mp.game.graphics.drawText('*'.repeat(this.data.inputText.length), [xPosition, y + NativeMenu.MainMenu.MENU_DRAW_OFFSET_Y - this.fontScaleOffsetFix + 0.0025], {
        font: this.fontType,
        centre: true,
        color: [this.skin.textColor.red, this.skin.textColor.green, this.skin.textColor.blue, this.skin.textColor.alpha],
        scale: [this.fontScale[0], this.fontScale[1]],
        outline: this.fontOutline,
      });
    }
  }

  /**
   * Sets input to value.
   * @param {Number} newValue
   * @memberof InputMenuItem
   */
  setToValue(newValue) {
    this.data.inputText = newValue;
  }
}

exports = InputMenuItem;
