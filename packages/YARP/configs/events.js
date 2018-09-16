'use strict';

let config = {
    'exampleEvent': {
        permissions: ['event.example'],
        call: (player, args) => {
            console.log(`Example event called!`);
        },
    },
};

module.exports = config;
