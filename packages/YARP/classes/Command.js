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
  constructor(
    id,
    call = () => {},
    category = 'None',
    hint = 'There\'s no hint.',
    permissions = [],
    items = {},
    position = false,
    range = false
  ){
    super();
    if ((id) != null){
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
        if (!yarp.commands[id]) {
          new Command(id,command.call,category,command.hint,command.permissions,command.items, command.position, command.range);
        }
      }
    }
  }
}

module.exports = Command;
