'use strict';
/**
 * Implements a Command.
 * @class yarp.Command
 * @extends yarp.GMObject
 */
class Command extends yarp.GMObject {
  /**
   *Creates an instance of Command.
   * @param {*} id
   * @param {*} [call=() => {}]
   * @param {string} [category='None']
   * @param {string} [hint='There\'s no hint.']
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @param {boolean} [position=false]
   * @param {boolean} [range=false]
   * @memberof yarp.Command
   */
  constructor(
    id,
    call = () => {},
    category = 'None',
    hint = 'There\'s no hint.',
    permissions = [],
    items = {},
    position = false,
    range = false
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        call: call,
        category: category,
        hint: hint,
        permissions: permissions,
        items: items,
        position: position,
        range: range,
      } = id;
      return new yarp.Command(nid, call, category, hint, permissions, items, position, range);
    } else if ((id) != null) {
      this._id = id;
      this._category = category;
      this._hint = hint;
      this._call = call.toString();
      this._position = position;
      this._range = range;
      this._permissions = permissions;
      this._items = items;
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Command;
