'use strict';
/**
 * Creates a Command.
 * @namespace yarp.Command
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Command id.
 * @param {function} call - Command call function.
 * @param {string} [category='None'] - Command category.
 * @param {string} [hint='There\'s no hint.'] - Command hint.
 * @param {Vector3} [position=null] - Command position.
 * @param {number} [range=null] - Command range.
 * @param {Array<string>} [permissions=[]] - Command permissions.
 * @param {Array<string>} [items=[]] - Command items.
 */

class Command extends yarp.GMObject{
  constructor(id,call,category,hint,permissions,items,position,range){
    super();
    if ((id && call) != null){
      this._id = id;
      this._category = category || 'None';
      this._hint = hint || 'There\'s no hint.';
      this._call = call.toString();
      this._position = position || null;
      this._range = range || null;
      this._permissions = ((permissions) ? (((yarp.commands && yarp.commands[id]) != null) ?
        yarp.commands[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.commands[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.commands && yarp.commands[id]) != null) ?
        yarp.commands[id].items.concat(items.filter(function (item) {
          return yarp.commands[id].items.indexOf(item) < 0;
        })) : items) : []);
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Command
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Command(obj._id,obj._call,obj._category,obj._hint,obj._permissions,obj._items,obj._position,obj._range);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Command
   * @param {string} file - Config file path.
   */
  static config(file){
    let commands = require(file);
    for (let category in commands){
      for (let id in commands[category]){
        let command = commands[category][id];
        new Command(id,command.call,category,command.hint,command.permissions,command.items);
      }
    }
  }
}

module.exports = Command;
