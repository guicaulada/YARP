'use strict';

let config = {
  'Sighmir': {
    groups: ['Super Admin', 'Admin', 'User'],
    enter: (player) => {player.notify('~b~You should drink more water.');}
  }
}

module.exports = config;
