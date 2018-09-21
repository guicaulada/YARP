'use strict';
/**
 * Implements common functionalities across all YARP objects.
 */
class GMObject {
  /**
   * @memberof yarp.Object
   * @abstract
   * @throws {TypeError} Abstract class GMObject cannot be instantiated directly.
   */
  constructor() {
    if (this.constructor === GMObject) {
      throw new TypeError('Abstract class GMObject cannot be instantiated directly.');
    }
  }

  /**
   * Returns true if saving is blocked.
   * @instance
   * @function isLocked
   * @memberof yarp.Object
   * @return {Boolean} Saving blocked?
   */
  isLocked() {
    return this.lock__save__;
  }

  /**
   * Blocks saving the object.
   * @instance
   * @function lock
   * @memberof yarp.Object
   */
  lock() {
    this.lock__save__ = true;
  }

  /**
   * Unblocks saving the object.
   * @instance
   * @function unlock
   * @memberof yarp.Object
   */
  unlock() {
    this.lock__save__ = false;
  }

  /**
   * Save the object.
   * @instance
   * @function save
   * @memberof yarp.Object
   */
  save() {
    yarp.mng.save(this);
  }

  /**
   * Remove the object.
   * @instance
   * @function remove
   * @memberof yarp.Object
   */
  remove() {
    if (this.mp) this.mp.destroy();
    yarp.mng.remove(this);
  }

  /**
   * Get only persisten data
   * @instance
   * @function data
   * @memberof yarp.Object
   * @return {Object} Persistent data object.
   */
  get data() {
    let data = {};
    for (let key of Object.keys(this)) {
      if (key[0] == '_') {
        data[key] = this[key];
      }
    }
    return data;
  }

  /**
   * Get only persisten data without prefix
   * @instance
   * @function data
   * @memberof yarp.Object
   * @return {Object} Persistent data object.
   */
  get cleanData() {
    let data = {};
    for (let key of Object.keys(this)) {
      if (key[0] == '_') {
        data[key.slice(1, key.length)] = this[key];
      }
    }
    return data;
  }

  /**
   * Evals the call parameter.
   * @instance
   * @function call
   * @memberof yarp.Object
   */
  get call() {
    return (eval(this._call));
  }

  /**
   * Set call function as string.
   * @instance
   * @function call
   * @memberof yarp.Object
   * @param {Function} value Call function.
   */
  set call(value) {
    this._call = value.toString();
  }

  /**
   * Evals the enter parameter.
   * @instance
   * @function enter
   * @memberof yarp.Object
   */
  get enter() {
    return (eval(this._enter));
  }

  /**
   * Set enter function as string.
   * @instance
   * @function enter
   * @memberof yarp.Object
   * @param {Function} value Enter function.
   */
  set enter(value) {
    this._enter = value.toString();
  }

  /**
   * Evals the leave parameter.
   * @instance
   * @function leave
   * @memberof yarp.Object
   */
  get leave() {
    return (eval(this._leave));
  }

  /**
   * Set leave function as string.
   * @instance
   * @function leave
   * @memberof yarp.Object
   * @param {Function} value Leave function.
   */
  set leave(value) {
    this._leave = value.toString();
  }

  /**
   * Returns first vaule or second value as default.
   * @instance
   * @function default
   * @memberof yarp.Object
   * @param {*} v Verified value.
   * @param {*} d Default value if v is null.
   * @return {*} v if it's not null, or d
   */
  default(v, d) {
    return (v != null) ? v : d;
  }

  /**
   * Make getter and setter for persistent variables.
   * @instance
   * @function makeGetterSetter
   * @memberof yarp.Object
   */
  makeGetterSetter() {
    for (let key in this) {
      if (key[0] == '_') {
        let gsp = key.slice(1, key.length);
        if (!(gsp in this)) {
          Object.defineProperty(this, gsp, {
            get: () => {
              return this[key];
            },
            set: (value) => {
              this[key] = value;
            },
          });
        }
      }
    }
  }
}

module.exports = GMObject;
