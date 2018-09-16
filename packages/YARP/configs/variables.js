'use strict';

let config = {};

let values = {
  'Whitelisted': false,
  'Starting Wallet': 100,
  'Starting Bank': 1500,
  'Ticks/Second': 2,
  'Save Interval': 20, // Intervals are always in ticks.
  'Hunger Interval': 25,
  'Hunger Rate': 1,
  'Thirst Interval': 20,
  'Thirst Rate': 1,
  'XP Interval': 600 * 2,
  'XP Rate': 10,
  'Max Weight': 30,
  'First Spawn': new mp.Vector3(-888.8746, -2313.2836, 3.5077),
  'First Heading': 90,
  'Default Group': 'User',
  'Spawns': [
    new mp.Vector3(1839.6, 3672.93, 34.28),
    new mp.Vector3(-247.76, 6331.23, 32.43),
    new mp.Vector3(-449.67, -340.83, 34.50),
    new mp.Vector3(357.43, -593.36, 28.79),
    new mp.Vector3(295.83, -1446.94, 29.97),
    new mp.Vector3(-676.98, 310.68, 83.08),
    new mp.Vector3(1151.21, -1529.62, 35.37),
    new mp.Vector3(-874.64, -307.71, 39.58),
  ],
};

for (let id in values) {
  if (values.hasOwnProperty(id)) {
    config[id] = {
      value: values[id],
    };
  }
}

module.exports = config;
