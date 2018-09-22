'use strict';
/**
 * Implements a Event.
 */
class Event extends yarp.Object {
  /**
   * Creates an instance of Event.
   * @extends yarp.Object
   * @param {Object} params
   * @param {String} params.id
   * @param {Function} [params.call=() => {}]
   * @param {Array<String>} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @memberof Event
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._call = this.default(params.call, () => {}).toString();
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      this.mp = new mp.Event(this._id, eval(this._call));
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Event class requires id to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Event;
