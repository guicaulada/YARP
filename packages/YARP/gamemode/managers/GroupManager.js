'use strict';
/**
 * @file GroupManager class
 */
module.exports = class GroupManager{
  static add(group){
    yarp.db.insertOne("groups", group);
  }

  static findByType(type){
    return yarp.db.findMany("groups", {type: type});
  }

  static findAll(){
    return yarp.db.findMany("groups", {});
  }

  static findById(id){
    return yarp.db.findOne("items", {_id: id});
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
