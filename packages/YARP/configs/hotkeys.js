'use strict';

let config = {
  'Call': {
    key: 'E',
    category: 'utility',
    call: (player, args) => {
      yarp.client[args[0]](player, ...args[1]);
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
    call: async (player, args) => {
      if (await yarp.client.isKeyPressed(player, 'LSHIFT') || await yarp.client.isKeyPressed(player, 'RSHIFT')) {
        player.character.openEquipment();
      } else {
        player.character.openInventory();
      }
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
  'Close All Menus': {
    key: 'BACK',
    category: 'utility',
    call: (player, args) => {
      yarp.client.closeAllMenus(player);
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
