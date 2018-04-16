'use strict';
/**
 * Creates a Hotkey.
 * @namespace yarp.Hotkey
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Hotkey id.
 * @param {string} key - Hotkey key.
 * @param {function} call - Hotkey call function.
 * @param {string} [category='None'] - Hotkey category.
 * @param {string} [hint='There\'s no hint.'] - Hotkey hint.
 * @param {Vector3} [position=null] - Hotkey position.
 * @param {number} [range=null] - Hotkey range.
 * @param {Array<string>} [permissions=[]] - Hotkey permissions.
 * @param {Array<string>} [items=[]] - Hotkey items.
 */

class Hotkey extends yarp.GMObject{
  constructor(id,key,call,hint,category,permissions,items,position,range){
    super();
    if ((id && key && call) != null){
      this._id = id;
      this._key = key;
      this._category = category || 'None';
      this._hint = hint || 'There\'s no hint.';
      this._call = call.toString();
      this._position = position || null;
      this._range = range || null;
      this._permissions = ((permissions) ? (((yarp.hotkeys && yarp.hotkeys[id]) != null) ?
        yarp.hotkeys[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.hotkeys[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.hotkeys && yarp.hotkeys[id]) != null) ?
        yarp.hotkeys[id].items.concat(items.filter(function (item) {
          return yarp.hotkeys[id].items.indexOf(item) < 0;
        })) : items) : []);
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
    player.call('playerBindKey',[this.id,this.key]);
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
    player.call('playerUnbindKey',[this.id]);
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Hotkey
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Hotkey(obj._id,obj._key,obj._call,obj._hint,obj._category,obj._permissions,obj._items,obj._position,obj._range);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Hotkey
   * @param {string} file - Config file path.
   */
  static config(file){
    let hotkeys = require(file);
    for (let category in hotkeys){
      for (let id in hotkeys[category]){
        let hotkey = hotkeys[category][id];
        new Hotkey(id,hotkey.key,hotkey.call,hotkey.hint,category,hotkey.permissions,hotkey.items);
      }
    }
  }
}

module.exports = Hotkey;
