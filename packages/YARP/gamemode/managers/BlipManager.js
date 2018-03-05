'use strict';
/**
 * @file BlipManager class
 */
module.exports = class BlipManager{
  static add(blip){
    return yarp.db.insertOne("blips", blip);
  }

  static findAll(){
    return yarp.db.findMany("blips", {});
  }

  static findById(id){
    return yarp.db.findOne("blips", {_id: id});
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
