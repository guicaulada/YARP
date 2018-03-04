'use strict';
/**
 * @file BlipManager class
 */
module.exports = class BlipManager{
  static add(blip){
    yarp.db.insertOne("blips", blip);
  }

  static findAll(){
    return yarp.db.findMany("blips", {});
  }

  static findById(id){
    return yarp.db.findOne("blips", {_id: id});
  }

  static indexById(){
    let result = {};
    let collection = this.findAll();
    for (object of collection){
      result[object._id] = object;
    }
    return result;
  }
}
