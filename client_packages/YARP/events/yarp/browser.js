'use strict';
/**
 * Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/globals/browser.js
 * Browser events
 * @memberof yarp.client
 */

/**
 * Creates a browser window.
 * @function createBrowser
 * @memberof yarp.client
 * @param {Object} id The browser id.
 * @param {Object} params Function and arguments to execute.
 * @param {Boolean} disableHotkeys If browser window disables hotkeys.
 * @param {Boolean} forceArrow  If browser window force mouse arrow to be active.
 */
yarp.client.createBrowser = (id, params, disableHotkeys, forceArrow) => {
  if (yarp.browsers[id] != null) {
    yarp.client.destroyBrowser(id);
  }
  yarp.browsers[id] = mp.browsers.new(params[0]);
  yarp.browsers[id].parameters = params.slice(1, params.length);
  yarp.browsers[id].disableHotkeys = disableHotkeys;
  yarp.browsers[id].forceArrow = forceArrow;
};

/**
 * Execute on browser window.
 * @function browserLoadingFailed
 * @memberof yarp.client
 * @param {Object} id The browser id.
 * @param {Object} params Function and arguments to execute.
 */
yarp.client.browserExecute = (id, params) => {
  let input = '';
  for (let i = 1; i < params.length; i++) {
    if (input.length > 0) {
      input += ', `' + params[i] + '`';
    } else {
      input = '`' + params[i] + '`';
    }
  }
  yarp.browsers[id].execute(`${params[0]}(${input});`);
};

/**
 * Destroys a browser window.
 * @function createBrowser
 * @memberof yarp.client
 * @param {Object} id The browser id.
 */
yarp.client.destroyBrowser = (id) => {
  if (yarp.browsers[id] != null) {
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    yarp.browsers[id].destroy();
    delete yarp.browsers[id];
  }
};

/**
 * Toggle chat.
 * @function toggleChat
 * @memberof yarp.client
 */
yarp.client.toggleChat = () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
  mp.gui.chat.activate(!mp.gui.cursor.visible);
  mp.gui.chat.show(!mp.gui.cursor.visible);
};

/**
 * Toggle chat.
 * @function yarp:cefTrigger
 * @memberof yarp.client
 * @param {String} func Function name.
 * @param {Array} args Function arguments.
 */
mp.events.add('yarp:cefTrigger', (func, ...args) => {
  yarp.client[func](...args);
});
