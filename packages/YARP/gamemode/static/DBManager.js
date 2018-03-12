'use strict';
/**
 * @file DB Manager class
 */
module.exports = class DBManager{

  static save(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    if (object._id){
      yarp[collection][object._id] = object;
      yarp.db.save(collection, object);
    } else {
      console.log(chalk.redBright("[YARP] ")+"ManagerError: object could not be saved in "+collection+", missing _id.");
    }
  }

  static remove(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    if (object._id){
      yarp.db.remove(collection, {_id: object._id});
      yarp[collection][object._id] = null;
    } else {
      console.log(chalk.redBright("[YARP] ")+"ManagerError: object could not be removed in "+collection+", missing _id.");
    }
  }

  static load(Class){
    return new Promise((resolve, reject) =>{
      let collection = (new Class).constructor.name.toLowerCase()+"s";
      let result = {};
      yarp.db.find(collection).then((res) =>{
        for (let i = 0; i < res.length; i++){
          result[res[i]._id] = new Class(res[i]);
        }
        yarp[collection] = result;
        resolve();
      });
    });
  }
}
