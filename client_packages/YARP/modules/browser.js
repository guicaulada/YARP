//Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/globals/browser.js
var customBrowser = null;
var parameters = [];

mp.events.add('createBrowser', (arguments) => {
	if(customBrowser != null) {
		mp.events.call('destroyBrowser');
	}
	parameters = arguments.slice(1, arguments.length);
	customBrowser = mp.browsers.new(arguments[0]);
});

mp.events.add('browserDomReady', (browser) => {
	if(customBrowser === browser) {
		mp.gui.cursor.visible = true;
		mp.gui.chat.activate(false);
		if(parameters.length > 0) {
			mp.events.call('executeFunction', parameters);
		}
	}
});

mp.events.add('executeFunction', (arguments) => {
	var input = '';
	for(var i = 1; i < arguments.length; i++) {
		if(input.length > 0) {
			input += ', \'' + arguments[i] + '\'';
		} else {
			input = '\'' + arguments[i] + '\'';
		}
	}
	customBrowser.execute(`${arguments[0]}(${input});`);
});

mp.events.add('destroyBrowser', (args) => {
	if(customBrowser != null){
		mp.gui.cursor.visible = false;
		mp.gui.chat.activate(true);
		customBrowser.destroy();
		customBrowser = null;
		if(args != null){
			var cbr = args[0];
			args = args.slice(1 , args.length);
			mp.events.call(cbr, args);
		}
	}
});
