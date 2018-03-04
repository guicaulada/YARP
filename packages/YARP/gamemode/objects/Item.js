'use strict';
/**
 * @file Item class
 */
import ItemManager from '../managers/ItemManager';
export default class Item{
  constructor(name,weight,img,callback){
    this._id = ItemManager.getNewId();
    this.name = name;
    this.weight = weight;
    this.img = img;
    this.callback = callback;
  }
}
