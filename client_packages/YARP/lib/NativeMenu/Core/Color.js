'use strict';
/**
 * Implements a color.
 */
class Color {
  /**
   * Creates an instance of Color.
   * @param {Number} [red=255]
   * @param {Number} [green=255]
   * @param {Number} [blue=255]
   * @param {Number} [alpha=255]
   * @memberof Color
   */
  constructor(red = 255, green = 255, blue = 255, alpha = 255) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
}

exports = Color;
