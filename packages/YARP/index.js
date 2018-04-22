'use strict';
/**
 * @file Loads the gamemode on server-side.
 * @author Guilherme Caulada (Sighmir)
 * @copyright Copyright (C) 2018  Sighmir
 * @namespace server
 */

/**
 * @namespace yarp
 */
global.yarp = {};
global.chalk = require('chalk');

/**
 * Loads the gamemode asynchronously.
 * @async
 * @function
 */
(async () => {
  // Loading requirements
  await require('./loaders/requirements.js')();

  // Loading classes
  await require('./loaders/classes.js')();

  // Loading pools
  await require('./loaders/pools.js')();

  // Loading data
  await require('./loaders/data.js')();

  // Loading configs
  await require('./loaders/configs.js')();

  // Loading events
  await require('./loaders/events.js')();

  // Loading complete
  console.log(chalk.greenBright('[YARP] ')+'Loading Complete');

  // Rejoin players
  mp.players.forEach((player, i) => {
    mp.events.call('playerJoin', player)
  });
})();

const exit = async () => {
  console.log(chalk.redBright('[YARP] ')+'Closing Connection. Bye-bye.');
  await mp.players.broadcast(`!{red}The server is closing. Rejoin with F1.`);
  for (let player of mp.players.toArray()) {
    player.kick('The server is closing.');
    console.log(`${player.name}(${player.socialClub}/${player.ip}) quit. Reason: The server is closing. (kicked)`)
  }
  process.exit();
}

process.on('SIGHUP', exit);
process.on('SIGKILL', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);
process.on('SIGINT', exit);
