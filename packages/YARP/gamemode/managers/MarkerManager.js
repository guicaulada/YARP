'use strict';
/**
 * @file MarkerManager class
 */
module.exports = class MarkerManager{
  static add(marker){
    return yarp.db.insertOne("markers", marker);
  }

  static findAll(){
    return yarp.db.findMany("markers", {});
  }

  static findById(id){
    return yarp.db.findOne("markers", {_id: id});
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
