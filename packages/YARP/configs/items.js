'use strict';

let config = {
  'fries': {
    name: 'Fries',
    model: 'prop_food_chips',
    category: 'Food',
    options: (player) => {
      return {
        'Eat': (player) => {
          player.character.takeItem(this, 1);
          player.character.hunger -= 5;
        },
      };
    },
  },
  'burger': {
    name: 'Burger',
    model: 'prop_cs_burger_01',
    category: 'Food',
    options: (player) => {
      return {
        'Eat': (player) => {
          player.character.takeItem(this, 1);
          player.character.hunger -= 10;
        },
      };
    },
  },
  'hotdog': {
    name: 'Hot Dog',
    model: 'prop_cs_hotdog_01',
    category: 'Food',
    options: (player) => {
      return {
        'Eat': (player) => {
          player.character.takeItem(this, 1);
          player.character.hunger -= 15;
        },
      };
    },
  },
  'beer': {
    name: 'Beer Bottle',
    model: 'prop_cs_beer_bot_01',
    category: 'Food',
    options: (player) => {
      return {
        'Drink': (player) => {
          player.character.takeItem(this, 1);
          player.character.thirst -= 5;
        },
      };
    },
  },
  'juice': {
    name: 'Juice Box',
    model: 'prop_food_bs_juice01',
    category: 'Food',
    options: (player) => {
      return {
        'Drink': (player) => {
          player.character.takeItem(this, 1);
          player.character.thirst -= 10;
        },
      };
    },
  },
  'soda': {
    name: 'Soda Can',
    model: 'ng_proc_sodacan_01a',
    category: 'Food',
    options: (player) => {
      return {
        'Drink': (player) => {
          player.character.takeItem(this, 1);
          player.character.thirst -= 15;
        },
      };
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
  'AMMO_FIREWORK': 'Firework',
  'AMMO_MINIGUN': 'Minigun Ammo',
  'AMMO_RAILGUN': 'Railgun Ammo',
  'AMMO_GRENADELAUNCHER': 'Grenade Launcher Ammo',
  'AMMO_GRENADELAUNCHER_SMOKE': 'Grenade Launcher Smoke Ammo',
  'AMMO_RPG': 'RPG Ammo',
  'AMMO_ROCKETLAUNCHER': 'Rocket Launcher Ammo',
  'AMMO_STINGER': 'Stinger Ammo',
  'AMMO_FLARE': 'Flare',
};

for (let ammo in ammos) {
  if (ammos.hasOwnProperty(ammo)) {
    config[ammo] = {
      name: ammos[ammo],
      model: 'v_ret_gc_ammostack',
      category: 'Ammo',
      options: (player) => {
        let options = {};
        if (player.character.hasEquipment(this.id)) {
          options['Unequip'] = (player) => {
            let amount = this.default(player.character.equipment[this.id], 0);
            if (player.character.takeEquipment(this.id, amount)) {
              player.character.giveItem(this.id, amount);
            }
          };
        } else {
          options['Equip'] = (player) => {
            let maxBullets = 250;
            let amount = 0;
            let equipped = this.default(player.character.equipment[this.id], 0);
            if (player.character.inventory[this.id] > maxBullets) {
              amount = maxBullets;
            } else {
              amount = player.character.inventory[this.id];
            }
            if (equipped + amount > maxBullets) {
              amount = maxBullets - equipped;
            }
            if (player.character.takeItem(this.id, amount)) {
              player.character.giveEquipment(this.id, amount);
            }
          };
        }
        return options;
      },
    };
  }
}

module.exports = config;
