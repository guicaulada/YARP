'use strict';
/**
 * Creates a Event.
 * @namespace yarp.Event
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Event id.
 * @param {function} call - Event call function.
 * @param {Array<string>} [permissions=[]] - Event permissions.
 * @param {Array<string>} [items=[]] - Event items.
 */

class Event extends yarp.GMObject{
  constructor(id,call,permissions,items){
    super();
    if ((id && call) != null) {
      this._id = id;
      this._call = ((call) ? call.toString() : '() => {}');
      this._permissions = ((permissions) ? (((yarp.events && yarp.events[id]) != null) ?
        yarp.events[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.events[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.events && yarp.events[id]) != null) ?
        yarp.events[id].items.concat(items.filter(function (item) {
          return yarp.events[id].items.indexOf(item) < 0;
        })) : items) : []);
      this.mp = new mp.Event(this._id, eval(this._call));
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Event
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Event(obj._id,obj._call,obj._permissions,obj._items);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Event
   * @param {string} file - Config file path.
   */
  static config(file){
    let events = require(file);
    for (let id in events){
      let event = events[id];
      new Event(id,event.call,event.permissions,event.items);
    }
  }
}

module.exports = Event;
