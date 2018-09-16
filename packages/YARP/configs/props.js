'use strict';

let config = {};

let testPositions = [
  new mp.Vector3(-415.777, 1168.791, 328.854),
];

testPositions.forEach((position, i) => {
  config['Test Sign '+i] = {
    model: 'stt_prop_corner_sign_05',
    position: position,
  };
});

module.exports = config;
