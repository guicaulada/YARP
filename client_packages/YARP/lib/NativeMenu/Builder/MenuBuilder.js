'use strict';
/**
 * Implements a menu builder.
 */
class MenuBuilder extends NativeMenu.Menu {
  /**
   * Creates an instance of MenuBuilder.
   * @param {Number} uniqueMenuName
   * @param {Number} xGridSize
   * @param {Number} yGridSize
   * @extends {NativeMenu.Menu}
   * @memberof MenuBuilder
   */
  constructor(uniqueMenuName, xGridSize, yGridSize) {
    super(false);
    this.size = [xGridSize, yGridSize];
    this.offset = [];
    this.debugPanels = [];
    this.menuName = uniqueMenuName;
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
    this.generateDebugMode();
    this.debugFrame = 0;
    NativeMenu.MenuPool.MenuInstances.push(this);
  }

  /**
   * Selects item by index.
   * @param {Number} newIndex
   * @param {Boolean} [withSound=true]
   * @memberof Menu
   */
  setToItem(newIndex, withSound = true) {
    if (withSound) NativeMenu.Sound.CONTINUE.playSound();
    this.hoveredButton = this.menuItems[newIndex];
    this.currentIndexMenuItems = newIndex;
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
    if (menuItem instanceof NativeMenu.DebugPanel) {
      this.debugPanels.push(menuItem);
    } else {
      this.menuItems.push(menuItem);
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
    for (let menuItem of this.menuItems) {
      menuItem.draw();
    }

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
      this.onMenuEvent.close(this, this.data);
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
      NativeMenu.MenuPool.currentInputBox.onChangeEvents.forEach((event) => {
        event.trigger(NativeMenu.MenuPool.currentInputBox.data);
      });
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
      NativeMenu.MenuPool.currentInputBox.onChangeEvents.forEach((event) => {
        event.trigger(NativeMenu.MenuPool.currentInputBox.data);
      });
      return;
    } else {
      if (menu.playSoundsWhenTyping) {
        NativeMenu.Sound.HACKING.playSound();
      }
      NativeMenu.MenuPool.currentInputBox.data.inputText = NativeMenu.MenuPool.currentInputBox.data.inputText + String.fromCharCode(i);
      NativeMenu.MenuPool.timeSinceLastKeyCheck = new Date().getTime();
      NativeMenu.MenuPool.currentInputBox.onChangeEvents.forEach((event) => {
        event.trigger(NativeMenu.MenuPool.currentInputBox.data);
      });
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
    if (menu.onMenuEvent && menu.onMenuEvent.click) menu.onMenuEvent.click(menu.hoveredButton, menu.hoveredButton.data);
    return;
  }
});

for (let i = 1; i <= 0xFE; i++) {
  mp.keys.bind(i, true, () => {
    MenuBuilder.keydown(i);
  });
}

exports = MenuBuilder;
