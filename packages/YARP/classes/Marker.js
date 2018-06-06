'use strict';
/**
 * Creates a Marker.
 * @namespace yarp.Marker
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Marker id.
 * @param {Vector3} position - Marker position.
 * @param {number} [type=1] - Marker type.
 * @param {number} [radius=1] - Marker radius.
 * @param {Array<number>} [color=[255,255,0,255]] - Marker color.
 * @param {Vector3} [direction=new mp.Vector3(0,0,0)] - Marker direction.
 * @param {Vector3} [rotation=new mp.Vector3(0,0,0)] - Marker rotation.
 * @param {number}  [dimension=0] - Marker dimension.
 * @param {boolean} [visible=true] - Marker visible.
 * @param {number} [range=3] - Marker range.
 * @param {function} [enter=() => {}] - Marker enter function.
 * @param {function} [leave=() => {}] - Marker leave function.
 * @param {Array<string>} [permissions=[]] - Marker permissions.
 * @param {Array<string>} [items=[]] - Marker items.
 */

class Marker extends yarp.GMObject{
  constructor(
    id,
    position,
    type = 1,
    radius = 1,
    color = [255, 255, 0, 255],
    direction = new mp.Vector3(0, 0, 0),
    rotation = new mp.Vector3(0, 0, 0),
    visible = true,
    dimension = 0,
    range = 3,
    enter = () => {},
    leave = () => {},
    permissions = [],
    items = {}
  ){
    super();
    if ((id && position) != null){
      this._id = id;
      this._type = type;
      this._position = yarp.utils.Vector3Offset(position,new mp.Vector3(0,0,-1));
      this._range = range;
      this._radius = radius;
      this._color = color;
      this._direction = direction;
      this._rotation = rotation;
      this._visible = visible;
      this._dimension = dimension;
      this._enter = enter.toString();
      this._leave = leave.toString();
      this._permissions = permissions;
      this._items = items;
      if (!this._visible) this._color[4] = 0;
      this.players = [];
      this.mp = mp.markers.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        rotation: this._rotation,
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
   * @memberof yarp.Marker
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Marker(obj._id,obj._position,obj._type,obj._radius,obj._color,obj._direction,obj._rotation,obj._visible,obj._dimension,obj._range,obj._enter,obj._leave,obj._permissions,obj._items);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Marker
   * @param {string} file - Config file path.
   */
  static config(file){
    let markers = require(file);
    for (let id in markers){
      let marker = markers[id];
      for (let i=0; i < marker.positions.length; i++){
        let nid = id + ' ' + (i + 1);
        if (!yarp.markers[nid]) {
          new Marker(nid,marker.positions[i],marker.type,marker.radius,marker.color,marker.direction,marker.rotation,marker.visible,marker.dimension,marker.range,marker.enter,marker.leave,marker.permissions,marker.items)
        }
      }
    }
  }
}

module.exports = Marker;
