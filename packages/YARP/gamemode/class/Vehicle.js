'use strict';
/**
 * @file Vehicle class
 */
module.exports = class Vehicle{
  constructor(_id,model,position,owner,plate,color,alpha,locked,engine,dimension,hidden){
    if ((typeof _id) === 'object' || (_id && model && position && owner && plate && color && alpha && locked && engine && dimension && hidden) != null) {
      this._id = _id._id || _id;
      this.model = _id.model || model;
      this.position = _id.position || position;
      this.owner = _id.owner || owner;
      this.plate = _id.plate || plate;
      this.color = _id.color || color;
      this.alpha = _id.alpha || alpha;
      this.locked = _id.locked || locked;
      this.engine = _id.engine || engine;
      this.dimension = _id.dimension || dimension;
      this.hidden = _id.hidden || hidden;
    }
  }

  static load(){
    return yarp.dbm.load(Vehicle);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
}
