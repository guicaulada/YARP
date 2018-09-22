'use strict';
/**
 * Loads the core on client-side.
 */

global.NativeMenu = require('./YARP/lib/NativeMenu.js');
let GMProxy = require('./YARP/classes/GMProxy.js');
global.yarp = new GMProxy('yarp');

yarp.Proxy = GMProxy;
yarp.utils = require('./YARP/modules/utils.js');
yarp.browsers = {};
yarp.cameras = {};
yarp.menus = {};
