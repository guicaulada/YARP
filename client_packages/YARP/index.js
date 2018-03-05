global.yarp = {}
yarp.utils = require('./YARP/gamemode/globals/utils.js');
yarp.gui = require('./YARP/gamemode/globals/gui.js');

//Load RAGE.MP Events
require('./YARP/events/ragemp/browser.js');
require('./YARP/events/ragemp/checkpoint.js');
require('./YARP/events/ragemp/colshape.js');
require('./YARP/events/ragemp/player.js');
require('./YARP/events/ragemp/stream.js');
require('./YARP/events/ragemp/vehicle.js');
require('./YARP/events/ragemp/waypoint.js');

//Load YARP Events
require('./YARP/events/yarp/bank.js');
require('./YARP/events/yarp/base.js');
require('./YARP/events/yarp/character.js');
require('./YARP/events/yarp/command.js');
require('./YARP/events/yarp/inventory.js');
require('./YARP/events/yarp/menu.js');
require('./YARP/events/yarp/money.js');
require('./YARP/events/yarp/weapon.js');
