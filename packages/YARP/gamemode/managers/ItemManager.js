'use strict';
/**
 * @file ItemManager class
 */
module.exports = class ItemManager{
  static add(item){
    return yarp.db.insertOne("items", item);
  }

  static findAll(){
    return yarp.db.findMany("items", {});
  }

  static findById(id){
    return yarp.db.findOne("items", {_id: id});
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
