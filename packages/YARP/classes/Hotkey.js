'use strict';
/**
 * Implements a Hotkey.
 * @class Hotkey
 */
class Hotkey extends yarp.Object {
  /**
   * Creates an instance of Hotkey.
   * @extends {yarp.Object}
   * @param {Object} params
   * @param {String} params.id
   * @param {String} [params.key='E']
   * @param {Function} [params.call=() => {}]
   * @param {String} [params.hint='There\'s no hint.']
   * @param {String} [params.category='None']
   * @param {Array<String>} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @param {Boolean} [params.position=false]
   * @param {Boolean} [params.range=false]
   * @memberof Hotkey
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._key = this.default(params.key, 'E');
      this._category = this.default(params.categor, 'None');
      this._hint = this.default(params.hint, 'There\'s no hint.');
      this._call = this.default(params.call, () => {}).toString();
      this._position = this.default(params.position, false);
      this._range = this.default(params.range, false);
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      this.args = {};
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Hotkey class requires id to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Bind hotkey to player.
   * @instance
   * @function bind
   * @param {Object} player Player to bind to.
   * @param {Array<*>} args Arguments to the bind.
   * @memberof Hotkey
   */
  bind(player, args) {
    this.args[player.id] = args;
    yarp.client.playerBindKey(player, this.id, this.key);
  }

  /**
   * Unbind hotkey to player.
   * @instance
   * @function unbind
   * @param {Object} player Player to unbind from.
   * @memberof Hotkey
   */
  unbind(player) {
    this.args[player.id] = null;
    yarp.client.playerUnbindKey(player, this.id);
  }
}

module.exports = Hotkey;
