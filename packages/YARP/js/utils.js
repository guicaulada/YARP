var db = require('./database.js');

exports.FUNCTIONS = {};

exports.FUNCTIONS.getFormattedDate = function(){
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
};

exports.FUNCTIONS.generateRegistration = function(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 8; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  if (db.CHARACTERS.getUserByRegistration() == null){
    return text;
  } else {
    return exports.FUNCTIONS.generateRegistration();
  }
}

exports.FUNCTIONS.round = function(value, decimals){
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
