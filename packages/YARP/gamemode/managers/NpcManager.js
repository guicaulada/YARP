'use strict';
/**
 * @file NpcManager class
 */
module.exports = class NpcManager{
  static add(npc){
    return yarp.db.insertOne("npcs", npc);
  }

  static findAll(){
    return yarp.db.findMany("npcs", {});
  }

  static findById(id){
    return yarp.db.findOne("npcs", {_id: id});
  }

  static indexById(){
    return new Promise((resolve, reject) =>{
      let result = {};
      this.findAll().then((collection) =>{
        if (!collection) reject(collection);
        for (let i = 0; i < collection.length; i++){
          result[collection[i]._id] = collection[i];
        }
        resolve(result);
      });
    });
  }
}
