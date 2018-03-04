'use strict';
/**
 * @file ConfigManager class
 */
module.exports = class ConfigManager{
  static add(config){
    yarp.db.insertOne("configs", config);
  }

  static findAll(){
    return yarp.db.findMany("configs", {});
  }

  static findById(id){
    return yarp.db.findOne("configs", {_id: id});
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
