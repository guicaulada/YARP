'use strict';
/**
 * Implements a gamemode Proxy.
 */
class GMProxy {
  /**
   * Creates an instance of Proxy.
   * @param {String} id Tunnel id.
   * @memberof GMProxy
   */
  constructor(id) {
    if (id) {
      let self = this;
      self.id = id;
      self.local = {};
      self.tryJSON = {
        parse: (string) => {
          let result;
          if (string) {
            try {
              result = JSON.parse(string);
            } catch (err) {
              result = string;
              console.log(chalk.redBright('[YARP] ') + 'ProxyError: ' + err.message + '\n' + err.stack);
            }
          }
          return result;
        },
        stringify: (obj) => {
          let result;
          if (obj) {
            try {
              result = JSON.stringify(obj);
            } catch (err) {
              result = obj;
              console.log(chalk.redBright('[YARP] ') + 'ProxyError: ' + err.message + '\n' + err.stack);
            }
          }
          return result;
        },
      };
      self.server = new Proxy({}, {
        get: (proxy, name) => {
          if (name == 'add') return self.add;
          return self.local[name];
        },
        set: (proxy, name, value) => {
          if (name == 'add') return self.add;
          self.local[name] = value;
          mp.events.add(`${self.id}:${name}`, async (player, id, args) => {
            if (yarp.variables.Debug.value) console.log(chalk.magentaBright('[YARP] ') + `<== ${self.id}:${name}`);
            if (!args) args = [];
            if (yarp.variables.Debug.value) console.log(chalk.magentaBright('[YARP] ') + `${self.id}:${name}:${id} ==>`);
            player.call(`${self.id}:${name}:${id}`, [this.tryJSON.stringify(await value(player, ...this.tryJSON.parse(args)))]);
          });
          return value;
        },
      });
      self.client = new Proxy({}, {
        get: (proxy, name) => {
          return (...args) => {
            return new Promise((resolve, reject) => {
              try {
                let id = Math.round((new Date()).getTime());
                if (yarp.variables.Debug.value) console.log(chalk.magentaBright('[YARP] ') + `${self.id}:${name}  ==>`);
                args[0].call(`${self.id}:${name}`, [`${id}`, this.tryJSON.stringify(args.slice(1, args.length))]);
                mp.events.add(`${self.id}:${name}:${id}`, (player, result) => {
                  if (yarp.variables.Debug.value) console.log(chalk.magentaBright('[YARP] ') + `<== ${self.id}:${name}:${id}`);
                  mp.events.remove(`${self.id}:${name}:${id}`);
                  resolve(this.tryJSON.parse(result));
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
      self.add = new Proxy({}, {
        get: (proxy, name) => {
          return self.local[name];
        },
        set: (proxy, name, value) => {
          mp.events.add(`${self.id}:${name}`, async (player, id, args) => {
            if (yarp.variables.Debug.value) console.log(chalk.magentaBright('[YARP] ') + `<== ${self.id}:${name}`);
            if (!args) args = [];
            if (yarp.variables.Debug.value) console.log(chalk.magentaBright('[YARP] ') + `${self.id}:${name}:${id} ==>`);
            player.call(`${self.id}:${name}:${id}`, [this.tryJSON.stringify(await value(player, ...this.tryJSON.parse(args)))]);
          });
          return value;
        },
      });
    } else {
      throw new TypeError('GMProxy class requires id to be instantiated.');
    }
  }
}

module.exports = GMProxy;
