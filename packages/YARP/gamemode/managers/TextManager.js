'use strict';
/**
 * @file TextManager class
 */
module.exports = class TextManagers{
  static add(text){
    yarp.db.insertOne("texts", text);
  }

  static findAll(){
    return yarp.db.findMany("texts", {});
  }

  static findById(id){
    return yarp.db.findOne("texts", {_id: id});
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
