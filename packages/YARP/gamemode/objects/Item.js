'use strict';
/**
 * @file Item class
 */
import ItemManager from '../managers/ItemManager';
export default class Item{
  constructor(name,weight,img,cb){
    this._id = ItemManager.getNewId();
    this.name = name;
    this.weight = weight;
    this.img = img;
    this.cb = cb;
  }

  save(){
    ItemManager.save(this);
  }
}
