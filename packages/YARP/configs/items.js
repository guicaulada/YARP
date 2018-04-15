'use strict';

let config = {
  'Food': {
    'fries': {
      name: 'Fries',
      model: 'prop_food_chips',
      options: {
        "Eat": (player) => {mp.events.call('restoreHunger',player,5);}
      }
    },
    'burger': {
      name: 'Burger',
      model: 'prop_cs_burger_01',
      options: {
        "Eat": (player) => {mp.events.call('restoreHunger',player,10);}
      }
    },
    'hotdog': {
      name: 'Hot Dog',
      model: 'prop_cs_hotdog_01',
      options: {
        "Eat": (player) => {mp.events.call('restoreHunger',player,15);}
      }
    },
    'beer': {
      name: 'Beer Bottle',
      model: 'prop_cs_beer_bot_01',
      options: {
        "Drink": (player) => {mp.events.call('restoreThirst',player,5);}
      }
    },
    'juice': {
      name: 'Juice Box',
      model: 'prop_food_bs_juice01',
      options: {
        "Drink": (player) => {mp.events.call('restoreThirst',player,10);}
      }
    },
    'soda': {
      name: 'Soda Can',
      model: 'ng_proc_sodacan_01a',
      options: {
        "Drink": (player) => {mp.events.call('restoreThirst',player,15);}
      }
    }
  }
}

module.exports = config;
