'use strict';
/**
 * Implements a button.
 */
class Button {
  /**
   * Creates an instance of Button.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {String} text
   * @param {*} [data={}]
   * @memberof Button
   */
  constructor(x, y, width, height, text, data = {}) {
    this.data = data;
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.aX = NativeMenu.Prompt.res.x * this.x;
    this.aY = NativeMenu.Prompt.res.y * this.y;
    this.aWidth = NativeMenu.Prompt.res.x * this.width;
    this.aHeight = NativeMenu.Prompt.res.y * this.height;
    // booleans
    this.mouseCollision = false;
    this.mouseClicked = false;
    this.fontScale = [0.5, 0.5];
    this.fontScaleOffsetFix = 0.018;
    this.fontType = 4;
    this.fontOutline = false;
    // Functions
    this.onClickEvents = [];
    this.onSelectEvents = [];
    // Skin
    this.skin = new NativeMenu.Skin();
    this.disabled = false;
  }

  /**
   * Add on click event to item.
   * @param {Function} onClickEvent
   * @memberof Button
   */
  addOnClickEvent(onClickEvent) {
    this.onClickEvents.push(onClickEvent);
  }

  /**
   * Add on select event to item.
   * @param {Function} onSelectEvent
   * @memberof Button
   */
  addOnSelectEvent(onSelectEvent) {
    this.onSelectEvents.push(onSelectEvent);
  }

  /**
   * Draw the button.
   * @memberof Button
   */
  draw() {
    this.collision();
    if (this.mouseCollision && !this.disabled) {
      // Not Disabled / Hovered Draw
      mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.skin.backgroundHoverColor.red, this.skin.backgroundHoverColor.green, this.skin.backgroundHoverColor.blue, this.skin.backgroundHoverColor.alpha);
      mp.game.graphics.drawText(this.text, [this.x, this.y - this.fontScaleOffsetFix], {
        font: this.fontType,
        centre: true,
        color: [this.skin.textHoverColor.red, this.skin.textHoverColor.green, this.skin.textHoverColor.blue, this.skin.textHoverColor.alpha],
        scale: [this.fontScale[0], this.fontScale[1]],
        outline: this.fontOutline,
      });
      return;
    } else {
      // Disabled Draw
      if (this.disabled) {
        mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.skin.backgroundColorDisabled.red, this.skin.backgroundColorDisabled.green, this.skin.backgroundColorDisabled.blue, this.skin.backgroundColorDisabled.alpha);
        mp.game.graphics.drawText(this.text, [this.x, this.y - this.fontScaleOffsetFix], {
          font: this.fontType,
          centre: true,
          color: [this.skin.textColorDisabled.red, this.skin.textColorDisabled.green, this.skin.textColorDisabled.blue, this.skin.textColorDisabled.alpha],
          scale: [this.fontScale[0], this.fontScale[1]],
          outline: this.fontOutline,
        });
        return;
      }
      // Regular Draw
      mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.skin.backgroundColor.red, this.skin.backgroundColor.green, this.skin.backgroundColor.blue, this.skin.backgroundColor.alpha);
      mp.game.graphics.drawText(this.text, [this.x, this.y - this.fontScaleOffsetFix], {
        font: this.fontType,
        centre: true,
        color: [this.skin.textColor.red, this.skin.textColor.green, this.skin.textColor.blue, this.skin.textColor.alpha],
        scale: [this.fontScale[0], this.fontScale[1]],
        outline: this.fontOutline,
      });
      return;
    }
  }

  /**
   * Used to handle the action after clicking the button.
   * @memberof Button
   */
  action() {
    if (!this.mouseCollision) return;
    if (this.disabled) return;
    NativeMenu.Sound.CONTINUE.playSound();
    this.onClickEvents.forEach((event) => {
      event.trigger(this.data);
    });
    return;
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

exports = Button;
