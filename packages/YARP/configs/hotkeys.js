'use strict';

let config = {
  'utility': {
     'Event': {
       key: 'E',
       call: (player, args) => {
         player.call(args[0], args[1]);
       },
     },
     'Teleport': {
       key: 'E',
       call: (player, args) => {
         player.position = args[0];
       },
     },
     'ToggleChat': {
       key: 'ALT',
       call: (player, args) => {
         player.call('toggleChat');
       },
     },
     'Inventory': {
       key: 'I',
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
  },
};

module.exports = config;
