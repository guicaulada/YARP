'use strict';

let config = {
  'Event': {
    key: 'E',
    category: 'utility',
    call: (player, args) => {
      player.call(args[0], args[1]);
    },
  },
  'Teleport': {
    key: 'E',
    category: 'utility',
    call: (player, args) => {
      player.position = args[0];
    },
  },
  'ToggleChat': {
    key: 'ALT',
    category: 'utility',
    call: (player, args) => {
      player.call('toggleChat');
    },
  },
  'Inventory': {
    key: 'I',
    category: 'utility',
    call: (player, args) => {
      if (!this.players) this.players = [];
      let i = this.players.indexOf(player.socialClub);
      if (i >= 0) {
        player.call('destroyBrowser', ['inventory']);
        this.players.splice(i, 1);
      } else {
        yarp.commands['inventory'].call(player);
        this.players.push(player.socialClub);
      }
    },
  },
};

module.exports = config;
