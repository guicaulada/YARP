'use strict';
/**
 * Creates a Vehicle.
 * @namespace yarp.Vehicle
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Vehicle id.
 * @param {string} model - Vehicle model.
 * @param {Vector3} position - Vehicle position.
 * @param {number} [heading=0] - Vehicle heading.
 * @param {string} [owner=null] - Vehicle owner.
 * @param {string} [plate=yarp.utils.randomString(8,'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')] - Vehicle plate.
 * @param {Array<number>} [color=[0,0,0]] - Vehicle color.
 * @param {number} [alpha=255] - Vehicle alpha.
 * @param {boolean} [locked=false] - Vehicle locked.
 * @param {boolean} [engine=false] - Vehicle engine.
 * @param {number}  [dimension=0] - Vehicle dimension.
 * @param {boolean} [visible=true] - Vehicle visible.
 * @param {Array<string>} [permissions=[]] - Vehicle permissions.
 * @param {Array<string>} [items=[]] - Vehicle items.
 * @param {function} [enter=() => {}] - Vehicle enter function.
 * @param {function} [leave=() => {}] - Vehicle leave function.
 */

class Vehicle extends yarp.GMObject{
  constructor(
    id,
    model,
    position,
    heading = 0,
    owner = false,
    plate = false,
    color = [0,0,0],
    alpha = 255,
    locked = false,
    engine = false,
    dimension = 0,
    visible = true,
    enter = () => {},
    leave = () => {},
    permissions = [],
    items = {}
  ){
    super();
    if ((id && model && position) != null) {
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
      this._dimension = dimension ;
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
        dimension: this._dimension
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
  set position(value){
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
  set heading(value){
    this.mp.rotation = new mp.Vector3(0,0,value);
    this._heading = value;
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Vehicle
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Vehicle(obj._id,obj._model,obj._position,obj._heading,obj._owner,obj._plate,obj._color,obj._alpha,obj._locked,obj._engine,obj._dimension,obj._visible,obj._permissions,obj._items);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Vehicle
   * @param {string} file - Config file path.
   */
  static config(file){
    let vehicles = require(file);
    for (let id in vehicles){
      let vehicle = vehicles[id];
      for (let i=0; i < vehicle.positions.length; i++){
        let nid = id + ' ' + (i + 1);
        if (!yarp.vehicles[nid]) {
          new Vehicle(nid, vehicle.model, vehicle.positions[i], vehicle.owner, vehicle.heading, vehicle.plate + i, vehicle.color, vehicle.alpha, vehicle.locked, vehicle.engine, vehicle.dimension, vehicle.visible, vehicle.permissions, vehicle.items)
        }
      }
    }
  }
}

module.exports = Vehicle;
