'use strict';
/**
 * Loads features on server-side.
 */

module.exports = async () => {
  // Loading features (a more complex set of events and functions working together)
  yarp.log.warning('Loading Features');
  try {
    // Load stores
    require('../features/stores/index.js');
  } catch (err) {
    yarp.log.danger('FeatureError: '+err.message+'\n'+err.stack);
  }
};
