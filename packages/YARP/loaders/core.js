'use strict';
/**
 * Loads the core on server-side.
 */

module.exports = async () => {
  // Loading core.

  /** @global */
  global.rl = require('readline');
  /** @global */
  global.chalk = require('chalk');
  /** @global */
  global.bcrypt = require('bcryptjs');
  console.log(chalk.yellowBright('[YARP] ')+'Loading Core');
  try {
    /** @namespace ragemp */
    /** @namespace yarp */
    let GMProxy = require('../classes/GMProxy.js');
    global.yarp = new GMProxy('yarp');
    yarp.Proxy = GMProxy;

    /** @namespace yarp.utils */
    yarp.utils = require('../modules/utils.js');
    yarp.cli = require('../modules/cli.js');
    yarp.db = require('../modules/mongo.js');
    yarp.mng = require('../modules/manager.js');
    yarp.Object = require('../classes/GMObject.js');
    yarp.Pool = require('../classes/Pool.js');
    yarp.Variable = require('../classes/Variable.js');
    yarp.variables = new yarp.Pool(yarp.Variable);
    yarp.variables.config('../configs/variables.js');
    await yarp.db.connect(yarp.variables['Database'].value);
  } catch (err) {
    console.log(chalk.redBright('[YARP] ')+'CoreError: '+err.message+'\n'+err.stack);
  }
};
