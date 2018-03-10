'use strict';
/**
 * @file Item class
 */
module.exports = class Item{
  constructor(_id,name,weight,img,cb){
    if ((typeof _id) === 'object' || (_id && name && weight && img && cb) != null) {
      this._id = _id._id || _id;
      this.name = _id.name || name;
      this.weight = _id.weight || weight;
      this.img = _id.img || img;
      this.cb = _id.cb || cb;
    }
  }

  static load(){
    return yarp.mng.load(Item);
  }
  save(){
    yarp.mng.save(this);
  }
}
