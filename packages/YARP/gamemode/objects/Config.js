'use strict';
/**
 * @file Config class
 */
module.exports = class Config{
  constructor(key,value){
    this._id = key;
    this.value = value;
  }
}
