'use strict';
/**
 * @file Item config
 */
module.exports = {
  "Food": {
    "fries": {
      name: "Fries",
      price: 5,
      call: ["restoreHunger", 5]},
    "burger": {
      name: "Burger",
      price: 15,
      call: ["restoreHunger", 10]
    },
    "hotdog": {
      name: "Hot Dog",
      price: 20,
      call: ["restoreHunger", 15]
    },
    "beer": {
      name: "Beer Bottle",
      price: 7,
      call: ["restoreThirst", 5]
    },
    "juice": {
      name: "Juice Box",
      price: 4,
      call: ["restoreThirst", 10]
    },
    "soda": {
      name: "Soda Can",
      price: 5,
      call: ["restoreThirst", 15]
    }
  }
}
