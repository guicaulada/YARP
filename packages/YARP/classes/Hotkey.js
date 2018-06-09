'use strict';
/**
 * Implements a Hotkey.
 * @class yarp.Hotkey
 * @extends yarp.GMObject
 */
class Hotkey extends yarp.GMObject {
  /**
   *Creates an instance of Hotkey.
   * @param {*} id
   * @param {string} [key='KEY_E']
   * @param {*} [call=() => {}]
   * @param {string} [hint='There\'s no hint.']
   * @param {string} [category='None']
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @param {boolean} [position=false]
   * @param {boolean} [range=false]
   * @memberof yarp.Hotkey
   */
  constructor(
    id,
    key = 'KEY_E',
    call = () => {},
    hint = 'There\'s no hint.',
    category = 'None',
    permissions = [],
    items = {},
    position = false,
    range = false
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        key: key,
        call: call,
        hint: hint,
        category: category,
        permissions: permissions,
        items: items,
        position: position,
        range: range,
      } = id;
      return new yarp.Hotkey(nid, key, call, hint, category, permissions, items, position, range);
    } else if ((id) != null) {
      this._id = id;
      this._key = key;
      this._category = category;
      this._hint = hint;
      this._call = call.toString();
      this._position = position;
      this._range = range;
      this._permissions = permissions;
      this._items = items;
      this.args = {};
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Bind hotkey to player.
   * @instance
   * @function bind
   * @memberof yarp.Hotkey
   * @param {object} player - Player to bind to.
   * @param {Array} args - Arguments to the bind.
   * @fires playerBindKey
   */
  bind(player, args) {
    this.args[player.id] = args;
    player.call('playerBindKey', [this.id, this.key]);
  }

  /**
   * Unbind hotkey to player.
   * @instance
   * @function unbind
   * @memberof yarp.Hotkey
   * @param {object} player - Player to unbind from.
   * @fires playerUnbindKey
   */
  unbind(player) {
    this.args[player.id] = null;
    player.call('playerUnbindKey', [this.id]);
  }
}

module.exports = Hotkey;
