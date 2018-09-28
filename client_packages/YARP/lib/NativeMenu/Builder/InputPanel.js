'use strict';
/**
 * Implements a input panel.
 */
class InputPanel {
  /**
   * Creates an instance of InputPanel.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Number} maxTextLength
   * @param {*} [data={}]
   * @memberof InputPanel
   */
  constructor(x, y, width, height, maxTextLength, data = {}) {
    this.data = data;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.aX = NativeMenu.Prompt.res.x * this.x;
    this.aY = NativeMenu.Prompt.res.y * this.y;
    this.aWidth = NativeMenu.Prompt.res.x * this.width;
    this.aHeight = NativeMenu.Prompt.res.y * this.height;
    this.mouseCollision = false;
    this.mouseClicked = false;
    this.fontScale = [0.5, 0.5];
    this.fontScaleOffsetFix = 0.018;
    this.fontType = 4;
    this.fontOutline = false;
    // Functions
    this.onClickEvents = [];
    this.onSelectEvents = [];
    this.onChangeEvents = [];
    // Skin
    this.skin = new NativeMenu.Skin();
    // Input Text
    this.data.inputText = '';
    this.inputMaxLength = maxTextLength;
    this.inputMasked = false;
    // Disabled
    this.disabled = false;
  }

  /**
   * Add on click event to item.
   * @param {Function} onClickEvent
   * @memberof InputPanel
   */
  addOnClickEvent(onClickEvent) {
    this.onClickEvents.push(onClickEvent);
  }

  /**
   * Add on select event to item.
   * @param {Function} onSelectEvent
   * @memberof InputPanel
   */
  addOnSelectEvent(onSelectEvent) {
    this.onSelectEvents.push(onSelectEvent);
  }

  /**
   * Add on change event to item.
   * @param {Function} onChangeEvent
   * @memberof InputPanel
   */
  addOnChangeEvent(onChangeEvent) {
    this.onChangeEvents.push(onChangeEvent);
  }

  /**
   * Draw the panel.
   * @memberof InputPanel
   */
  draw() {
    this.collision();
    if (this.mouseCollision && !this.disabled) {
      mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.skin.backgroundHoverColor.red, this.skin.backgroundHoverColor.green, this.skin.backgroundHoverColor.blue, this.skin.backgroundHoverColor.alpha);
      mp.game.graphics.drawRect(this.x, this.y, this.width - (this.width / 8), this.height - (this.width / 8), this.skin.backgroundTextFieldColor.red, this.skin.backgroundTextFieldColor.green, this.skin.backgroundTextFieldColor.blue, this.skin.backgroundTextFieldColor.alpha); // W Box
      if (!this.inputMasked) {
        mp.game.graphics.drawText(this.data.inputText, [this.x, this.y - this.fontScaleOffsetFix], {
          font: this.fontType,
          centre: true,
          color: [this.skin.textHoverColor.red, this.skin.textHoverColor.green, this.skin.textHoverColor.blue, this.skin.textHoverColor.alpha],
          scale: [this.fontScale[0], this.fontScale[1]],
          outline: this.fontOutline,
        });
      } else {
        if (this.data.inputText.length <= 0) {
          return;
        }
        mp.game.graphics.drawText('*'.repeat(this.data.inputText.length), [this.x, this.y - this.fontScaleOffsetFix], {
          font: this.fontType,
          centre: true,
          color: [this.skin.textHoverColor.red, this.skin.textHoverColor.green, this.skin.textHoverColor.blue, this.skin.textHoverColor.alpha],
          scale: [this.fontScale[0], this.fontScale[1]],
          outline: this.fontOutline,
        });
      }
    } else {
      if (this.disabled) {
        mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.skin.backgroundColorDisabled.red, this.skin.backgroundColorDisabled.green, this.skin.backgroundColorDisabled.blue, this.skin.backgroundColorDisabled.alpha);
        mp.game.graphics.drawRect(this.x, this.y, this.width - (this.width / 8), this.height - (this.width / 8), this.skin.backgroundTextFieldColorDisabled.red, this.skin.backgroundTextFieldColorDisabled.green, this.skin.backgroundTextFieldColorDisabled.blue, this.skin.backgroundTextFieldColorDisabled.alpha); // W Box
        if (!this.inputMasked) {
          mp.game.graphics.drawText(this.data.inputText, [this.x, this.y - this.fontScaleOffsetFix], {
            font: this.fontType,
            centre: true,
            color: [this.skin.textColorDisabled.red, this.skin.textColorDisabled.green, this.skin.textColorDisabled.blue, this.skin.textColorDisabled.alpha],
            scale: [this.fontScale[0], this.fontScale[1]],
            outline: this.fontOutline,
          });
        } else {
          if (this.data.inputText.length <= 0) {
            return;
          }
          mp.game.graphics.drawText('*'.repeat(this.data.inputText.length), [this.x, this.y - this.fontScaleOffsetFix], {
            font: this.fontType,
            centre: true,
            color: [this.skin.textColorDisabled.red, this.skin.textColorDisabled.green, this.skin.textColorDisabled.blue, this.skin.textColorDisabled.alpha],
            scale: [this.fontScale[0], this.fontScale[1]],
            outline: this.fontOutline,
          });
        }
        return;
      }
      // Regular Draw
      mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.skin.backgroundColor.red, this.skin.backgroundColor.green, this.skin.backgroundColor.blue, this.skin.backgroundColor.alpha);
      mp.game.graphics.drawRect(this.x, this.y, this.width - (this.width / 8), this.height - (this.width / 8), 255, 255, 255, 255); // W Box
      if (!this.inputMasked) {
        mp.game.graphics.drawText(this.data.inputText, [this.x, this.y - this.fontScaleOffsetFix], {
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
        mp.game.graphics.drawText('*'.repeat(this.data.inputText.length), [this.x, this.y - this.fontScaleOffsetFix], {
          font: this.fontType,
          centre: true,
          color: [this.skin.textColor.red, this.skin.textColor.green, this.skin.textColor.blue, this.skin.textColor.alpha],
          scale: [this.fontScale[0], this.fontScale[1]],
          outline: this.fontOutline,
        });
      }
    }
  }

  /**
   * Used to handle the action after clicking the panel.
   * @memberof InputPanel
   */
  action() {
    if (!this.mouseCollision) return;
    if (this.disabled) return;
    NativeMenu.Sound.CONTINUE.playSound();
    NativeMenu.MenuPool.currentInputBox = this;
    for (let i = 1; i <= 0xFE; i++) {
      mp.keys.bind(i, true, () => {
        Prompt.keydown(i);
        this.onChangeEvents.forEach((event) => {
          event.trigger(this.data);
        });
      });
    }
    this.onClickEvents.forEach((event) => {
      event.trigger(this.data);
    });
  }

  /**
   * All the calculations are based off the centering of rectangles
   * Basically take the x position.
   * Times it by the screen solution to get the exact position.
   * Divide that by half to determine your offsets.
   * @memberof InputPanel
   */
  collision() {
    let mouse = mp.gui.cursor.position;
    let lastCollision = this.mouseCollision;
    if (mouse[0] > this.aX - (this.aWidth / 2) && mouse[0] < this.aX + (this.aWidth / 2) && mouse[1] > this.aY - (this.aHeight / 2) && mouse[1] < this.aY + (this.aHeight / 2)) {
      this.mouseCollision = true;
      NativeMenu.MenuPool.getCurrentMenu().hoveredButton = this;
      if (lastCollision != this.mouseCollision) {
        this.onSelectEvents.forEach((event) => {
          event.trigger(this.data);
        });
      }
      return;
    }
    this.mouseCollision = false;
  }
}

exports = InputPanel;
