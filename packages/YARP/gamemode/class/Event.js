'use strict';
/**
 * @file Event class
 */
module.exports = class Event{
  constructor(id,call,permissions,items){
    if ((typeof id) === 'object' || (id && call) != null) {
      this._id = id._id || id;
      this._call = id._call || ((call) ? call.toString() : "() => {}");
      this._permissions = id._permissions || (((yarp.events && yarp.events[id]) != null) ?
        yarp.events[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.events[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.events && yarp.events[id]) != null) ?
        yarp.events[id].items.concat(items.filter(function (item) {
          return yarp.events[id].items.indexOf(item) < 0;
        })) : (items || []));
      this.mp = new mp.Event(this._id, () => {
        if (user.hasPermissions(this._permissions) || character.hasPermissions(this._permissions)){
          if (character.hasItems(this._items)) {
            (eval(this._call))();
          }
        }
      });
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

  save(){
    yarp.dbm.save(this);
  }

  remove(){
    this.mp.destroy();
    yarp.dbm.remove(this);
  }

  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
