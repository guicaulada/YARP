global.yarp = {}
yarp.utils = require('./YARP/gamemode/static/Utility.js');
yarp.gui = require('./YARP/gamemode/static/gui.js');

//Load RAGE.MP Events
require('./YARP/event/ragemp/browser.js');
require('./YARP/event/ragemp/checkpoint.js');
require('./YARP/event/ragemp/colshape.js');
require('./YARP/event/ragemp/player.js');
require('./YARP/event/ragemp/stream.js');
require('./YARP/event/ragemp/vehicle.js');
require('./YARP/event/ragemp/waypoint.js');

//Load YARP Events
require('./YARP/event/yarp/bank.js');
require('./YARP/event/yarp/base.js');
require('./YARP/event/yarp/character.js');
require('./YARP/event/yarp/command.js');
require('./YARP/event/yarp/inventory.js');
require('./YARP/event/yarp/menu.js');
require('./YARP/event/yarp/weapon.js');
