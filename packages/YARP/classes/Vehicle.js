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
  constructor(id,model,position,heading,owner,plate,color,alpha,locked,engine,dimension,visible,permissions,items,enter,leave){
    super();
    if ((id && model && position) != null) {
      this._id = id;
      this._model = model;
      this._position = position;
      this._heading = heading || 0;
      this._owner = owner || null;
      this._plate = plate || yarp.utils.randomString(8,'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
      this._color = color || [0,0,0];
      this._alpha = alpha || 255;
      this._locked = locked || false;
      this._engine = engine || false;
      this._dimension = dimension || 0;
      this._visible = visible || true;
      this._permissions = ((permissions) ? (((yarp.vehicles && yarp.vehicles[id]) != null) ?
        yarp.vehicles[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.vehicles[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.vehicles && yarp.vehicles[id]) != null) ?
        yarp.vehicles[id].items.concat(items.filter(function (item) {
          return yarp.vehicles[id].items.indexOf(item) < 0;
        })) : items) : []);
      if (!this._visible) this._alpha = 0;
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
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
        new Vehicle(id+' '+(i+1),vehicle.model,vehicle.positions[i],vehicle.owner,vehicle.heading,vehicle.plate+i,vehicle.color,vehicle.alpha,vehicle.locked,vehicle.engine,vehicle.dimension,vehicle.visible,vehicle.permissions,vehicle.items)
      }
    }
  }
}

module.exports = Vehicle;
