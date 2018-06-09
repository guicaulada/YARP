'use strict';
/**
 * Implements a Prop.
 * @class yarp.Prop
 * @extends yarp.GMObject
 */
class Prop extends yarp.GMObject {
  /**
   *Creates an instance of Prop.
   * @param {*} id
   * @param {*} model
   * @param {*} position
   * @param {boolean} [owner=false]
   * @param {number} [alpha=255]
   * @param {*} [rotation=[]]
   * @param {number} [dimension=0]
   * @param {boolean} [visible=true]
   * @param {number} [range=3]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Prop
   */
  constructor(
    id,
    model,
    position,
    owner = false,
    alpha = 255,
    rotation = [],
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
        model: model,
        position: position,
        owner: owner,
        alpha: alpha,
        rotation: rotation,
        dimension: dimension,
        visible: visible,
        range: range,
        enter: enter,
        leave: leave,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Prop(nid, model, position, owner, alpha, rotation, dimension, visible, range, enter, leave, permissions, items);
    } else if ((id && model && position) != null) {
      this._id = id;
      this._model = model;
      this._position = position;
      this._owner = owner;
      this._alpha = alpha;
      this._rotation = rotation;
      this._dimension = dimension;
      this._visible = visible;
      this._range = range;
      this._permissions = permissions;
      this._items = items;
      this._enter = enter.toString();
      this._leave = leave.toString();
      if (!this._visible) this._alpha = 0;
      this.players = [];
      this.mp = mp.objects.new(mp.joaat(this._model), this._position,
      {
        rotation: this._rotation,
        alpha: this._alpha,
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Prop;
