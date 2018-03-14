'use strict';
/**
 * @file Checkpoint class
 */
module.exports = class Checkpoint{
  constructor(_id,type,position,radius,direction,color,dimension,hidden,cb){
    if ((typeof _id) === 'object' || (_id && model && position && owner && alpha && rotation && dimension && hidden) != null) {
      this._id = _id._id || _id;
      this.model = _id.model || model;
      this.position = _id.position || position;
      this.owner = _id.owner || owner;
      this.alpha = _id.alpha || alpha;
      this.rotation = _id.rotation || rotation;
      this.dimension = _id.dimension || dimension;
      this.hidden = _id.hidden || hidden;
      this.cb = _id.cb || cb;
    }
  }

  static load(){
    return yarp.dbm.load(Checkpoint);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
}
