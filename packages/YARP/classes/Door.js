'use strict';
/**
 * Implements a Door.
 * @class yarp.Door
 * @extends yarp.GMObject
 */
class Door extends yarp.GMObject {
  /**
   * Creates an instance of Door.
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.model
   * @param {Vector3} params.position
   * @param {Number} [params.range=3]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @param {Array<String>} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @memberof yarp.Door
   */
  constructor(params) {
    super();
    if ((params.id && params.model && params.position) != null) {
      this._id = params.id;
      this._model = params.model;
      this._position = params.position;
      this._range = this.default(params.range, 3);
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      this.state = false;
      this.players = [];
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Door class requires id, model and position to be instantiated.\nParameters: ' + JSON.stringify(params));
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
