'use strict';
/**
 * @file ConfigManager class
 */
module.exports = class ConfigManager{
  static add(config){
    return yarp.db.insertOne("configs", config);
  }

  static findAll(){
    return yarp.db.findMany("configs", {});
  }

  static findById(id){
    return yarp.db.findOne("configs", {_id: id});
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
