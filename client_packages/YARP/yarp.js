global.yarp = {}
yarp.utils = require('./YARP/gamemode/static/Utility.js');

//Load RAGE.MP Events
require('./YARP/event/ragemp/Browser.js');
require('./YARP/event/ragemp/Checkpoint.js');
require('./YARP/event/ragemp/Colshape.js');
require('./YARP/event/ragemp/Player.js');
require('./YARP/event/ragemp/Stream.js');
require('./YARP/event/ragemp/Vehicle.js');
require('./YARP/event/ragemp/Waypoint.js');

//Load YARP Events
require('./YARP/event/yarp/Bank.js');
require('./YARP/event/yarp/Character.js');
require('./YARP/event/yarp/Command.js');
require('./YARP/event/yarp/Gamemode.js');
require('./YARP/event/yarp/Inventory.js');
require('./YARP/event/yarp/Menu.js');
require('./YARP/event/yarp/Weapon.js');
