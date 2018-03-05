'use strict';
/**
 * @file GroupManager class
 */
module.exports = class GroupManager{
  static add(group){
    return yarp.db.insertOne("groups", group);
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
