'use strict';

global.yarp = {};

//Utilities and Database Setup
yarp.utils = require('./gamemode/globals/Utility');
yarp.db = require('./gamemode/globals/MongoDB');

//Objects
yarp.User = require('./gamemode/objects/User');
yarp.Transaction = require('./gamemode/objects/Transaction');
yarp.Text = require('./gamemode/objects/Text');
yarp.Npc = require('./gamemode/objects/Npc');
yarp.Marker = require('./gamemode/objects/Marker');
yarp.Item = require('./gamemode/objects/Item');
yarp.Group = require('./gamemode/objects/Group');
yarp.Config = require('./gamemode/objects/Config');
yarp.Character = require('./gamemode/objects/Character');
yarp.Blip = require('./gamemode/objects/Blip');

//Managers
yarp.UserManager = require('./gamemode/managers/UserManager');
yarp.TransactionManager = require('./gamemode/managers/TransactionManager');
yarp.TextManager = require('./gamemode/managers/TextManager');
yarp.NpcManager = require('./gamemode/managers/NpcManager');
yarp.MarkerManager = require('./gamemode/managers/MarkerManager');
yarp.ItemManager = require('./gamemode/managers/ItemManager');
yarp.GroupManager = require('./gamemode/managers/GroupManager');
yarp.ConfigManager = require('./gamemode/managers/ConfigManager');
yarp.CharacterManager = require('./gamemode/managers/CharacterManager');
yarp.BlipManager = require('./gamemode/managers/BlipManager');

//yarp.cmd = require('./gamemode/managers/CommandManager.js'),
yarp.ConfigManager.indexById().then(cfg => {
  yarp.cfg = cfg;
  require('./events/base.js');
  require('./events/characters.js');
  require('./events/menus.js');
  require('./events/inventory.js');
  require('./events/items.js');
  require('./events/banks.js');
  require('./events/objects.js');
  //require('./commands/admins.js');
  //require('./commands/groups.js');
  //require('./commands/users.js');
});
