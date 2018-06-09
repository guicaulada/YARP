'use strict';
/**
 * Implements a Marker.
 * @class yarp.Marker
 * @extends yarp.GMObject
 */
class Marker extends yarp.GMObject {
  /**
   *Creates an instance of Marker.
   * @param {*} id
   * @param {*} position
   * @param {number} [type=1]
   * @param {number} [radius=1]
   * @param {*} [color=[255, 255, 0, 255]]
   * @param {*} [direction=new mp.Vector3(0, 0, 0)]
   * @param {*} [rotation=new mp.Vector3(0, 0, 0)]
   * @param {boolean} [visible=true]
   * @param {number} [dimension=0]
   * @param {number} [range=3]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Marker
   */
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
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        position: position,
        type: type,
        radius: radius,
        color: color,
        direction: direction,
        rotation: rotation,
        visible: visible,
        dimension: dimension,
        range: range,
        enter: enter,
        leave: leave,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Marker(nid, position, type, radius, color, direction, rotation, visible, dimension, range, enter, leave, permissions, items);
    } else if ((id && position) != null) {
      this._id = id;
      this._type = type;
      this._position = yarp.utils.vectorOffset(position, new mp.Vector3(0, 0, -1));
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
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Marker;
