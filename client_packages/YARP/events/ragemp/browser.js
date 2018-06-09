'use strict';
/**
* @file Browser events
* @namespace client.browser
*/

// Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/globals/browser.js

let browsers = {};
let parameters = {};

/**
* Creates a browser window.
* @event createBrowser
* @memberof client.browser
* @param {object} id - The browser id.
* @param {object} params - Function and arguments to execute.
* @fires destroyBrowser
*/
mp.events.add('createBrowser', (id, params) => {
  if (browsers[id] != null) {
    mp.events.call('destroyBrowser', id);
  }
  parameters[id] = params.slice(1, params.length);
  browsers[id] = mp.browsers.new(params[0]);
});

/**
* Browser domain ready.
* @event browserDomReady
* @memberof client.browser
* @param {object} browser - The browser object.
* @fires browserExecute
*/
mp.events.add('browserDomReady', (browser) => {
  for (id in browsers) {
    if (browsers[id] === browser) {
      mp.gui.chat.activate(false);
      mp.gui.chat.show(false);
      mp.gui.cursor.visible = true;
      if (parameters[id].length > 0) {
        mp.events.call('browserExecute', id, parameters[id]);
      }
    }
  }
});

/**
* Browser window created.
* @event browserCreated
* @memberof client.browser
* @param {object} browser - The browser object.
*/
mp.events.add('browserCreated', (browser) => {
});

/**
* Browser window failed to load.
* @event browserLoadingFailed
* @memberof client.browser
* @param {object} browser - The browser object.
*/
mp.events.add('browserLoadingFailed', (browser) => {
});

/**
* Execute on browser window.
* @event browserLoadingFailed
* @memberof client.browser
* @param {object} id - The browser id.
* @param {object} params - Function and arguments to execute.
*/
mp.events.add('browserExecute', (id, params) => {
  let input = '';
  for (let i = 1; i < params.length; i++) {
    if (input.length > 0) {
      input += ', `' + params[i] + '`';
    } else {
      input = '`' + params[i] + '`';
    }
  }
  browsers[id].execute(`${params[0]}(${input});`);
});

/**
* Destroys a browser window.
* @event createBrowser
* @memberof client.browser
* @param {object} id - The browser id.
*/
mp.events.add('destroyBrowser', (id) => {
  if (browsers[id] != null) {
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    browsers[id].destroy();
    browsers[id] = null;
  }
});

/**
* Toggle chat.
* @event toggleChat
* @memberof client.browser
*/
mp.events.add('toggleChat', () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
  mp.gui.chat.activate(!mp.gui.cursor.visible);
  mp.gui.chat.show(!mp.gui.cursor.visible);
});
