'use strict';
/**
 * Implements a menu builder.
 */
class MenuBuilder {
  /**
   * Creates an instance of MenuBuilder.
   * @param {Number} uniqueMenuName
   * @param {Number} xGridSize
   * @param {Number} yGridSize
   * @memberof MenuBuilder
   */
  constructor(uniqueMenuName, xGridSize, yGridSize) {
    this.menuName = uniqueMenuName;
    this.menuItems = [];
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
    NativeMenu.MenuPool.MenuInstances.push(this);
  }
  /**
   * Setup the general width / height calculations for the grid.
   * @param {Object} item
   * @memberof MenuBuilder
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
    item.x = this.pctGridX * item.x + (item.width / 2);
    item.y = this.pctGridY * item.y + (item.height / 2);
    if (item.x <= 0) {
      item.x = this.pctGridWidth / 2;
    }
    if (item.y <= 0) {
      item.y = this.pctGridHeight / 2;
    }
    item.aX = NativeMenu.MenuBuilder.res.x * item.x;
    item.aY = NativeMenu.MenuBuilder.res.y * item.y;
    item.aWidth = NativeMenu.MenuBuilder.res.x * item.width;
    item.aHeight = NativeMenu.MenuBuilder.res.y * item.height;
  }

  /**
   * Add item to the menu.
   * @param {Object} menuItem A menu item object.
   * @memberof MenuBuilder
   */
  add(menuItem) {
    this.prepare(menuItem);
    if (menuItem instanceof NativeMenu.Button) {
      this.buttons.push(menuItem);
      this.menuItems.push(menuItem);
    } else if (menuItem instanceof NativeMenu.Panel) {
      this.panels.push(menuItem);
      this.menuItems.push(menuItem);
    } else if (menuItem instanceof NativeMenu.InputPanel) {
      this.inputPanels.push(menuItem);
      this.menuItems.push(menuItem);
    } else if (menuItem instanceof NativeMenu.DebugPanel) {
      this.debugPanels.push(menuItem);
    }
  }

  /**
   * Renders the menu builder if visible.
   * @memberof MenuBuilder
   */
  render() {
    if (this.isVisible) {
      mp.gui.cursor.show(true, true);
      this.draw();
    }
  }

  /**
   * Draws the menu builder.
   * @memberof MenuBuilder
   */
  draw() {
    this.drawButtons();
    this.drawPanels();
    this.drawInputPanels();
    this.drawDebugPanels();
  }

  /**
   * Recalculate the grid.
   * @memberof MenuBuilder
   */
  recalculate() {
    this.pctGridX = 1 / this.gridSizeWidth;
    this.pctGridY = 1 / this.gridSizeHeight;
    this.pctGridWidth = this.pctGridX;
    this.pctGridHeight = this.pctGridY;
  }

  /**
   * Daws debug panels.
   * @memberof MenuBuilder
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
   * @memberof MenuBuilder
   */
  generateDebugMode() {
    for (let x = 0; x < this.gridSizeWidth; x++) {
      for (let y = 0; y < this.gridSizeHeight; y++) {
        this.add(new NativeMenu.DebugPanel(x, y, 1, 1, `(${x},${y})`));
      }
    }
  }

  /**
   * Draws buttons.
   * @memberof MenuBuilder
   */
  drawButtons() {
    if (this.buttons.length <= 0) return;
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
  }

  /**
   * Draws panels.
   * @memberof MenuBuilder
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
   * @memberof MenuBuilder
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
   * Closes menu builder.
   * @memberof MenuBuilder
   */
  close() {
    this.isVisible = false;
  }

  /**
   * Opens menu builder.
   * @memberof MenuBuilder
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
   * @memberof MenuBuilder
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
   * Returns screen active resolution for menu builder.
   * @readonly
   * @static
   * @memberof MenuBuilder
   */
  static get res() {
    return mp.game.graphics.getScreenActiveResolution(0, 0);
  }

  /**
   * Processes keydown events.
   * @static
   * @param {Number} i
   * @memberof MenuBuilder
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

exports = MenuBuilder;
