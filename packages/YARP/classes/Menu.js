'use strict';
/**
 * Implements a Menu.
 */
class Menu extends yarp.Object {
  /**
   * Creates an instance of Menu.
   * @extends {yarp.Object}
   * @param {Object} params
   * @param {String} [params.title='']
   * @param {Array<Object>} [params.items=[]]
   * @param {Array<Number>} [params.offset=[0, 0]]
   * @param {Number} [params.texture=['commonmenu', 'interaction_bgd']]
   * @memberof Menu
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._title = this.default(params.title, params.id);
      this._items = this.default(params.items, []);
      this._debug = this.default(params.debug, false);
      this._offset = this.default(params.offset, [0, 0]);
      this._size = this.default(params.size, [10, 10]);
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
   * @instance
   * @function create
   * @param {Object} player
   * @memberof Menu
   */
  create(player) {
    yarp.client.createMenu(player, this.id, yarp.utils.server.cleanData(this));
  }

  /**
   * Creates the menu.
   * @instance
   * @function create
   * @param {Object} player
   * @memberof Menu
   */
  build(player) {
    yarp.client.buildMenu(player, this.id, yarp.utils.server.cleanData(this));
  }

  /**
   * Recreates the menu for all online players.
   * @instance
   * @function recreate
   * @memberof Menu
   */
  recreate() {
    mp.players.forEach((player, id) => {
      yarp.client.createMenu(player, this.id, yarp.utils.server.cleanData(this));
    });
  }

  /**
   * Open the menu for player.
   * @instance
   * @function open
   * @param {Object} player
   * @param {Boolean} [chat=false] Chat on/off.
   * @memberof Menu
   */
  open(player, chat = false) {
    this._visible[player.name] = true;
    yarp.client.openMenu(player, this.id, chat);
  }

  /**
   * Close the menu for player.
   * @instance
   * @function close
   * @param {Object} player
   * @memberof Menu
   */
  close(player) {
    this._visible[player.name] = false;
    yarp.client.closeMenu(player, this.id);
  }

  /**
   * Toggle the menu for player.
   * @instance
   * @function toggle
   * @param {Object} player
   * @memberof Menu
   */
  toggle(player) {
    yarp.client.toggleMenu(player, this.id);
  }

  /**
   * Add one item to the menu.
   * @instance
   * @function add
   * @param {Object} item
   * @memberof Menu
   */
  add(item) {
    this.items.push(item);
  }

  /**
   * Add one item to the menu at a certain index.
   * @instance
   * @function addAt
   * @param {Number} index
   * @param {Object} item
   * @memberof Menu
   */
  addAt(index, item) {
    this.items[index] = item;
  }

  /**
   * Returns if menu is visible.
   * @instance
   * @function isVisible
   * @param {Object} player
   * @return {Boolean} True if menu is visible for player.
   * @memberof Menu
   */
  isVisible(player) {
    return this._visible[player.name];
  }

  /**
   * Update menu item.
   * @instance
   * @function updateItem
   * @param {Object} player
   * @param {Number} index
   * @param {Object} item
   * @memberof Menu
   */
  updateItem(player, index, item) {
    yarp.client.menuUpdateItem(player, this.id, index, item);
  }

  /**
   * Update menu items.
   * @instance
   * @function updateItems
   * @param {Object} player
   * @param {Object} indexItems
   * @memberof Menu
   */
  updateItems(player, indexItems) {
    yarp.client.menuUpdateItems(player, this.id, indexItems);
  }

  /**
   * Remove menu item.
   * @instance
   * @function removeItem
   * @param {Object} player
   * @param {Number} index
   * @param {Object} item
   * @memberof Menu
   */
  removeItem(player, index) {
    yarp.client.menuRemoveItem(player, this.id, index);
  }

  /**
   * Remove menu items.
   * @instance
   * @function removeItems
   * @param {Object} player
   * @param {Number} index
   * @param {Number} amount
   * @memberof Menu
   */
  removeItems(player, index, amount) {
    yarp.client.menuRemoveItems(player, this.id, index, amount);
  }

  /**
   * Returns item data.
   * @function getItemByIndex
   * @param {Object} player
   * @param {Number} index Item index.
   * @memberof Menu
   * @return {*} Item data.
   */
  async getItemByIndex(player, index) {
    return await yarp.client.getMenuItemByIndex(player, this.id, index);
  };

  /**
   * Returns items data.
   * @function getItemsByIndex
   * @param {Object} player
   * @param {Array<Number>} indexList Item index list.
   * @memberof Menu
   * @return {Array<*>} Item data by index.
   */
  async getItemsByIndex(player, indexList) {
    return await yarp.client.getMenuItemsByIndex(player, this.id, indexList);
  };
}

module.exports = Menu;
