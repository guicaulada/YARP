var db = require('diskdb');
db.connect('./packages/YARP/_db');
db.loadCollections(['users','groups']);

function getFormattedDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  var today = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
  return today;
}

module.exports = {
  db : db,
  //User Database Interaction
  getUser : function(player){
    var user = db.users.findOne({identifier : player.socialClub});
    return user
  },
  loginUser : function(player){
    var user = db.users.findOne({identifier : player.socialClub});
    var last_login = {
      ip : player.ip,
      date : getFormattedDate()
    }
    if (user == null) {
      user = {
          id : db.users.count()+1,
          last_login : last_login,
          whitelisted : false,
          banned : false,
          identifier : player.socialClub,
          groups : ["user"],
          characters : []
      };
      db.users.save(user);
    } else {
      db.users.update(user, {last_login : last_login}, {multi: false, upsert: true});
    }
    return user;
  },
};
