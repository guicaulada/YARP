'use strict';
/**
 * Provides safe asynchronous interaction between MongoDB and YARP.
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
  if (object._id != null) {
    if (!yarp[collection]) yarp[collection] = {};
    yarp[collection][object._id] = object;
  } else {
    console.log(chalk.redBright('[YARP] ') + 'ManagerError: object could not be registered in ' + collection + ', missing id.\n' + JSON.stringify(object));
  }
};

/**
 * Save an object to MongoDB.
 * @async
 * @function save
 * @memberof yarp.mng
 * @param {object} object - Object to be saved.
 */
mng.save = async (object) => {
  let collection = object.constructor.name.toLowerCase()+'s';
  if (object._id != null) {
    yarp.db.save(collection, object.data);
  } else {
    console.log(chalk.redBright('[YARP] ') + 'ManagerError: object could not be saved in ' + collection + ', missing id.\n' + JSON.stringify(object));
  }
};

/**
 * Remove an object from MongoDB.
 * @async
 * @function remove
 * @memberof yarp.mng
 * @param {object} object - Object to be removed.
 */
mng.remove = async (object) => {
  let collection = object.constructor.name.toLowerCase()+'s';
  if (object._id != null) {
    yarp.db.remove(collection, {_id: object._id});
    delete yarp[collection][object._id];
  } else {
    console.log(chalk.redBright('[YARP] ') + 'ManagerError: object could not be removed in ' + collection + ', missing id.\n' + JSON.stringify(object));
  }
};

/**
 * Load classes into their respective temporary collections from MongoDB.
 * @async
 * @function load
 * @memberof yarp.mng
 * @param {object} Class - Class to be loaded.
 */
mng.load = async (Class) => {
  let collection = Class.name.toLowerCase()+'s';
  let res = await yarp.db.find(collection);
  for (let i = 0; i < res.length; i++) {
    yarp[collection][res[i]._id] = new Class(yarp.utils.cleanData(res[i]));
  }
};

/**
 * Load from config.
 * @async
 * @function config
 * @memberof yarp.mng
 * @param {object} Class - The object class.
 * @param {object} config - Config object or path.
 */
mng.config = (Class, config) => {
  if (typeof config === 'string') config = require(config);
  let collection = Class.name.toLowerCase() + 's';
  let params = yarp.utils.getParamNames(Class);
  if (collection == ('users' || 'characters')) {
    for (let id in config) {
      if (config.hasOwnProperty(id)) {
        let object = config[id];
        if (yarp[collection][id]) {
          for (let group of object.groups) {
            yarp[collection][id].giveGroup(group);
          }
          if (object.enter) {
            yarp[collection][id].enter = object.enter.toString();
          }
          if (object.leave) {
            yarp[collection][id].leave = object.leave.toString();
          }
        }
      }
    }
  } else if (params.indexOf('category') >= 0) {
    for (let category in config) {
      if (config.hasOwnProperty(category)) {
        for (let id in config[category]) {
          if (config[category].hasOwnProperty(id)) {
            if (!yarp[collection][id]) {
              let object = config[category][id];
              object.category = category;
              object.id = id;
              yarp[collection][id] = new Class(object);
            }
          }
        }
      }
    }
  } else if (params.indexOf('position') >= 0) {
    for (let id in config) {
      if (config.hasOwnProperty(id)) {
        let object = config[id];
        let positions = object.positions;
        delete object.positions;
        if (positions) {
          for (let i = 0; i < positions.length; i++) {
            let nid = id + ' ' + (i + 1);
            object.position = positions[i];
            object.id = nid;
            if (!yarp[collection][nid]) {
              yarp[collection][nid] = new Class(object);
            }
          }
        }
      }
    }
  } else {
    for (let id in config) {
      if (config.hasOwnProperty(id)) {
        if (!yarp[collection][id]) {
          let object = {};
          if (collection == 'variables') {
            object.id = id;
            object.value = config[id];
          } else {
            object = config[id];
            object.id = id;
          }
          yarp[collection][id] = new Class(object);
        }
      }
    }
  }
};

module.exports = mng;
