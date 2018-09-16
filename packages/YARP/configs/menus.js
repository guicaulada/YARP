'use strict';

let config = {
  'Test Menu': {
    offset: [50, 50],
    items: [
      {
        text: 'Default',
        description: 'Default test item.',
      },
      {
        type: 1,
        text: 'List',
        items: ['One', 'Two', 'Three'],
        description: 'List test item.',
      },
      {
        type: 2,
        text: 'Slider',
        items: ['One', 'Two', 'Three'],
        description: 'Slider test item.',
      },
      {
        type: 3,
        text: 'Checkbox',
        description: 'Checkbox test item.',
      },
    ],
  },
};

module.exports = config;
