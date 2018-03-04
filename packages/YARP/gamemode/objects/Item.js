'use strict';
/**
 * @file Item class
 */
module.exports = class Item{
  constructor(id,name,weight,img,cb){
    this._id = id;
    this.name = name;
    this.weight = weight;
    this.img = img;
    this.cb = cb;
  }
}
