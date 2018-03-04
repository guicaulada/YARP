'use strict';
/**
 * @file MarkerManager class
 */
module.exports = class MarkerManager{
  static add(marker){
    yarp.db.insertOne("markers", marker);
  }

  static findAll(){
    return yarp.db.findMany("markers", {});
  }

  static findById(id){
    return yarp.db.findOne("markers", {_id: id});
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
