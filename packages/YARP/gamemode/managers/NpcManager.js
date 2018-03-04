'use strict';
/**
 * @file NpcManager class
 */
module.exports = class NpcManager{
  static add(npc){
    yarp.db.insertOne("npcs", npc);
  }

  static findAll(){
    return yarp.db.findMany("npcs", {});
  }

  static findById(id){
    return yarp.db.findOne("npcs", {_id: id});
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
