'use strict';
/**
 * @file Manager class
 */
module.exports = class Manager{

  static save(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    yarp[collection][object._id] = object;
    yarp.db.save(collection, object);
  }

  static indexById(Class){
    let collection = (new Class).constructor.name.toLowerCase()+"s";
    let result = {};
    return new Promise((resolve, reject) =>{
      yarp.db.find(collection,{}).then((res) =>{
        if (!res) reject(res);
        for (let i = 0; i < res.length; i++){
          result[res[i]._id] = new Class(res[i]);
        }
        resolve(result);
      });
    });
  }
}
