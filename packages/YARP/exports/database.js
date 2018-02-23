var diskdb = require('diskdb'); // https://www.npmjs.com/package/diskdb

diskdb.connect('./packages/YARP/_db');
diskdb.loadCollections(['users','groups','characters','atms']);

exports.diskdb = diskdb;
exports.users = require('../database/users.js');
exports.characters = require('../database/characters.js');
exports.groups = require('../database/groups.js');
