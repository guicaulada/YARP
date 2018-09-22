'use strict';
/**
 * Browser events
 * @memberof ragemp.client
 */

/**
 * Browser domain ready.
 * @event browserDomReady
 * @memberof ragemp.client
 * @param {Object} browser The browser object.
 */
mp.events.add('browserDomReady', (browser) => {
  for (let id in yarp.browsers) {
    if (yarp.browsers[id] === browser) {
      mp.gui.chat.activate(false);
      mp.gui.chat.show(false);
      mp.gui.cursor.visible = true;
      if (yarp.browsers[id].parameters.length > 0) {
        yarp.client.browserExecute(id, yarp.browsers[id].parameters);
      }
    }
  }
});

/**
 * Browser window created.
 * @event browserCreated
 * @memberof ragemp.client
 * @param {Object} browser The browser object.
 */
mp.events.add('browserCreated', (browser) => {
});

/**
 * Browser window failed to load.
 * @event browserLoadingFailed
 * @memberof ragemp.client
 * @param {Object} browser The browser object.
 */
mp.events.add('browserLoadingFailed', (browser) => {
});
