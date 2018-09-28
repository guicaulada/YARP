'use strict';
/**
 * Implements a prompt.
 */
class Prompt {
  /**
   * Creates an instance of Prompt.
   * @param {Number} uniqueMenuName
   * @param {Number} xGridSize
   * @param {Number} yGridSize
   * @memberof Prompt
   */
  constructor(uniqueMenuName, xGridSize, yGridSize) {
    this.menuName = uniqueMenuName;
    this.buttons = [];
    this.panels = [];
    this.inputPanels = [];
    this.debugPanels = [];
    this.hoveredButton = null;
    this.blurMenuOnOpen = true;
    this.hideChatOnOpen = true;
    this.gridSizeWidth = xGridSize;
    this.gridSizeHeight = yGridSize;
    this.pctGridX = 1 / this.gridSizeWidth;
    this.pctGridY = 1 / this.gridSizeHeight;
    this.pctGridWidth = this.pctGridX;
    this.pctGridHeight = this.pctGridY;
    this.playSoundsWhenTyping = true;
    this.debugMode = false;
    this.skin = new NativeMenu.Skin();
    this.generateDebugMode();
    this.debugFrame = 0;
    this.offset = [];
    this._isVisible = false;
  }
  /**
   * Setup the general width / height calculations for the grid.
   * @param {Object} item
   * @memberof Prompt
   */
  prepare(item) {
    item.width = this.pctGridWidth * item.width;
    item.height = this.pctGridHeight * item.height;
    if (item.width <= 0) {
      item.width = this.pctGridWidth;
    }
    if (item.height <= 0) {
      item.height = this.pctGridHeight;
    }
    item.x = this.pctGridX * x + (item.width / 2);
    item.y = this.pctGridY * y + (item.height / 2);
    if (item.x <= 0) {
      item.x = this.pctGridWidth / 2;
    }
    if (item.y <= 0) {
      item.y = this.pctGridHeight / 2;
    }
  }

  /**
   * Add item to the menu.
   * @param {Object} menuItem A menu item object.
   * @memberof Prompt
   */
  add(menuItem) {
    this.prepare(menuItem);
    if (menuItem instanceof NativeMenu.Button) this.buttons.push(menuItem);
    else if (menuItem instanceof NativeMenu.Panel) this.panels.push(menuItem);
    else if (menuItem instanceof NativeMenu.InputPanel) this.inputPanels.push(menuItem);
    else if (menuItem instanceof NativeMenu.DebugPanel) this.debugPanels.push(menuItem);
  }

  /**
   * Renders the prompt if visible.
   * @memberof Prompt
   */
  render() {
    if (this.isVisible) {
      mp.gui.cursor.show(true, true);
      this.draw();
    }
  }

  /**
   * Draws the prompt.
   * @memberof Prompt
   */
  draw() {
    this.drawButtons();
    this.drawPanels();
    this.drawInputPanels();
    this.drawDebugPanels();
  }

  /**
   * Recalculate the grid.
   * @memberof Prompt
   */
  recalculate() {
    this.pctGridX = 1 / this.gridSizeWidth;
    this.pctGridY = 1 / this.gridSizeHeight;
    this.pctGridWidth = this.pctGridX;
    this.pctGridHeight = this.pctGridY;
  }

  /**
   * Daws debug panels.
   * @memberof Prompt
   */
  drawDebugPanels() {
    if (!this.debugMode) return;
    if (this.debugPanels.length <= 0) return;
    if (this.debugFrame < 1) {
      for (let i = 0; i < this.debugPanels.length; i++) {
        this.debugPanels[i].draw();
      }
      this.debugFrame += 1;
    } else {
      for (let i = this.debugPanels.length - 1; i > 0; i--) {
        this.debugPanels[i].draw();
      }
      this.debugFrame += 1;
      if (this.debugFrame > 2) {
        this.debugFrame = 0;
      }
    }
  }

  /**
   * Generates debug panels.
   * @memberof Prompt
   */
  generateDebugMode() {
    for (let x = 0; x < this.gridSizeWidth; x++) {
      for (let y = 0; y < this.gridSizeHeight; y++) {
        new NativeMenu.DebugPanel(this, x, y, 1, 1, `(${x},${y})`);
      }
    }
  }

  /**
   * Draws buttons.
   * @memberof Prompt
   */
  drawButtons() {
    if (this.buttons.length <= 0) return;
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
  }

  /**
   * Draws panels.
   * @memberof Prompt
   */
  drawPanels() {
    if (this.panels.length <= 0) {
      return;
    }
    for (let i = 0; i < this.panels.length; i++) {
      this.panels[i].draw();
    }
  }

  /**
   * Draws input panels.
   * @memberof Prompt
   */
  drawInputPanels() {
    if (this.inputPanels.length <= 0) {
      return;
    }
    for (let i = 0; i < this.inputPanels.length; i++) {
      this.inputPanels[i].draw();
    }
  }

  /**
   * Closes prompt.
   * @memberof Prompt
   */
  close() {
    this.isVisible = false;
  }

  /**
   * Opens prompt.
   * @memberof Prompt
   */
  open() {
    this.isVisible = true;
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
   * @memberof Prompt
   */
  set isVisible(value) {
    this._isVisible = value;
    if (value) {
      if (this.blurMenuOnOpen) {
        mp.game.graphics.transitionToBlurred(200);
      }
      if (this.hideChatOnOpen) {
        mp.gui.chat.show(false);
      }
    } else {
      mp.gui.cursor.show(false, false);
      mp.game.graphics.transitionFromBlurred(5);
      mp.gui.chat.show(true);
    }
  }

  /**
   * Returns screen active resolution for prompt.
   * @readonly
   * @static
   * @memberof Prompt
   */
  static get res() {
    return mp.game.graphics.getScreenActiveResolution(0, 0);
  }

  /**
   * Processes keydown events.
   * @static
   * @param {Number} i
   * @memberof Prompt
   */
  static keydown(i) {
    let menu = NativeMenu.MenuPool.getCurrentMenu();
    if (NativeMenu.MenuPool.currentInputBox === null) return;
    if (NativeMenu.MenuPool.timeSinceLastKeyCheck + 20 >= new Date().getTime()) return;
    if (i == 8) {
      NativeMenu.MenuPool.timeSinceLastKeyCheck = new Date().getTime();
      NativeMenu.MenuPool.currentInputBox.data.inputText = NativeMenu.MenuPool.currentInputBox.data.inputText.slice(0, -1);
      NativeMenu.Sound.HACKING.playSound();
      return;
    }
    let x = String.fromCharCode(i);
    if (!x.match(/^[a-zA-Z1-9 ]+$/)) {
      NativeMenu.MenuPool.timeSinceLastKeyCheck = new Date().getTime();
      return;
    }
    if (NativeMenu.MenuPool.currentInputBox.data.inputText.length >= NativeMenu.MenuPool.currentInputBox.inputMaxLength) {
      NativeMenu.Sound.CANCEL.playSound();
      return;
    }
    if (!mp.keys.isDown(16)) {
      if (menu.playSoundsWhenTyping) {
        NativeMenu.Sound.HACKING.playSound();
      }
      NativeMenu.MenuPool.currentInputBox.data.inputText = NativeMenu.MenuPool.currentInputBox.data.inputText + String.fromCharCode(i).toLowerCase();
      NativeMenu.MenuPool.timeSinceLastKeyCheck = new Date().getTime();
      return;
    } else {
      if (menu.playSoundsWhenTyping) {
        NativeMenu.Sound.HACKING.playSound();
      }
      NativeMenu.MenuPool.currentInputBox.data.inputText = NativeMenu.MenuPool.currentInputBox.data.inputText + String.fromCharCode(i);
      NativeMenu.MenuPool.timeSinceLastKeyCheck = new Date().getTime();
      return;
    }
  }
}

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
  let menu = NativeMenu.MenuPool.getCurrentMenu();
  if (menu == null) return;
  if (menu.hoveredButton == null) return;
  if (NativeMenu.MenuPool.timeSinceLastKeyCheck + 20 >= new Date().getTime()) return;
  // Only call when the mouse has been lifted up.
  if (menu.hoveredButton.mouseCollision && upOrDown === 'up') {
    NativeMenu.MenuPool.timeSinceLastKeyCheck = new Date().getTime();
    menu.hoveredButton.action();
    return;
  }
});

exports = Prompt;
