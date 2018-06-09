'use strict';
/**
 * Implements a Colshape.
 * @class yarp.Colshape
 * @extends yarp.GMObject
 */
class Colshape extends yarp.GMObject {
  /**
   *Creates an instance of Colshape.
   * @param {*} id
   * @param {*} position
   * @param {number} [type=1]
   * @param {number} [width=10]
   * @param {number} [height=10]
   * @param {number} [depth=10]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Colshape
   */
  constructor(
    id,
    position,
    type = 1,
    width = 10,
    height = 10,
    depth = 10,
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
        width: width,
        height: height,
        depth: depth,
        enter: enter,
        leave: leave,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Colshape(nid, position, type, width, height, depth, enter, leave, permissions, items);
    } else if ((id && position) != null) {
      this._id = id;
      this._type = type;
      this._position = position;
      this._width = width;
      this._depth = depth;
      this._height = height;
      this._visible = visible;
      this._enter = enter.toString();
      this._leave = leave.toString();
      this._permissions = permissions;
      this._items = items;
      switch (this._type) {
        case 1:
          this.mp = mp.colshapes.newRectangle(this._position.x, this._position.y, this._width, this._height);
          break;
        case 2:
          this.mp = mp.colshapes.newCuboid(this._position.x, this._position.y, this._position.z, this._width, this._depth, this._height);
          break;
        case 3:
          this.mp = mp.colshapes.newCircle(this._position.x, this._position.y, this._width);
          break;
        default:
          this.mp = mp.colshapes.newSphere(this._position.x, this._position.y, this._position.z, this._width);
      }
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Colshape;
