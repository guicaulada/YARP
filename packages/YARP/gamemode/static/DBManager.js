'use strict';
/**
 * @file DB Manager class
 */
module.exports = class DBManager{


  static async connect(){
    await yarp.db.connect();
  }

  static async register(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    if (object._id){
      if (!yarp[collection]) yarp[collection] = {};
      yarp[collection][object._id] = object;
    } else {
      console.log(chalk.redBright("[YARP] ")+"ManagerError: object could not be registered in "+collection+", missing id.");
    }
  }

  static async save(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    if (object._id){
      yarp[collection][object._id] = object;
      let mp = object.mp;
      delete object.mp;
      try {
        await yarp.db.save(collection, object);
      } catch(err) {
        console.log(chalk.redBright("[YARP] ")+"ManagerError: "+err.message);
      }
      object.mp = mp;
    } else {
      console.log(chalk.redBright("[YARP] ")+"ManagerError: object could not be saved in "+collection+", missing id.");
    }
  }

  static async remove(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    if (object._id){
      yarp.db.remove(collection, {_id: object._id});
      yarp[collection][object._id] = null;
    } else {
      console.log(chalk.redBright("[YARP] ")+"ManagerError: object could not be removed in "+collection+", missing id.");
    }
  }

  static async load(Class){
    let collection = (new Class).constructor.name.toLowerCase()+"s";
    let res = await yarp.db.find(collection);
    for (let i = 0; i < res.length; i++){
      yarp[collection][res[i]._id] = new Class(res[i]);
    }
  }
}
