var db = require(`./base.js`).db;
var bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
var utils = require('../exports/utils.js');
var cfg = require('../exports/config.js');

exports.getUserByPlayer = function(player){
  var user = db.users.findOne({social_club : player.socialClub});
  return user;
};

exports.getUserBySocialClub = function(socialClub){
  var user = db.users.findOne({social_club : socialClub});
  return user;
};

exports.verifyAuthentication = function(player, password){
  var user = db.users.findOne({social_club : player.socialClub});
  var last_login = {
    ip : player.ip,
    date : utils.getFormattedDate()
  }
  if (user == null) {
    var hash = bcrypt.hashSync(password, 10);
    user = {
      social_club : player.socialClub,
      password : hash,
      last_login : last_login,
      whitelisted : false,
      banned : false,
      groups : []
    };
    db.users.save(user);
  } else {
    if(bcrypt.compareSync(password, user.password)){
      db.users.update(user, {last_login : last_login}, {multi: false, upsert: false});
    } else {
      user = null;
    }
  }
  return user;
};
