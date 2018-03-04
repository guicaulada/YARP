'use strict';
/**
 * @file UserManager class
 */
module.exports = class UserManager{
  static add(user){
    user._id = this.getNewId();
    yarp.db.insertOne("users", user);
  }

  static findAll(){
    return yarp.db.findMany("users", {});
  }

  static findById(id){
    return yarp.db.findOne("users", {_id: id});
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
