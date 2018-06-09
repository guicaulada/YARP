'use strict';
/**
 * Loads the requirements on server-side asynchronously.
 */

module.exports = async () => {
  // Loading requirements
  console.log(chalk.yellowBright('[YARP] ')+'Loading Requirements');
  try {
    yarp.utils = require('../modules/utils.js');
    yarp.db = require('../modules/mongo.js');
    yarp.mng = require('../modules/manager.js');
    yarp.GMObject = require('../classes/GMObject.js');
    yarp.Pool = require('../classes/Pool.js');
    await yarp.db.connect('mongodb://localhost:27017/yarp');
  } catch (err) {
    console.log(chalk.redBright('[YARP] ')+'RequirementError: '+
                err.message+'\n'+err.stack);
  }

  // This config defines default values for the gamemode
  console.log(chalk.yellowBright('[YARP] ') + 'Loading Variables');
  try {
    yarp.Variable = require('../classes/Variable.js');
    yarp.variables = new yarp.Pool(yarp.Variable);
    yarp.variables.config('../configs/variables.js');
  } catch (err) {
    console.log(chalk.redBright('[YARP] ') + 'VariableError: '+err.message + '\n' + err.stack);
  }
};
