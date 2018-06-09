'use strict';
/**
 * Implements a Event.
 * @class yarp.Event
 * @extends yarp.GMObject
 */
class Event extends yarp.GMObject {
  /**
   *Creates an instance of Event.
   * @param {*} id
   * @param {*} [call=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Event
   */
  constructor(
    id,
    call = () => {},
    permissions = [],
    items = {}
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        call: call,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Event(nid, call, permissions, items);
    } else if ((id) != null) {
      this._id = id;
      this._call = call.toString();
      this._permissions = permissions;
      this._items = items;
      this.mp = new mp.Event(this._id, eval(this._call));
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Event;
