'use strict';
/**
 * Creates a Checkpoint.
 * @namespace yarp.Checkpoint
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Checkpoint id.
 * @param {Vector3} position - Checkpoint position.
 * @param {number} [type=0] - Checkpoint type.
 * @param {number} [radius=1] - Checkpoint radius.
 * @param {Array<number>} [color=[255,255,0,255]] - Checkpoint color.
 * @param {Vector3} [direction=new mp.Vector3(0,0,0)] - Checkpoint direction.
 * @param {number}  [dimension=0] - Checkpoint dimension.
 * @param {boolean} [visible=true] - Checkpoint visible.
 * @param {number} [range=3] - Checkpoint range.
 * @param {function} [enter=() => {}] - Checkpoint enter function.
 * @param {function} [leave=() => {}] - Checkpoint leave function.
 * @param {Array<string>} [permissions=[]] - Checkpoint permissions.
 * @param {Array<string>} [items=[]] - Checkpoint items.
 */

class Checkpoint extends yarp.GMObject{
  constructor(id,position,type,radius,color,direction,dimension,visible,range,enter,leave,permissions,items){
    super();
    if ((id && position) != null) {
      this._id = id;
      this._type = type || 0;
      this._position = yarp.utils.Vector3Offset(position,new mp.Vector3(0,0,-1));
      this._range = range || 3;
      this._permissions = ((permissions) ? (((yarp.checkpoints && yarp.checkpoints[id]) != null) ?
        yarp.checkpoints[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.checkpoints[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.checkpoints && yarp.checkpoints[id]) != null) ?
        yarp.checkpoints[id].items.concat(items.filter(function (item) {
          return yarp.checkpoints[id].items.indexOf(item) < 0;
        })) : items) : []);
      this._radius = radius || 1;
      this._color = color || [255,255,0,255],
      this._direction = direction || new mp.Vector3(0,0,0);
      this._dimension = dimension || 0;
      this._visible = visible || true;
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      this.players = [];
      this.mp = mp.checkpoints.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        color: this._color,
        visible: this._visible,
        dimension: this._dimension
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Checkpoint
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Checkpoint(obj._id,obj._position,obj._type,obj._radius,obj._color,obj._direction,obj._dimension,obj._visible,obj._range,obj._enter,obj._leave,obj._permissions,obj._items);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Checkpoint
   * @param {string} file - Config file path.
   */
  static config(file){
    let checkpoints = require(file);
    for (let id in checkpoints){
      let checkpoint = checkpoints[id];
      for (let i=0; i < checkpoint.positions.length; i++){
        new Checkpoint(id+' '+(i+1),checkpoint.positions[i],checkpoint.type,checkpoint.radius,checkpoint.color,checkpoint.direction,checkpoint.dimension,checkpoint.visible,checkpoint.range,checkpoint.enter,checkpoint.leave,checkpoint.permissions,checkpoint.items)
      }
    }
  }
}

module.exports = Checkpoint;
