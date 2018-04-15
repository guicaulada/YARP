'use strict';
/**
 * Implements common functionalities across all YARP objects.
 * @namespace yarp.GMObject
 * @abstract
 * @class
 * @throws {TypeError} - Abstract class GMObject cannot be instantiated directly.
 */

class GMObject{
  constructor() {
    if (this.constructor === GMObject) {
      throw new TypeError('Abstract class GMObject cannot be instantiated directly.');
    }
  }

  /**
   * Save the object.
   * @instance
   * @function save
   * @memberof yarp.GMObject
   */
  save(){
    yarp.mng.save(this);
  }

  /**
   * Remove the object.
   * @instance
   * @function remove
   * @memberof yarp.GMObject
   */
  remove(){
    if (this.mp) this.mp.destroy();
    yarp.mng.remove(this);
  }

  /**
   * Get only persisten data
   * @instance
   * @function data
   * @memberof yarp.GMObject
   * @returns {object} - Persistent data object.
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
   * Evals the call parameter.
   * @instance
   * @function call
   * @memberof yarp.GMObject
   */
  get call(){
    return (eval(this._call));
  }

  set call(value) {
    this._call = value;
  }

  /**
   * Evals the enter parameter.
   * @instance
   * @function enter
   * @memberof yarp.GMObject
   */
  get enter() {
    return (eval(this._enter))
  }

  set enter(value) {
    this._enter = value;
  }

  /**
   * Evals the leave parameter.
   * @instance
   * @function leave
   * @memberof yarp.GMObject
   */
  get leave() {
    return (eval(this._leave))
  }

  set leave(value) {
    this._leave = value;
  }

  /**
   * Make getter and setter for persistent variables.
   * @instance
   * @function makeGetterSetter
   * @memberof yarp.GMObject
   */
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == '_'){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}

module.exports = GMObject;
