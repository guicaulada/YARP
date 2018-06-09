'use strict';

let config = {
  'Sighmir Greenroom': {
    groups: ['Cop'],
    enter: (player) => {
      player.notify('~y~You should eat something.');
    },
  },
};

module.exports = config;
