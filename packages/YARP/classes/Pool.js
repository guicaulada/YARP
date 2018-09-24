'use strict';
/**
 * Implements a Pool.
 */
class Pool {
  /**
   * Creates an instance of Pool.
   * @param {Class} Class
   * @memberof Pool
   */
  constructor(Class) {
    this._Class = Class;
  }

  /**
   * Load all objects from the pool collection.
   * @instance
   * @function load
   * @memberof Pool
   */
  async load() {
    await yarp.mng.load(this._Class);
  }

  /**
   * Load from config.
   * @instance
   * @function config
   * @param {*} file Config object or path.
   * @memberof Pool
   */
  async config(file) {
    await yarp.mng.config(this._Class, file);
  }

  /**
   * Categories in the pool.
   * @instance
   * @function categories
   * @return {Array<String>} Categories in the pool.
   * @memberof Pool
   */
  get categories() {
    let categories = {};
    for (let id in this) {
      if (id[0] != '_') {
        let obj = this[id];
        if (obj.category) {
          if (!categories[obj.category]) {
            categories[obj.category] = {};
          }
          categories[obj.category][obj.id] = obj;
        } else {
          break;
        }
      }
    }
    return categories;
  }

  /**
   * Elments in the pool.
   * @instance
   * @function length
   * @return {Number} Number of elements.
   * @memberof Pool
   */
  get length() {
    let count = 0;
    for (let id in this) {
      if (id[0] != '_') {
        count++;
      }
    }
    return count;
  }

  /**
   * Elments in the pool.
   * @instance
   * @function size
   * @return {Number} Number of elements.
   * @memberof Pool
   */
  get size() {
    return length;
  }

  /**
   * Checks if id exists in the pool.
   * @instance
   * @function exists
   * @param {String} id Object id.
   * @return {Boolean} If objects exists or not in the pool.
   * @memberof Pool
   */
  exists(id) {
    return (this[id] != null);
  }

  /**
   * Get object at id.
   * @instance
   * @function at
   * @param {String} id Object id.
   * @return {Object} Object at id.
   * @memberof Pool
   */
  at(id) {
    return this[id];
  }

  /**
   * Get the pool as array.
   * @instance
   * @function toArray
   * @return {Array<Object>} All objects in the pool.
   * @memberof Pool
   */
  toArray() {
    let array = [];
    for (let id in this) {
      if (id[0] != '_') {
        array.push(this[id]);
      }
    }
    return array;
  }

  /**
   * Execute a function for each element asynchronously.
   * @async
   * @instance
   * @function forEach
   * @param {Function} call Function to run for each element.
   * @memberof Pool
   */
  async forEach(call) {
    for (let id in this) {
      if (id[0] != '_') {
        call(this[id]);
      }
    }
  }

  /**
   * Execute a function for each element in range of a certain position asynchronously.
   * @async
   * @instance
   * @function forEachInRange
   * @param {Vector3} position Position.
   * @param {Number} range Max range.
   * @param {Function} call Function to run for each element.
   * @memberof Pool
   */
  async forEachInRange(position, range, call) {
    for (let id in this) {
      if (id[0] != '_' && yarp.utils.server.vectorDistance(this[id].position, position) <= range) {
        call(this[id]);
      }
    }
  }

  /**
   * Execute a function for each element dimension asynchronously.
   * @async
   * @instance
   * @function forEachInDimension
   * @param {Number} dimension Dimension.
   * @param {Function} call Function to run for each element.
   * @memberof Pool
   */
  async forEachInDimension(dimension, call) {
    for (let id in this) {
      if (id[0] != '_' && this[id].dimension == dimension) {
        call(this[id]);
      }
    }
  }
}

module.exports = Pool;
