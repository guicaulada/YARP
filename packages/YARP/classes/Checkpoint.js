'use strict';
/**
 * Implements a Checkpoint.
 * @class yarp.Checkpoint
 * @extends yarp.GMObject
 */
class Checkpoint extends yarp.GMObject {
  /**
   *Creates an instance of Checkpoint.
   * @param {*} id
   * @param {*} position
   * @param {number} [type=0]
   * @param {number} [radius=1]
   * @param {*} [color=[255, 255, 0, 255]]
   * @param {*} [direction=new mp.Vector3(0, 0, 0)]
   * @param {number} [dimension=0]
   * @param {boolean} [visible=true]
   * @param {number} [range=3]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Checkpoint
   */
  constructor(
    id,
    position,
    type = 0,
    radius = 1,
    color = [255, 255, 0, 255],
    direction = new mp.Vector3(0, 0, 0),
    dimension = 0,
    visible = true,
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
        dimension: dimension,
        visible: visible,
        range: range,
        enter: enter,
        leave: leave,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Checkpoint(nid, position, type, radius, color, direction, dimension, visible, range, enter, leave, permissions, items);
    } else if ((id && position) != null) {
      this._id = id;
      this._type = type;
      this._position = yarp.utils.vectorOffset(position, new mp.Vector3(0, 0, -1));
      this._range = range;
      this._permissions = permissions;
      this._items = items;
      this._radius = radius;
      this._color = color,
      this._direction = direction;
      this._dimension = dimension;
      this._visible = visible;
      this._enter = enter.toString();
      this._leave = leave.toString();
      this.players = [];
      this.mp = mp.checkpoints.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        color: this._color,
        visible: this._visible,
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Checkpoint;
