'use strict';

let config = {
   'utility': {
      'Event': {
         key: 'KEY_E',
         call: (player,args) => {player.call(args[0], args[1]);}
      },
      'Teleport': {
         key: 'KEY_E',
         call: (player,args) => {player.position = args[0];}
      },
      'ToggleChat': {
         key: 0x12,
         call: (player,args) => {player.call('toggleChat');}
      },
   },
}

module.exports = config;
