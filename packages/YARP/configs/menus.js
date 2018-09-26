'use strict';

let config = {
  'Test Menu': {
    offset: [0.1, 0.1],
    items: [
      {
        displayText: 'Default',
        caption: 'Default test item.',
      },
      {
        type: 'list',
        displayText: 'List',
        items: [
          {
            displayText: 'One',
          },
          {
            displayText: 'Two',
          },
          {
            displayText: 'Three',
          },
        ],
        caption: 'List test item.',
      },
      {
        type: 'slider',
        displayText: 'Slider',
        min: -10,
        max: 10,
        step: 1,
        caption: 'Slider test item.',
      },
      {
        type: 'checkbox',
        displayText: 'Checkbox',
        toggled: true,
        caption: 'Checkbox test item.',
      },
      {
        type: 'close',
        displayText: 'Close',
      },
    ],
  },
};

module.exports = config;
