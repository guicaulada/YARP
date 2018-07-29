const rl = require('readline');

let cli = {};

cli.commands = {};

cli.io = rl.createInterface({
    input: process.stdin,
    outpur: process.stdout,
});

cli.config = (obj) => {
  if (typeof obj === 'string') obj = require(obj);
  cli.commands = obj;
};

cli.io.on('line', (s) => {
  if (s[0] == '/') {
    let res = '';
    let args = s.split(/ /g);
    let cmd = args[0].toLowerCase().slice(1, args[0].length);
    if (cli.commands[cmd]) {
      res = cli.commands[cmd](args);
    } else {
      res = ' Unknown command!!!';
    }
    console.log(res);
  }
});

module.exports = cli;
