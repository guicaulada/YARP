'use strict';
/**
 * Implements a skin.
 */
class Skin {
  /**
   *Creates an instance of Skin.
   * @param {NativeMenu.Color} [backgroundColor=new NativeMenu.Color(255, 255, 255, 50)]
   * @param {NativeMenu.Color} [backgroundHoverColor=new NativeMenu.Color(255, 255, 255, 75)]
   * @param {NativeMenu.Color} [backgroundTextFieldColor=new NativeMenu.Color(230, 230, 230, 255)]
   * @param {NativeMenu.Color} [backgroundColorDisabled=new NativeMenu.Color(150, 150, 150, 50)]
   * @param {NativeMenu.Color} [backgroundTextFieldColorDisabled=new NativeMenu.Color(150, 150, 150, 255)]
   * @param {NativeMenu.Color} [textColorDisabled=new NativeMenu.Color(150, 150, 150, 255)]
   * @param {NativeMenu.Color} [textColor=new NativeMenu.Color(255, 255, 255, 255)]
   * @param {NativeMenu.Color} [textHoverColor=new NativeMenu.Color(150, 150, 150, 255)]
   * @param {Boolean} [textOutline=true]
   * @memberof Skin
   */
  constructor(
    backgroundColor = new NativeMenu.Color(255, 255, 255, 50),
    backgroundHoverColor = new NativeMenu.Color(255, 255, 255, 75),
    backgroundTextFieldColor = new NativeMenu.Color(230, 230, 230, 255),
    backgroundColorDisabled = new NativeMenu.Color(150, 150, 150, 50),
    backgroundTextFieldColorDisabled = new NativeMenu.Color(150, 150, 150, 255),
    textColorDisabled = new NativeMenu.Color(150, 150, 150, 255),
    textColor = new NativeMenu.Color(255, 255, 255, 255),
    textHoverColor = new NativeMenu.Color(150, 150, 150, 255),
    textOutline = true
  ) {
    this.backgroundColor = backgroundColor;
    this.backgroundHoverColor = backgroundHoverColor;
    this.backgroundTextFieldColor = backgroundTextFieldColor;
    this.backgroundColorDisabled = backgroundColorDisabled;
    this.backgroundTextFieldColorDisabled = backgroundTextFieldColorDisabled;
    this.textColorDisabled = textColorDisabled;
    this.textColor = textColor;
    this.textHoverColor = textHoverColor;
    this.textOutline = textOutline;
  }
}

exports = Skin;
