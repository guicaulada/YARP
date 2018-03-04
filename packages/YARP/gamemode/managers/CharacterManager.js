'use strict';
/**
 * @file CharacterManager class
 */
module.exports = class CharacterManager{
  static add(character){
    yarp.db.insertOne("characters", character);
  }

  static findAll(){
    return yarp.db.findMany("characters", {});
  }

  static findById(id){
    return yarp.db.findOne("characters", {_id: id});
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
