'use strict';

let config = {
  'Super Admin': {
    inherits: ['Admin'],
    permissions: [
      'cmd.code',
      'cmd.edit',
      'cmd.new',
      'cmd.rem',
      'cmd.givegroup',
      'cmd.takegroup',
    ],
    enter: (player) => {
      player.notify('You are superadmin.');
    },
    // leave: (player) => {console.log('A superadmin left.');}
  },
  'Admin': {
    permissions: [
      'cmd.kill',
      'cmd.givemoney',
      'cmd.hp',
      'cmd.armour',
      'cmd.weapon',
      'cmd.veh',
      'cmd.charpos',
      'cmd.camdir',
      'cmd.noclip',
      'cmd.tp',
      'cmd.gmtp',
      'menu.testmenu',
    ],
  },
  'User': {
    permissions: [
      'cmd.inventory',
      'cmd.money',
      'cmd.hint',
    ],
  },
  'Cop': {
    type: 'job',
    enter: (player) => {
      player.notify('You are a cop.');
    },
    permissions: [
      'cmd.radio',
    ],
  },
};

module.exports = config;
