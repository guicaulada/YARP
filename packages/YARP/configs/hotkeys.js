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
      yarp.client.toggleChat(player);
    },
  },
  'Inventory': {
    key: 'I',
    category: 'utility',
    call: (player, args) => {
      player.character.toggleInventory();
    },
  },
  'Toggle Menu': {
    key: 'M',
    category: 'utility',
    call: (player, args) => {
      yarp.client.toggleMenu(player, args[0]);
    },
  },
  'Open Menu': {
    key: 'E',
    category: 'utility',
    call: (player, args) => {
      args[0].open(player);
    },
  },
  'Test Proxy': {
    key: 'B',
    category: 'testing',
    call: async (player, args) => {
      console.log('Final Message:'+await yarp.client.testProxy(player, 'server'));
    },
  },
};

module.exports = config;
