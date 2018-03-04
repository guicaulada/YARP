'use strict';

global.yarp = {};
yarp.db = require('./gamemode/globals/MongoDB');

//mp.events.add('YARP:MongoReady', () => {
  let User = require('./gamemode/objects/User');
  let Transaction = require('./gamemode/objects/Transaction');
  let Text = require('./gamemode/objects/Text');
  let Npc = require('./gamemode/objects/Npc');
  let Marker = require('./gamemode/objects/Marker');
  let Item = require('./gamemode/objects/Item');
  let Group = require('./gamemode/objects/Group');
  let Config = require('./gamemode/objects/Config');
  let Character = require('./gamemode/objects/Character');
  let Blip = require('./gamemode/objects/Blip');

  let UserManager = require('./gamemode/managers/UserManager');
  let TransactionManager = require('./gamemode/managers/TransactionManager');
  let TextManager = require('./gamemode/managers/TextManager');
  let NpcManager = require('./gamemode/managers/NpcManager');
  let MarkerManager = require('./gamemode/managers/MarkerManager');
  let ItemManager = require('./gamemode/managers/ItemManager');
  let GroupManager = require('./gamemode/managers/GroupManager');
  let ConfigManager = require('./gamemode/managers/ConfigManager');
  let CharacterManager = require('./gamemode/managers/CharacterManager');
  let BlipManager = require('./gamemode/managers/BlipManager');

  yarp.utils = require('./gamemode/globals/Utility');
  //yarp.cmd = require('./gamemode/managers/CommandManager.js'),
  yarp.cfg = ConfigManager.indexById();
  /*
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
  */
  console.log("hey");
//});
