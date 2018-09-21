'use strict';
/**
 * Implements a Menu.
 * @class yarp.Menu
 * @extends yarp.Object
 */
class Menu extends yarp.Object {
  /**
   * Creates an instance of Menu.
   * @param {Object} params
   * @param {String} [params.title='']
   * @param {String} [params.subtitle='']
   * @param {Array<Object>} [params.items=[]]
   * @param {Array<Number>} [params.offset=[0, 0]]
   * @param {Number} [params.spriteLibrary='commonmenu']
   * @param {Number} [params.spriteName='interaction_bgd']
   * @memberof yarp.Menu
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._title = this.default(params.title, params.id);
      this._subtitle = this.default(params.subtitle, '');
      this._items = this.default(params.items, []);
      this._offset = this.default(params.offset, [0, 0]);
      this._spriteLibrary = this.default(params.spriteLibrary, 'commonmenu');
      this._spriteName = this.default(params.spriteName, 'interaction_bgd');
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Menu class requires id to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Creates the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  create(player) {
    yarp.client.createMenu(player, this.id, yarp.utils.server.cleanData(this));
  }

  /**
   * Recreates the menu for all online players.
   * @memberof yarp.Menu
   */
  recreate() {
    mp.players.forEach((player, id) => {
      yarp.client.createMenu(player, this.id, yarp.utils.server.cleanData(this));
    });
  }

  /**
   * Open the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  open(player) {
    yarp.client.openMenu(player, this.id);
  }

  /**
   * Close the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  close(player) {
    yarp.client.closeMenu(player, this.id);
  }

  /**
   * Toggle the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  toggle(player) {
    yarp.client.toggleMenu(player, this.id);
  }

  /**
   * Add one item the menu.
   * @memberof yarp.Menu
   * @param {Object} item
   */
  addItem(item) {
    this.items.push(item);
    mp.players.forEach((player, id) => {
      yarp.client.menuAddItem(player, item);
    });
  }

  /**
   * Add items the menu.
   * @memberof yarp.Menu
   * @param {Array<Object>} items
   */
  addItems(items) {
    this.items.concat(items);
    mp.players.forEach((player, id) => {
      yarp.client.menuAddItems(player, items);
    });
  }
}

module.exports = Menu;
