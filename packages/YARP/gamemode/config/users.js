'use strict';
/**
 * @file User config
 */

module.exports = {
  'Sighmir': {
    groups: ['Super Admin', 'Admin', 'User'],
    enter: (player) => {player.notify('~b~You should drink more water.');}
  }
}
