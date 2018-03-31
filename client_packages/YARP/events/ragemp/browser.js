'use strict';
/**
* @file Browser events
*/
//Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/globals/browser.js
var browsers = {};
var parameters = {};

mp.events.add('createBrowser', (id,arguments) => {
	if(browsers[id] != null) {
		mp.events.call('destroyBrowser', id);
	}
	parameters[id] = arguments.slice(1, arguments.length);
	browsers[id] = mp.browsers.new(arguments[0]);
});

mp.events.add('browserDomReady', (browser) => {
	for (id in browsers){
		if(browsers[id] === browser) {
			mp.gui.chat.activate(false);
			mp.gui.chat.show(false);
			mp.gui.cursor.visible = true;
			if(parameters[id].length > 0) {
				mp.events.call('browserExecute', id, parameters[id]);
			}
		}
	}
});

mp.events.add('browserCreated', (browser) => {
});

mp.events.add('browserLoadingFailed', (browser) => {
});

mp.events.add('browserExecute', (id, arguments) => {
	var input = '';
	for(var i = 1; i < arguments.length; i++) {
		if(input.length > 0) {
			input += ', `' + arguments[i] + '`';
		} else {
			input = '`' + arguments[i] + '`';
		}
	}
	browsers[id].execute(`${arguments[0]}(${input});`);
});

mp.events.add('destroyBrowser', (id, arguments) => {
	if(browsers[id] != null){
		mp.gui.cursor.visible = false;
		mp.gui.chat.activate(true);
		mp.gui.chat.show(true);
		browsers[id].destroy();
		browsers[id] = null;
		if(arguments != null){
			var cb = arguments[0];
			arguments = arguments.slice(1 , arguments.length);
			mp.events.call(cb, arguments);
		}
	}
});

mp.events.add('toggleChat', () => {
	mp.gui.cursor.visible = !mp.gui.cursor.visible;
	mp.gui.chat.activate(!mp.gui.cursor.visible);
	mp.gui.chat.show(!mp.gui.cursor.visible);
});
