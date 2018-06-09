'use strict';
/**
 * Implements a Vehicles.
 * @class yarp.Vehicle
 * @extends yarp.GMObject
 */
class Vehicle extends yarp.GMObject {
  /**
   *Creates an instance of Vehicle.
   * @param {*} id
   * @param {*} model
   * @param {*} position
   * @param {number} [heading=0]
   * @param {boolean} [owner=false]
   * @param {boolean} [plate=false]
   * @param {*} [color=[0,0,0]]
   * @param {number} [alpha=255]
   * @param {boolean} [locked=false]
   * @param {boolean} [engine=false]
   * @param {number} [dimension=0]
   * @param {boolean} [visible=true]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Vehicle
   */
  constructor(
    id,
    model,
    position,
    heading = 0,
    owner = false,
    plate = false,
    color = [0, 0, 0],
    alpha = 255,
    locked = false,
    engine = false,
    dimension = 0,
    visible = true,
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
        heading: heading,
        owner: owner,
        plate: plate,
        color: color,
        alpha: alpha,
        locked: locked,
        engine: engine,
        dimension: dimension,
        visible: visible,
        enter: enter,
        leave: leave,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Vehicle(nid, model, position, heading, owner, plate, color, alpha, locked, engine, dimension, visible, enter, leave, permissions, items);
    } else if ((id && model && position) != null) {
      this._id = id;
      this._model = model;
      this._position = position;
      this._heading = heading;
      this._owner = owner;
      this._plate = (plate) ? plate : yarp.utils.randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
      this._color = color;
      this._alpha = alpha;
      this._locked = locked;
      this._engine = engine;
      this._dimension = dimension;
      this._visible = visible;
      this._permissions = permissions;
      this._items = items;
      if (!this._visible) this._alpha = 0;
      this._enter = enter.toString();
      this._leave = leave.toString();
      this.players = [];
      this.mp = mp.vehicles.new(mp.joaat(this._model), this._position,
      {
        heading: this._heading,
        numberPlate: this._plate,
        alpha: this._alpha,
        color: this._color,
        locked: this._locked,
        engine: this._engine,
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Set vehicle position.
   * @instance
   * @function position
   * @memberof yarp.Vehicle
   * @param {Vector3} value - Position value.
   */
  set position(value) {
    this.mp.position = value;
    this._position = value;
  }

  /**
   * Set vehicle heading.
   * @instance
   * @function heading
   * @memberof yarp.Vehicle
   * @param {number} value - Heading value.
   */
  set heading(value) {
    this.mp.rotation = new mp.Vector3(0, 0, value);
    this._heading = value;
  }
}

module.exports = Vehicle;
