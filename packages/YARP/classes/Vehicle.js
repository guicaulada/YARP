'use strict';
/**
 * Implements a Vehicles.
 * @class yarp.Vehicle
 * @extends yarp.GMObject
 */
class Vehicle extends yarp.GMObject {
  /**
   *Creates an instance of Vehicle.
   * @param {Object} params
   * @param {String} params.id
   * @param {*} params.model
   * @param {Vector3} params.position
   * @param {Number} [params.heading=0]
   * @param {Boolean} [params.owner=false]
   * @param {Boolean} [params.plate=false]
   * @param {*} [params.color=[0,0,0]]
   * @param {Number} [params.alpha=255]
   * @param {Boolean} [params.locked=false]
   * @param {Boolean} [params.engine=false]
   * @param {Number} [params.dimension=0]
   * @param {Boolean} [params.visible=true]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @param {Array} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @memberof yarp.Vehicle
   */
  constructor(params) {
    super();
    if ((params.id && params.model && params.position) != null) {
      this._id = params.id;
      this._model = params.model;
      this._position = params.position;
      this._heading = this.default(params.heading, 0);
      this._owner = this.default(params.owner, false);
      this._plate = this.default(params.plate, yarp.utils.randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'));
      this._color = this.default(params.color, [0, 0, 0]);
      this._alpha = this.default(params.alpha, 255);
      this._locked = this.default(params.locked, false);
      this._engine = this.default(params.engine, false);
      this._dimension = this.default(params.dimension, 0);
      this._visible = this.default(params.visible, true);
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      if (!this._visible) this._alpha = 0;
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
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
    } else {
      throw new TypeError('Vehicle class requires id, model and position to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Set vehicle position.
   * @instance
   * @function position
   * @memberof yarp.Vehicle
   * @param {Vector3} value Position value.
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
   * @param {Number} value Heading value.
   */
  set heading(value) {
    this.mp.rotation = new mp.Vector3(0, 0, value);
    this._heading = value;
  }
}

module.exports = Vehicle;
