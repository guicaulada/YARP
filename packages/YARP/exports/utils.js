var db = require('./database.js');
var cfg = require('./config.js');

exports.getPlayerUserCharacter = function(data){
  let user = null;
  let character = null;
  let player = null;
  if ((typeof data) === 'string') {
    let names = data.split(' ');
    if (names.length == 2) {
      character = db.characters.getCharacterByName(data);
    } else {
      user = db.users.getUserBySocialClub(data);
    }
    if (user != null){
      mp.players.forEach((p, id) => {
        if (p.socialClub == user.social_club){
          player = p;
        }
      });
    } else if (character != null){
      mp.players.forEach((p, id) => {
        if (p.socialClub == character.social_club){
          player = p;
        }
      });
    }
  } else {
    player = data;
    user = db.users.getUserByPlayer(data);
    character = db.characters.getCharacterByPlayer(data);
  }
  return {user: user, character: character, player: player};
}

exports.getFormattedDate = function(){
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

exports.generateRegistration = function(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 8; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  if (db.characters.getUserByRegistration() == null){
    return text;
  } else {
    return exports.generateRegistration();
  }
}

exports.round = function(value, decimals){
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
