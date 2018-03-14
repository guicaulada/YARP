'use strict';
/**
 * @file DB Manager class
 */
module.exports = class DBManager{


  static async connect(){
    await yarp.db.connect();
  }

  static async save(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    if (object._id){
      yarp[collection][object._id] = object;
      yarp.db.save(collection, object);
    } else {
      console.log(chalk.redBright("[YARP] ")+"ManagerError: object could not be saved in "+collection+", missing _id.");
    }
  }

  static async remove(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    if (object._id){
      yarp.db.remove(collection, {_id: object._id});
      yarp[collection][object._id] = null;
    } else {
      console.log(chalk.redBright("[YARP] ")+"ManagerError: object could not be removed in "+collection+", missing _id.");
    }
  }

  static async load(Class){
    let collection = (new Class).constructor.name.toLowerCase()+"s";
    let result = {};
    let res = await yarp.db.find(collection);
    for (let i = 0; i < res.length; i++){
      result[res[i]._id] = new Class(res[i]);
    }
    yarp[collection] = result;
  }
}
