'use strict';
/**
 * Provides safe asynchronous interaction between MongoDB and YARP.
 * @module manager
 * @namespace yarp.mng
 */

let mng = {};

/**
 * Register an object to the temporary collection in memory.
 * @async
 * @function register
 * @memberof yarp.mng
 * @param {object} object - Object to be registered.
 */
mng.register = async (object) => {
  let collection = object.constructor.name.toLowerCase()+'s';
  if (object._id){
    if (!yarp[collection]) yarp[collection] = {};
    yarp[collection][object._id] = object;
  } else {
    console.log(chalk.redBright('[YARP] ')+'ManagerError: object could not be registered in '+collection+', missing id.');
  }
}

/**
 * Save an object to MongoDB.
 * @async
 * @function save
 * @memberof yarp.mng
 * @param {object} object - Object to be saved.
 */
mng.save = async (object) => {
  let collection = object.constructor.name.toLowerCase()+'s';
  if (object._id){
    yarp.db.save(collection, object.data);
  } else {
    console.log(chalk.redBright('[YARP] ')+'ManagerError: object could not be saved in '+collection+', missing id.');
  }
}

/**
 * Remove an object from MongoDB.
 * @async
 * @function remove
 * @memberof yarp.mng
 * @param {object} object - Object to be removed.
 */
mng.remove = async (object) => {
  let collection = object.constructor.name.toLowerCase()+'s';
  if (object._id){
    yarp.db.remove(collection, {_id: object._id});
    delete yarp[collection][object._id];
  } else {
    console.log(chalk.redBright('[YARP] ')+'ManagerError: object could not be removed in '+collection+', missing id.');
  }
}

/**
 * Load classes into their respective temporary collections from MongoDB.
 * @async
 * @function load
 * @memberof yarp.mng
 * @param {object} Class - Class to be loaded.
 */
mng.load = async (Class) => {
  let collection = (new Class).constructor.name.toLowerCase()+'s';
  let res = await yarp.db.find(collection);
  for (let i = 0; i < res.length; i++){
    yarp[collection][res[i]._id] = Class.load(res[i]);
  }
}

module.exports = mng;
