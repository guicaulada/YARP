'use strict';
/**
 * Implements a Menu.
 * @class yarp.Menu
 * @extends yarp.GMObject
 */
class Menu extends yarp.GMObject {
  /**
   * Creates an instance of Menu.
   * @param {Object} params
   * @param {String} [params.title='']
   * @param {String} [params.subtitle='']
   * @param {Number} [params.type=0]
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
      this._type = this.default(params._type, 0);
      this._items = this.default(params.items, []);
      this._offset = this.default(params.offset, [0, 0]);
      this._spriteLibrary = this.default(params.spriteLibrary, 'commonmenu');
      this._spriteName = this.default(params.spriteName, 'interaction_bgd');
      this._leftBadge = this.default(params.leftBadge, false);
      this._rightBadge = this.default(params.rightBadge, false);
      this._rightLabel = this.default(params.rightLabel, false);
      yarp.mng.register(this);
      this.makeGetterSetter();
      this.recreate();
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
    player.call('createMenu', [this.id, JSON.stringify(yarp.utils.cleanData(this))]);
  }

  /**
   * Recreates the menu for all online players.
   * @memberof yarp.Menu
   */
  recreate() {
    mp.players.call('createMenu', [this.id, JSON.stringify(yarp.utils.cleanData(this))]);
  }

  /**
   * Open the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  open(player) {
    player.call('openMenu', [this.id]);
  }

  /**
   * Close the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  close(player) {
    player.call('closeMenu', [this.id]);
  }

  /**
   * Toggle the menu.
   * @memberof yarp.Menu
   * @param {Object} player
   */
  toggle(player) {
    player.call('toggleMenu', [this.id]);
  }

  /**
   * Add one item the menu.
   * @memberof yarp.Menu
   * @param {Object} item
   */
  addItem(item) {
    this.items.push(item);
    mp.players.call('menuAddItem', [JSON.stringify(item)]);
  }

  /**
   * Add items the menu.
   * @memberof yarp.Menu
   * @param {Array<Object>} items
   */
  addItem(items) {
    this.items.concat(items);
    mp.players.call('menuAddItems', [JSON.stringify(items)]);
  }
}

module.exports = Menu;
