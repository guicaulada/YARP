var db = require(`./base.js`).db;
var bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

exports.getUserByPlayer = function(player){
  var user = db.users.findOne({socialClub : player.socialClub});
  return user;
};

exports.getUserBySocialClub = function(socialClub){
  var user = db.users.findOne({socialClub : socialClub});
  return user;
};

exports.verifyAuthentication = function(player, password){
  var user = db.users.findOne({socialClub : player.socialClub});
  var lastLogin = {
    ip : player.ip,
    date : utils.getFormattedDate()
  }
  if (user == null) {
    var hash = bcrypt.hashSync(password, 10);
    user = {
      socialClub : player.socialClub,
      password : hash,
      lastLogin : lastLogin,
      whitelisted : false,
      banned : false,
      groups : []
    };
    db.users.save(user);
  } else {
    if(bcrypt.compareSync(password, user.password)){
      db.users.update(user, {lastLogin : lastLogin}, {multi: false, upsert: false});
    } else {
      user = null;
    }
  }
  return user;
};
