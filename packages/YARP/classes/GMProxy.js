'use strict';
/**
 * Implements a gamemode Proxy.
 * @class yarp.Tunnel
 */
class GMProxy {
  /**
   * Creates an instance of Proxy.
   * @param {String} id Tunnel id.
   * @memberof Tunnel
   */
  constructor(id) {
    if (id) {
      let self = this;
      self.id = id;
      self.local = {};
      self.server = new Proxy({}, {
        get: (proxy, name) => {
          return self.local[name];
        },
        set: (proxy, name, value) => {
          self.local[name] = value;
          mp.events.add(`${self.id}:${name}`, async (player, time, args) => {
            if (!args) args = [];
            player.call(`${self.id}:${name}:${time}`, [JSON.stringify(await value(...JSON.parse(args)))]);
          });
          return value;
        },
      });
      self.client = new Proxy({}, {
        get: (proxy, name) => {
          return (...args) => {
            return new Promise((resolve, reject) => {
              try {
                let time = Math.round((new Date()).getTime());
                args[0].call(`${self.id}:${name}`, [`${time}`, JSON.stringify(args.slice(1, args.length))]);
                mp.events.add(`${self.id}:${name}:${time}`, (player, result) => {
                  mp.events.remove(`${self.id}:${name}:${time}`);
                  resolve(JSON.parse(result));
                });
              } catch (err) {
                console.log(chalk.redBright('[YARP] ') + 'ProxyError: ' + err.message + '\n' + err.stack);
              }
            });
          };
        },
        set: (proxy, name, value) => {
          console.log(chalk.redBright('[YARP] ') + 'ProxyError: You can\'t set client events on server-side.');
        },
      });
    } else {
      throw new TypeError('GMProxy class requires id to be instantiated.');
    }
  }
}

module.exports = GMProxy;
