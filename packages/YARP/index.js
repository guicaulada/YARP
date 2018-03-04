'use strict';

global.yarp = {
    cfg: require('./gamemode/globals/Config.js'),
    utils: require('./gamemode/globals/Utility.js'),
    cmd: require('./gamemode/managers/CommandManager.js'),
    db: require('./gamemode/globals/MongoDB.js');
};

require('./modules/base.js');
require('./modules/characters.js');
require('./modules/menus.js');
require('./modules/inventory.js');
require('./modules/items.js');
require('./modules/banks.js');
require('./modules/objects.js');
require('./commands/admins.js');
require('./commands/groups.js');
require('./commands/users.js');
