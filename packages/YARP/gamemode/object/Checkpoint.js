'use strict';
/**
 * @file Checkpoint class
 */
module.exports = class Checkpoint extends yarp.gmo{
  constructor(id,position,type,radius,color,direction,dimension,visible,range,enter,leave,permissions,items){
    super();
    if ((typeof id) === 'object' || (id && position) != null) {
      this._id = id._id || id;
      this._type = id._type || type || 0;
      this._position = id._position || yarp.utils.Vector3Offset(position,new mp.Vector3(0,0,-1));
      this._range = id._range || range || 3;
      this._permissions = id._permissions || (((yarp.checkpoints && yarp.checkpoints[id]) != null) ?
        yarp.checkpoints[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.checkpoints[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.checkpoints && yarp.checkpoints[id]) != null) ?
        yarp.checkpoints[id].items.concat(items.filter(function (item) {
          return yarp.checkpoints[id].items.indexOf(item) < 0;
        })) : (items || []));
      this._radius = id._radius || radius || 1;
      this._direction = id._direction || direction || new mp.Vector3(0,0,0);
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : '() => {}');
      this._leave = id._leave || ((leave) ? leave.toString() : '() => {}');
      this.players = [];
      this.mp = mp.checkpoints.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        color: this._color,
        visible: this._visible,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let checkpoints = require(file);
    for (let id in checkpoints){
      let checkpoint = checkpoints[id];
      for (let i=0; i < checkpoint.positions.length; i++){
        new yarp.Checkpoint(id+' '+(i+1),checkpoint.positions[i],checkpoint.type,checkpoint.radius,checkpoint.color,checkpoint.direction,checkpoint.dimension,checkpoint.visible,checkpoint.range,checkpoint.enter,checkpoint.leave,checkpoint.permissions,checkpoint.items)
      }
    }
  }
}
