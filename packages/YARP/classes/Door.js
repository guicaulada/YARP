'use strict';
/**
 * Implements a Door.
 * @class yarp.Door
 * @extends yarp.GMObject
 */
class Door extends yarp.GMObject {
  /**
   *Creates an instance of Door.
   * @param {*} id
   * @param {*} model
   * @param {*} position
   * @param {number} [range=3]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Door
   */
  constructor(
    id,
    model,
    position,
    range = 3,
    enter = () => {},
    leave = () => {},
    permissions = [],
    items = {}
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        model: model,
        position: position,
        range: range,
        enter: enter,
        leave: leave,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Door(nid, model, position, range, enter, leave, permissions, items);
    } else if ((id && model && position) != null) {
      this._id = id;
      this._model = model;
      this._position = position;
      this._range = range;
      this._permissions = permissions;
      this._items = items;
      this._enter = enter.toString();
      this._leave = leave.toString();
      this.state = false;
      this.players = [];
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Broadcast open door event.
   * @instance
   * @function open
   * @memberof yarp.Door
   */
  open() {
    this.state = true;
    mp.players.call('playerOpenDoor', [JSON.stringify(this)]);
  }

  /**
   * Broadcast close door event.
   * @instance
   * @function close
   * @memberof yarp.Door
   */
  close() {
    this.state = false;
    mp.players.call('playerCloseDoor', [JSON.stringify(this)]);
  }
}

module.exports = Door;
