'use strict';
/**
 * Implements a Menu.
 */
class Menu extends yarp.Object {
  /**
   * Creates an instance of Menu.
   * @extends yarp.Object
   * @param {Object} params
   * @param {String} [params.title='']
   * @param {Array<Object>} [params.data=[]]
   * @param {Array<Number>} [params.offset=[0, 0]]
   * @param {Number} [params.texture=['commonmenu', 'interaction_bgd']]
   * @memberof Menu
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._title = this.default(params.title, params.id);
      this._data = this.default(params.data, []);
      this._offset = this.default(params.offset, [0, 0]);
      this._texture = this.default(params.texture, ['commonmenu', 'interaction_bgd']);
      this._visible = {};
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Menu class requires id to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Creates the menu.
   * @memberof Menu
   * @param {Object} player
   */
  create(player) {
    yarp.client.createMenu(player, this.id, yarp.utils.server.cleanData(this));
  }

  /**
   * Recreates the menu for all online players.
   * @memberof Menu
   */
  recreate() {
    mp.players.forEach((player, id) => {
      yarp.client.createMenu(player, this.id, yarp.utils.server.cleanData(this));
    });
  }

  /**
   * Open the menu.
   * @memberof Menu
   * @param {Object} player
   */
  open(player) {
    this._visible[player.name] = true;
    yarp.client.openMenu(player, this.id);
  }

  /**
   * Close the menu.
   * @memberof Menu
   * @param {Object} player
   */
  close(player) {
    this._visible[player.name] = false;
    yarp.client.closeMenu(player, this.id);
  }

  /**
   * Toggle the menu.
   * @memberof Menu
   * @param {Object} player
   */
  toggle(player) {
    yarp.client.toggleMenu(player, this.id);
  }

  /**
   * Add one item the menu.
   * @memberof Menu
   * @param {Object} item
   */
  add(item) {
    this._data.push(item);
  }

  /**
   * Returns if menu is visible.
   * @memberof Menu
   * @param {Object} player
   * @return {Boolean} True if menu is visible for player.
   */
  isVisible(player) {
    return this._visible[player.name];
  }

  /**
   * Update menu item.
   * @memberof Menu
   * @param {Object} player
   * @param {Number} index
   * @param {Object} item
   */
  updateItem(player, index, item) {
    yarp.client.menuUpdateItem(player, this.id, index, item);
  }

  /**
   * Update menu items.
   * @memberof Menu
   * @param {Object} player
   * @param {Object} indexItems
   */
  updateItems(player, indexItems) {
    yarp.client.menuUpdateItems(player, this.id, indexItems);
  }

  /**
   * Remove menu item.
   * @memberof Menu
   * @param {Object} player
   * @param {Number} index
   * @param {Object} item
   */
  removeItem(player, index) {
    yarp.client.menuRemoveItem(player, this.id, index);
  }

  /**
   * Remove menu items.
   * @memberof Menu
   * @param {Object} player
   * @param {Number} index
   * @param {Number} amount
   */
  removeItems(player, index, amount) {
    yarp.client.menuRemoveItems(player, this.id, index, amount);
  }
}

module.exports = Menu;
