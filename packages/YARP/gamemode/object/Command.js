'use strict';
/**
 * @file Command class
 */
module.exports = class Command extends yarp.gmo{
  constructor(id,call,category,hint,permissions,items,position,range){
    super();
    if ((typeof id) === 'object' || (id && call) != null){
      this._id = id._id || id;
      this._category = id._category || category || "None";
      this._hint = id._hint || hint || "There's no hint.";
      this._call = id._call || ((call) ? call.toString() : "() => {}");
      this._position = id._position || position || null;
      this._range = id._range || range || null;
      this._permissions = id._permissions || (((yarp.commands && yarp.commands[id]) != null) ?
        yarp.commands[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.commands[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.commands && yarp.commands[id]) != null) ?
        yarp.commands[id].items.concat(items.filter(function (item) {
          return yarp.commands[id].items.indexOf(item) < 0;
        })) : (items || []));
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let commands = require(file);
    for (let category in commands){
      for (let id in commands[category]){
        let command = commands[category][id];
        new yarp.Command(id,command.call,category,command.hint,command.permissions,command.items);
      }
    }
  }
}
