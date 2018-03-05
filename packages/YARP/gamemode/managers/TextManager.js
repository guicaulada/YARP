'use strict';
/**
 * @file TextManager class
 */
module.exports = class TextManagers{
  static add(text){
    return yarp.db.insertOne("texts", text);
  }

  static findAll(){
    return yarp.db.findMany("texts", {});
  }

  static findById(id){
    return yarp.db.findOne("texts", {_id: id});
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
