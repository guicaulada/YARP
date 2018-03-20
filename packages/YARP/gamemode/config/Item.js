'use strict';
/**
 * @file Item config
 */
module.exports = {
  "Food": {
    "fries": {
      name: "Fries",
      model: "prop_food_chips",
      price: 5,
      call: ["restoreHunger", 5]},
    "burger": {
      name: "Burger",
      model: "prop_cs_burger_01",
      price: 15,
      call: ["restoreHunger", 10]
    },
    "hotdog": {
      name: "Hot Dog",
      model: "prop_cs_hotdog_01",
      price: 20,
      call: ["restoreHunger", 15]
    },
    "beer": {
      name: "Beer Bottle",
      model: "prop_cs_beer_bot_01",
      price: 7,
      call: ["restoreThirst", 5]
    },
    "juice": {
      name: "Juice Box",
      model: "prop_food_bs_juice01",
      price: 4,
      call: ["restoreThirst", 10]
    },
    "soda": {
      name: "Soda Can",
      model: "ng_proc_sodacan_01a",
      price: 5,
      call: ["restoreThirst", 15]
    }
  }
}
