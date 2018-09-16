'use strict';

let config = {};

let blistaPositions = [
    new mp.Vector3(-425.517, 1123.620, 325.8544),
    new mp.Vector3(-432.534, 1157.461, 325.854),
    new mp.Vector3(-401.850, 1149.482, 325.854),
    new mp.Vector3(-415.777, 1168.791, 325.854),
];

blistaPositions.forEach((position, i) => {
  config['Spawn Blista ' + i] = {
    model: 'blista',
    position: position,
  };
});

module.exports = config;
