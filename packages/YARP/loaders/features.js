'use strict';
/**
 * Loads features on server-side asynchronously.
 */

module.exports = async () => {
  // Loading features (a more complex set of events and functions working together)
  console.log(chalk.yellowBright('[YARP] ')+'Loading Features');
  try {
    // Load stores
    require('../features/stores/common.js');
  } catch (err) {
    console.log(chalk.redBright('[YARP] ')+'FeatureError: '+err.message+'\n'+err.stack);
  }
};
