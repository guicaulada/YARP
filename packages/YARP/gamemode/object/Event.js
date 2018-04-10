'use strict';
/**
 * @file Event class
 */
 
module.exports = class Event extends yarp.gmo{
  constructor(id,call,permissions,items){
    super();
    if ((typeof id) === 'object' || (id && call) != null) {
      this._id = id._id || id;
      this._call = id._call || ((call) ? call.toString() : '() => {}');
      this._permissions = id._permissions || (((yarp.events && yarp.events[id]) != null) ?
        yarp.events[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.events[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.events && yarp.events[id]) != null) ?
        yarp.events[id].items.concat(items.filter(function (item) {
          return yarp.events[id].items.indexOf(item) < 0;
        })) : (items || []));
      this.mp = new mp.Event(this._id, eval(this._call));
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let events = require(file);
    for (let id in events){
      let event = events[id];
      new yarp.Event(id,event.call,event.permissions,event.items);
    }
  }
}
