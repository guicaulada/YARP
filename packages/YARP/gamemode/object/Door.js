'use strict';
/**
 * @file Door class
 */
module.exports = class Door extends yarp.gmo{
  constructor(id,model,position,range,enter,leave,permissions,items){
    super();
    if ((typeof id) === 'object' || (id && model && position) != null){
      this._id = id._id || id;
      this._model = id._model || model;
      this._position = id._position || position;
      this._range = id._range || range || 3;
      this._permissions = id._permissions || (((yarp.doors && yarp.doors[id]) != null) ?
        yarp.doors[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.doors[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.doors && yarp.doors[id]) != null) ?
        yarp.doors[id].items.concat(items.filter(function (item) {
          return yarp.doors[id].items.indexOf(item) < 0;
        })) : (items || []));
      this._enter = id._enter || ((enter) ? enter.toString() : '() => {}');
      this._leave = id._leave || ((leave) ? leave.toString() : '() => {}');
      this.state = false;
      this.players = [];
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  open(){
    this.state = true;
    mp.players.call('playerOpenDoor',[JSON.stringify(this)]);
  }

  close(){
    this.state = false;
    mp.players.call('playerCloseDoor',[JSON.stringify(this)]);
  }

  static config(file){
    let doors = require(file);
    for (let id in doors){
      let door = doors[id];
      for (let i=0; i < door.positions.length; i++){
        new yarp.Door(id+' '+(i+1),door.model,door.positions[i],door.range,door.enter,door.leave,door.permissions,door.items);
      }
    }
  }
}
