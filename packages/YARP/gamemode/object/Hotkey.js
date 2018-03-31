'use strict';
/**
 * @file Hotkey class
 */
module.exports = class Hotkey extends yarp.gmo{
  constructor(id,key,call,hint,category,permissions,items,position,range){
    super();
    if ((typeof id) === 'object' || (id && key && call) != null){
      this._id = id._id || id;
      this._key = id._key || key || "NONE";
      this._category = id._category || category || "None";
      this._hint = id._hint || hint || "There's no hint.";
      this._call = id._call || ((call) ? call.toString() : "() => {}");
      this._position = id._position || position || null;
      this._range = id._range || range || null;
      this._permissions = id._permissions || (((yarp.hotkeys && yarp.hotkeys[id]) != null) ?
        yarp.hotkeys[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.hotkeys[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.hotkeys && yarp.hotkeys[id]) != null) ?
        yarp.hotkeys[id].items.concat(items.filter(function (item) {
          return yarp.hotkeys[id].items.indexOf(item) < 0;
        })) : (items || []));
      this.args = {};
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  bind(player, args) {
    this.args[player.id] = args || [];
    player.call('playerBindKey',[this.id,this.key]);
  }

  unbind(player) {
    this.args[player.id] = null;
    player.call('playerUnbindKey',[this.id]);
  }

  static config(file){
    let hotkeys = require(file);
    for (let category in hotkeys){
      for (let id in hotkeys[category]){
        let hotkey = hotkeys[category][id];
        new yarp.Hotkey(id,hotkey.key,hotkey.call,hotkey.hint,category,hotkey.permissions,hotkey.items);
      }
    }
  }
}
