'use strict';

let config = {
  ban: (args) => {
    mp.players.forEach((player) => {
      if (player.name.toLowerCase() == args[1].toLowerCase()) {
        player.ban('Console');
        return ' Player ' + player.name + ' was banned!!!';
      }
    });
  },
  kick: (args) => {
    mp.players.forEach((player) => {
      if (player.name.toLowerCase() == args[1].toLowerCase()) {
        player.kick('Console');
        return ' Player ' + player.name + ' was kicked!!!';
      }
    });
  },
  tppos: (args) => {
    if (args.length > 4) {
      mp.players.forEach((player) => {
        if (player.name.toLowerCase() == args[1].toLowerCase()) {
          player.position = new mp.Vector3(parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[4]));
          return ' Player ' + player.name + ' was teleported to X:' + parseFloat(args[2]) + ' Y:' + parseFloat(args[3]) + ' Z:' + parseFloat(args[4]) + '!!!';
        }
      });
    } else {
      return ' Invalid arguments!!!';
    }
  },
  weapon: (args) => {
      if (args.length > 3) {
          mp.players.forEach((player) => {
              if (player.name.toLowerCase() == args[1].toLowerCase()) {
                  player.giveWeapon(mp.joaat(args[2]), parseInt(args[3]));
                  return ' Player ' + player.name + ' received weapons!!!';
              }
          });
      } else {
          return ' Invalid arguments!!!';
      }
  },
  status: (args) => {
      return '\n Players: ' + mp.players.length + '/' + mp.players.size + '\n Vehicles: ' + mp.vehicles.length + '\n Objects: ' + mp.objects.length +
             '\n Wheather: ' + mp.environment.weather + '\n Game Time: ' + mp.environment.time.hour + 'h\n Uptime: ' + process.uptime() + '\n';
  },
  online: (args) => {
      let res = '\n Online: ' + mp.players.length + '/' + mp.players.size + '\n ';
      mp.players.forEach((player) => {
          res += player.name + ' | ' + player.ip + ' | ' + player.ping + '\n ';
      });
      return res;
  },
  yarp: (args) => {
    if (args.length > 2) {
      return JSON.stringify(yarp[args[1]][args.slice(2, args.length).join(' ')]);
    } else {
      return ' Invalid arguments!!!';
    }
  },
};

module.exports = config;
