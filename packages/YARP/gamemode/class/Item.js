'use strict';
/**
 * @file Item class
 */
module.exports = class Item{
  constructor(id,name,weight,img,cb){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.name = id.name;
      this.weight = id.weight;
      this.img = id.img;
      this.cb = id.cb;
    } else if ((id && name && weight && img && cb) != null) {
      this._id = id;
      this.name = name;
      this.weight = weight;
      this.img = img;
      this.cb = cb;
    }
  }

  static load(){
    return yarp.Manager.load(Item);
  }
  save(){
    yarp.Manager.save(this);
  }
}
