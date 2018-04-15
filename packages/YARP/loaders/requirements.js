'use strict';
/**
 * @file Loads the requirements on server-side.
 * @namespace loaders
 */

/**
 * Loads the requirements asynchronously.
 * @async
 * @function
 */
module.exports = async () => {
  // Loading requirements
  console.log(chalk.yellowBright('[YARP] ')+'Loading Requirements');
  try {
    yarp.utils = require('../modules/utils.js');
    yarp.db = require('../modules/mongo.js');
    yarp.mng = require('../modules/manager.js');
    yarp.GMObject = require('../classes/GMObject.js');
    await yarp.db.connect('mongodb://localhost:27017/yarp');
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'RequirementError: '+err.message+'\n'+err.stack);
  }
};
