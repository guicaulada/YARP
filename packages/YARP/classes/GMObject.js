'use strict';
/**
 * Implements common functionalities across all YARP objects.
 */
class GMObject {
  /**
   * @abstract
   * @throws {TypeError} Abstract class GMObject cannot be instantiated directly.
   * @memberof GMObject
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
   * @return {Boolean} Saving blocked?
   * @memberof GMObject
   */
  isLocked() {
    return this.lock__save__;
  }

  /**
   * Blocks saving the object.
   * @instance
   * @function lock
   * @memberof GMObject
   */
  lock() {
    this.lock__save__ = true;
  }

  /**
   * Unblocks saving the object.
   * @instance
   * @function unlock
   * @memberof GMObject
   */
  unlock() {
    this.lock__save__ = false;
  }

  /**
   * Save the object.
   * @instance
   * @function save
   * @memberof GMObject
   */
  save() {
    yarp.mng.save(this);
  }

  /**
   * Remove the object.
   * @instance
   * @function remove
   * @memberof GMObject
   */
  remove() {
    if (this.mp) this.mp.destroy();
    yarp.mng.remove(this);
  }

  /**
   * Get only persisten data
   * @instance
   * @function data
   * @return {Object} Persistent data object.
   * @memberof GMObject
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
   * @return {Object} Persistent data object.
   * @memberof GMObject
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
   * @memberof GMObject
   */
  get call() {
    return (eval(this._call));
  }

  /**
   * Set call function as string.
   * @instance
   * @function call
   * @param {Function} value Call function.
   * @memberof GMObject
   */
  set call(value) {
    this._call = value.toString();
  }

  /**
   * Evals the enter parameter.
   * @instance
   * @function enter
   * @memberof GMObject
   */
  get enter() {
    return (eval(this._enter));
  }

  /**
   * Set enter function as string.
   * @instance
   * @function enter
   * @param {Function} value Enter function.
   * @memberof GMObject
   */
  set enter(value) {
    this._enter = value.toString();
  }

  /**
   * Evals the leave parameter.
   * @instance
   * @function leave
   * @memberof GMObject
   */
  get leave() {
    return (eval(this._leave));
  }

  /**
   * Set leave function as string.
   * @instance
   * @function leave
   * @param {Function} value Leave function.
   * @memberof GMObject
   */
  set leave(value) {
    this._leave = value.toString();
  }

  /**
   * Returns first vaule or second value as default.
   * @instance
   * @function default
   * @param {*} v Verified value.
   * @param {*} d Default value if v is null.
   * @return {*} v if it's not null, or d
   * @memberof GMObject
   */
  default(v, d) {
    return (v != null) ? v : d;
  }

  /**
   * Make getter and setter for persistent variables.
   * @instance
   * @function makeGetterSetter
   * @memberof GMObject
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
