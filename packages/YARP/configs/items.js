'use strict';

let config = {
  'fries': {
    name: 'Fries',
    model: 'prop_food_chips',
    category: 'Food',
    options: {
      'Eat': (player) => {
        player.character.hunger -= 5;
      },
    },
  },
  'burger': {
    name: 'Burger',
    model: 'prop_cs_burger_01',
    category: 'Food',
    options: {
      'Eat': (player) => {
        player.character.hunger -= 10;
      },
    },
  },
  'hotdog': {
    name: 'Hot Dog',
    model: 'prop_cs_hotdog_01',
    category: 'Food',
    options: {
      'Eat': (player) => {
        player.character.hunger -= 15;
      },
    },
  },
  'beer': {
    name: 'Beer Bottle',
    model: 'prop_cs_beer_bot_01',
    category: 'Food',
    options: {
      'Drink': (player) => {
        player.character.thirst -= 5;
      },
    },
  },
  'juice': {
    name: 'Juice Box',
    model: 'prop_food_bs_juice01',
    category: 'Food',
    options: {
      'Drink': (player) => {
        player.character.thirst -= 10;
      },
    },
  },
  'soda': {
    name: 'Soda Can',
    model: 'ng_proc_sodacan_01a',
    category: 'Food',
    options: {
      'Drink': (player) => {
        player.character.thirst -= 15;
      },
    },
  },
};

let ammos = {
  'AMMO_PISTOL': 'Pistol Ammo',
  'AMMO_SMG': 'SMG Ammo',
  'AMMO_RIFLE': 'Rifle Ammo',
  'AMMO_MG': 'Machine-gun Ammo',
  'AMMO_SHOTGUN': 'Shotgun Ammo',
  'AMMO_STUNGUN': 'Stungun Ammo',
  'AMMO_SNIPER': 'Sniper Ammo',
  'AMMO_SNIPER_REMOTE': 'Remote Sniper Ammo',
  'AMMO_FIREEXTINGUISHER': 'Fire-extinguisher charge',
  'AMMO_PETROLCAN': 'Petrol',
  'AMMO_MINIGUN': 'Minigun Ammo',
  'AMMO_GRENADELAUNCHER': 'Grenade Launcher Ammo',
  'AMMO_GRENADELAUNCHER_SMOKE': 'Grenade Launcher Smoke Ammo',
  'AMMO_RPG': 'RPG Ammo',
  'AMMO_STINGER': 'Stinger Ammo',
  'AMMO_BALL': 'Ball',
  'AMMO_STICKYBOMB': 'Sticky Bomb',
  'AMMO_SMOKEGRENADE': 'Smoke Grenade',
  'AMMO_BZGAS': 'Blackout Gas',
  'AMMO_FLARE': 'Flare',
  'AMMO_MOLOTOV': 'Molotov',
};

for (let ammo in ammos) {
  if (ammos.hasOwnProperty(ammo)) {
    config[ammo] = {
      name: ammos[ammo],
      model: 'v_ret_gc_ammostack',
      category: 'Ammo',
      options: {
        'Equip': (player) => {
          let amount = 0;
          if (player.character.inventory[this.id] > 100) {
            amount = 100;
          } else {
            amount = player.character.inventory[this.id];
          }
          if (player.character.equipment[this.id] + amount > 100) {
            amount = 100 - player.character.equipment[this.id];
          }
          if (player.character.takeItem(this.id, amount, false)) {
            player.character.giveAmmo(this.id, amount);
          }
        },
      },
    };
  }
}

module.exports = config;
