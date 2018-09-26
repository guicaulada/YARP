'use strict';
/**
 * Loads the gamemode on server-side.
 * @author Guilherme Caulada (Sighmir)
 * @copyright Copyright (C) 2018  Sighmir
 */

/**
 * Loads the gamemode.
 */
(async () => {
  // Loading requirements
  await require('./loaders/core.js')();

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

  // Loading features
  await require('./loaders/features.js')();

  // Loading complete
  yarp.log.success('Loading Complete');

  // Rejoin players
  mp.players.forEach((player, i) => {
    mp.events.call('playerJoin', player);
  });
})();

/**
 * Tries to kick all players for safe exit.
 * @ignore
 */
const exit = async () => {
  yarp.log.danger('Closing Connection. Bye-bye.');
  await mp.players.broadcast(`!{red}The server is closing. Rejoin with F1.`);
  for (let player of mp.players.toArray()) {
    player.kick('The server is closing.');
    yarp.log.info(`${player.name}(${player.socialClub}/${player.ip}) quit.`+'Reason: The server is closing. (kicked)');
  }
  process.exit();
};

/**
 * Redirects process exiting to custom exit function.
 */
process.on('SIGHUP', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);
process.on('SIGINT', exit);
if (process.platform === 'win32') {
  process.on('SIGKILL', exit);
}
