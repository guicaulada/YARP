'use strict';
/**
 * @file Pool class
 */
module.exports = class Pool {
  constructor(Class){
    this._Class = Class;
  }

  load(){
    return yarp.dbm.load(this._Class);
  }

  config(file){
    if (this._Class.config != null && (typeof file) === 'string') {
      return this._Class.config(file);
    } else {
      return null;
    }
  }

  get categories(){
    let categories = {};
    for (let id in this){
      if (id[0] != "_") {
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

  get length(){
    let count = 0;
    for (let id in this) {
      if (id[0] != "_") {
        count++;
      }
    }
    return count;
  }

  get size(){
    let count = 0;
    for (let id in this) {
      if (id[0] != "_") {
        count++;
      }
    }
    return count;
  }

  exists(id){
    return (this[id] != null);
  }

  at(id){
    return this[id];
  }

  toArray(call){
    let array = [];
    for (let id in this) {
      if (id[0] != "_") {
        array.push(this[id]);
      }
    }
    return array;
  }

  async forEach(call){
    for (let id in this) {
      if (id[0] != "_") {
        call(this[id]);
      }
    }
  }

  async forEachInRange(position,range,call){
    for (let id in this) {
      if (id[0] != "_" && yarp.utils.Vector3Distance(this[id].position, position) <= range) {
        call(this[id]);
      }
    }
  }

  async forEachInDimension(dimension,call){
    for (let id in this) {
      if (id[0] != "_" && this[id].dimension == dimension) {
        call(this[id]);
      }
    }
  }
}
