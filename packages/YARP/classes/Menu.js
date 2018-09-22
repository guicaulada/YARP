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
   * @param {Array<Object>} [params.data=[]]
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
    this._visible[player.name] = true;
    yarp.client.openMenu(player, this.id);
  }

  /**
   * Close the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  close(player) {
    this._visible[player.name] = false;
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
  add(item) {
    this._data.push(item);
  }

  /**
   * Returns if menu is visible.
   * @memberof yarp.Menu
   * @param {Object} player
   * @return {Boolean} True if menu is visible for player.
   */
  isVisible(player) {
    return this._visible[player.name];
  }
}

module.exports = Menu;
