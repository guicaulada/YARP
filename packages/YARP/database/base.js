var db = require('diskdb'); // https://www.npmjs.com/package/diskdb

db.connect('./packages/YARP/_db');
db.loadCollections(['users','groups','characters','atms']);

exports.db = db;
