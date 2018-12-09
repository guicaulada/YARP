/**
 * Makes pretty logs.
 * @namespace yarp.log
 */

let log = {};


/**
 * Gets local timestamp in "YYYY-MM-DD HH:MM:SS".
 * @return {String} Timestamp of local time.
 */
log.getTimestamp = () => {
  return new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
};

log.colors = {
  info: 'cyanBright',
  debug: 'magentaBright',
  warning: 'yellowBright',
  error: 'redBright',
  success: 'greenBright',
  command: 'cyan',
};

log.date = false;
log.time = false;
log.type = false;

for (let color in log.colors) {
  if (log.colors.hasOwnProperty(color)) {
    log[color] = (message) => {
      let timestamp = log.getTimestamp();
      let time = timestamp.split(' ')[1];
      let date = timestamp.split(' ')[0];
      let type = color.toUpperCase();
      let tag = chalk[log.colors[color]]('[YARP]');
      if (log.type) {
        tag = chalk[log.colors[color]].dim(`[${type}]`) + tag;
      }
      if (log.time) {
        tag = chalk.gray(`[${time}]`) + tag;
      }
      if (log.date) {
        tag = chalk.gray(`[${date}]`) + tag;
      }
      console.log(`${tag} ${message}`);
      log.log(`[${date}][${time}][${type}][YARP] `+message);
    };
  }
}

/**
 * Appends message to the log file.
 * @param {String} message The message to be appended.
 */
log.log = (message) => {
  fs.appendFile('./yarp.log', message.concat('\n'), (error) => {
    if (error) {
      log.error('Failed to write to log file.', error);
    }
  });
};

module.exports = log;
