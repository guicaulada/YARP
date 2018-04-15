'use strict';
/**
 * Creates a Pool.
 * @namespace yarp.Pool
 * @class
 * @param {class} Class - The class of the objects in the pool.
 */

class Pool {
  constructor(Class){
    this._Class = Class;
  }

  /**
   * Load all objects from the pool collection.
   * @instance
   * @function load
   * @memberof yarp.Pool
   * @param {object} object - Class object.
   */
  load(){
    return yarp.mng.load(this._Class);
  }

  /**
   * Load from config.
   * @instance
   * @function config
   * @memberof yarp.Pool
   * @param {string} file - Config file path.
   */
  config(file){
    if (this._Class.config != null && (typeof file) === 'string') {
      return this._Class.config(file);
    } else {
      return null;
    }
  }

  /**
   * Categories in the pool.
   * @instance
   * @function categories
   * @memberof yarp.Pool
   * @returns {Array<string>} - Categories in the pool.
   */
  get categories(){
    let categories = {};
    for (let id in this){
      if (id[0] != '_') {
        let obj = this[id];
        if (obj.category){
          if (!categories[obj.category]){
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
   * @memberof yarp.Pool
   * @returns {number} - Number of elements.
   */
  get length(){
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
   * @memberof yarp.Pool
   * @returns {number} - Number of elements.
   */
  get size(){
    return length;
  }

  /**
   * Checks if id exists in the pool.
   * @instance
   * @function exists
   * @memberof yarp.Pool
   * @param {string} id - Object id.
   * @returns {boolean} - If objects exists or not in the pool.
   */
  exists(id){
    return (this[id] != null);
  }

  /**
   * Get object at id.
   * @instance
   * @function at
   * @memberof yarp.Pool
   * @param {string} id - Object id.
   * @returns {object} - Object at id.
   */
  at(id){
    return this[id];
  }

  /**
   * Get the pool as array.
   * @instance
   * @function toArray
   * @memberof yarp.Pool
   * @returns {Array<object>} - All objects in the pool.
   */
  toArray(){
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
   * @memberof yarp.Pool
   * @param {function} call - Function to run for each element.
   */
  async forEach(call){
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
   * @memberof yarp.Pool
   * @param {Vector3} position - Position.
   * @param {number} range - Max range.
   * @param {function} call - Function to run for each element.
   */
  async forEachInRange(position,range,call){
    for (let id in this) {
      if (id[0] != '_' && yarp.utils.Vector3Distance(this[id].position, position) <= range) {
        call(this[id]);
      }
    }
  }

  /**
   * Execute a function for each element dimension asynchronously.
   * @async
   * @instance
   * @function forEachInDimension
   * @memberof yarp.Pool
   * @param {number} dimension - Dimension.
   * @param {function} call - Function to run for each element.
   */
  async forEachInDimension(dimension,call){
    for (let id in this) {
      if (id[0] != '_' && this[id].dimension == dimension) {
        call(this[id]);
      }
    }
  }
}

module.exports = Pool;
